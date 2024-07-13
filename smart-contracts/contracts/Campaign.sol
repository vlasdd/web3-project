// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

contract Campaign {
  address public creator;
  string public title;
  string public description;
  string public imageUrl;
  uint public target;
  uint public deadline;
  
  mapping(address => uint) private contributors;
  uint public numberOfContributors;

  struct Request {
    uint amount;
    string reason;
    bool completed;
    address[] approvals;
  }
  Request[] public requests;

  event DonationReceived(address indexed donor, uint amount);
  event RequestCreated(uint indexed requestId, uint amount, string reason);
  event VoteReceived(uint indexed requestId, address indexed voter);
  event RequestCompleted(uint indexed requestId, uint amount);

  constructor(
    address _creator,
    string memory _title,
    string memory _description,
    string memory _imageUrl,
    uint _target,
    uint _deadline
  ) { 
    require(_deadline > block.timestamp, "Deadline can't be in the past");
    require(_target != 0, "Target cannot be 0 or less");
    require(bytes(_title).length > 0, "Title cannot be empty");
    require(bytes(_description).length > 0, "Description cannot be empty");

    creator = _creator;
    title = _title;
    description = _description;
    target = _target;
    imageUrl = _imageUrl;
    deadline = _deadline;
  }

  modifier onlyCreator {
    require(msg.sender == creator, "You are not the campaign creator");
    _;
  }

  modifier notCreator {
    require(msg.sender != creator, "Campaign creator cannot do this");
    _;
  }

  modifier requestNotCompleted (uint _requestIndex) {
    Request storage request = requests[_requestIndex];
    require(!request.completed, "Request has already completed");
    _;
  }

  function donateToCampaign() notCreator public payable {  
    require(deadline > block.timestamp, "Campaign has already ended");   
    require(msg.value != 0, "Amount can't be 0 or less");

    if(contributors[msg.sender] == 0) {
      numberOfContributors++;
    }

    contributors[msg.sender] += msg.value;

    emit DonationReceived(msg.sender, msg.value);
  }

  function createRequest(uint _amount, string memory _reason) onlyCreator public {
    require(_amount <= getBalance(), "Request amount cannot be larger than the current campaign balance");
    require(_amount != 0, "Request amount cannot be 0 or less");

    Request memory request;
    request.amount = _amount;
    request.reason = _reason;

    requests.push(request);

    emit RequestCreated(requests.length - 1, _amount, _reason);
  }

  function vote(uint _requestIndex) requestNotCompleted(_requestIndex) notCreator public {
    require(contributors[msg.sender] != 0, "You are not a contributor");

    Request storage request = requests[_requestIndex];

    bool senderHasAlreadyVoted = addressExists(msg.sender, request.approvals);
    require(!senderHasAlreadyVoted, "You have already voted");

    request.approvals.push(msg.sender);

    emit VoteReceived(_requestIndex, msg.sender);
  }

  function getRequestedMoney(uint _requestIndex) requestNotCompleted(_requestIndex) onlyCreator public payable {    
    Request storage request = requests[_requestIndex];
    require(request.approvals.length > numberOfContributors / 2, "There are not enough approvals");

    request.completed = true;
    (bool success, ) = payable(creator).call{value: request.amount}("");
    require(success, "Transfer failed");

    emit RequestCompleted(_requestIndex, request.amount);
  }

  function getBalance() public view returns(uint) {
    return address(this).balance;
  }

  function addressExists(address _address, address[] memory _addresses) internal pure returns (bool) {
    for (uint256 i = 0; i < _addresses.length; i++) {
      if (_addresses[i] == _address) {
        return true;
      }
    }
    return false;
  }
}

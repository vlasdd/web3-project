// SPDX-License-Identifier: MIT
pragma solidity 0.8.19;

import "./Campaign.sol";

contract CrowdFunding {
  Campaign[] public campaigns;

  event CampaignCreated(
    address indexed creator,
    address campaignAddress,
    string title,
    uint target,
    uint deadline
  );

  function createCampaign (
    string memory _title,
    string memory _description,
    string memory _imageUrl,
    uint _target,
    uint _deadline
  ) public { 
    Campaign newCampaign = new Campaign(
      msg.sender,
      _title,
      _description,
      _imageUrl,
      _target,
      _deadline
    );

    campaigns.push(newCampaign);

    emit CampaignCreated(msg.sender, address(newCampaign), _title, _target, _deadline);
  }

  function getCampaigns() public view returns(Campaign[] memory) {
    return campaigns;
  } 
}
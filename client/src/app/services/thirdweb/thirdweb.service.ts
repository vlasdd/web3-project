import { Injectable } from '@angular/core';
import { ThirdwebSDK } from '@thirdweb-dev/sdk';
import { MetaMaskWallet } from "@thirdweb-dev/wallets";
import { BehaviorSubject } from 'rxjs';
import { LOCAL_STORAGE_METAMASK_WALLET } from '../../../constants/localStorage';
import { environment } from '../../../environments/environment';
import { Campaign } from '../../../types/campaign';
import { CreateCampaignProps } from '../../../types/thirdweb';
import { ThirdwebParserService } from './thirdweb-parser.service';

@Injectable({
  providedIn: 'root'
})
export class ThirdwebService {
  private sdk: ThirdwebSDK = new ThirdwebSDK('sepolia');
  private wallet: MetaMaskWallet = new MetaMaskWallet({
    dappMetadata: {
      name: "thirdweb powered crowdfunding project",
      url: "https://thirdweb.com",
      description: "thirdweb powered crowdfunding project",
      logoUrl: "https://thirdweb.com/favicon.ico",
    }
  });
  private walletAddressSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(
    localStorage.getItem(LOCAL_STORAGE_METAMASK_WALLET)
  );

  constructor(private thirdwebParserService: ThirdwebParserService) {
    this.loadWallet();
  }

  async connectWallet() {
    const walletAddress = await this.wallet.connect();
    this.walletAddressSubject.next(walletAddress);
    this.setSigner();
    localStorage.setItem(LOCAL_STORAGE_METAMASK_WALLET, walletAddress);
  }

  async disconnectWallet() {
    await this.wallet.disconnect();
    this.walletAddressSubject.next(null);
    localStorage.removeItem(LOCAL_STORAGE_METAMASK_WALLET);
  }

  async getCampaigns(): Promise<Campaign[]> {
    try {
      const crowdFundingContract = await this.loadCrowdfundingContract();
      const campaignAddresses = await crowdFundingContract.call("getCampaigns");

      return await Promise.all(
        campaignAddresses.map(async (address: string) => {
          const campaignContract = await this.sdk.getContract(address);
          const title = await campaignContract.call('title');
          const description = await campaignContract.call('description');
          const imageUrl = await campaignContract.call('imageUrl');
          const target = await campaignContract.call('target');
          const deadline = await campaignContract.call('deadline');
          const numberOfContributors = await campaignContract.call('numberOfContributors');
          const balance = await campaignContract.call('getBalance');

          return {
            address,
            title,
            description,
            imageUrl,
            target: this.thirdwebParserService.convertToEth(target),
            deadline: this.thirdwebParserService.convertToDate(deadline),
            numberOfContributors: this.thirdwebParserService.convertToNumber(numberOfContributors),
            balance: this.thirdwebParserService.convertToEth(balance),
          };
        })
      );
    } catch (error) {
      console.log('Error fetching campaigns:', error);
      return [];
    }
  }

  async createCampaign({ title, description, imageUrl, target, deadline }: CreateCampaignProps) {
    const crowdFundingContract = await this.loadCrowdfundingContract();

    const targetInWei = this.thirdwebParserService.convertToWei(target);
    const deadlineInSeconds = this.thirdwebParserService.convertDateToSeconds(deadline);

    return crowdFundingContract.call(
      'createCampaign',
      [
        title,
        description,
        imageUrl,
        targetInWei,
        deadlineInSeconds
      ],
      {
        from: this.walletAddressSubject.value as string,
      }
    )
  }

  get walletAddress$() {
    return this.walletAddressSubject.asObservable();
  }

  private async setSigner() {
    if (this.walletAddressSubject.value) {
      const signer = await this.wallet.getSigner();
      this.sdk.updateSignerOrProvider(signer);
    }
  }

  private async loadWallet() {
    try {
      const walletAddress = await this.wallet.autoConnect();
      this.walletAddressSubject.next(walletAddress);
      this.setSigner();
      localStorage.setItem(LOCAL_STORAGE_METAMASK_WALLET, walletAddress);
      console.log('Wallet autoconnected ', walletAddress)
    } catch(err) {
      this.walletAddressSubject.next(null);
      localStorage.removeItem(LOCAL_STORAGE_METAMASK_WALLET);
      console.log(err);
    }
  }

  private async loadCrowdfundingContract() {
    return await this.sdk.getContract(environment.CROWDFUNDING_CONTRACT_ADDRESS);
  }

}
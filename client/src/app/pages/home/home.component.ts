import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Campaign } from '../../../types/campaign';
import { CampaignCardComponent } from '../../components/campaign-card/campaign-card.component';
import { LoaderService } from '../../services/loader/loader.service';
import { ThirdwebService } from '../../services/thirdweb/thirdweb.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    CampaignCardComponent
  ],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  campaigns: Campaign[] = [];
  
  constructor(
    private thirdwebService: ThirdwebService,
    private loaderService: LoaderService
  ) {}

  async ngOnInit() {
    this.loaderService.show();
    this.campaigns = await this.thirdwebService.getCampaigns();
    this.loaderService.hide();
  }
}

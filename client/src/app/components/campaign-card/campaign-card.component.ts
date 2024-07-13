import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Campaign } from '../../../types/campaign';

@Component({
  selector: 'app-campaign-card',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './campaign-card.component.html',
})
export class CampaignCardComponent {
  @Input() campaign!: Campaign;
}

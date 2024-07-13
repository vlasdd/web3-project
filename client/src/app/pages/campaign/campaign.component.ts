import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-campaign',
  standalone: true,
  imports: [],
  templateUrl: './campaign.component.html',
})
export class CampaignComponent {
  address: string = '';

  constructor(private route: ActivatedRoute){}

  ngOnInit() {
    this.route.params.subscribe((params) => {  
      this.address = params['id'];
    });
  }
}

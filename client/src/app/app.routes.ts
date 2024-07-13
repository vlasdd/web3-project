import { Routes } from '@angular/router';
import { CampaignComponent } from './pages/campaign/campaign.component';
import { CreateCampaignComponent } from './pages/create-campaign/create-campaign.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
  { 
    path: '', 
    component: HomeComponent, 
    data: { 
      title: 'Dashboard' 
    } 
  },
  { 
    path: 'create-campaign', 
    component: CreateCampaignComponent, 
    data: { 
      title: 'Create Campaign' 
    } 
  },
  { 
    path: 'campaign/:id', 
    component: CampaignComponent,
    data: { 
      title: 'Campaign' 
    } 
  },
];

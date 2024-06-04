import { Routes } from '@angular/router';
import { CampaignsComponent } from './pages/campaigns/campaigns.component';
import { DonatesComponent } from './pages/donates/donates.component';
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
    path: 'campaigns', 
    component: CampaignsComponent, 
    data: { 
      title: 'Campaigns' 
    } 
  },
  { 
    path: 'donates', 
    component: DonatesComponent, 
    data: { 
      title: 'Donates' 
    } 
  },
];

import { CommonModule, NgStyle } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { ThirdwebService } from '../../services/thirdweb/thirdweb.service';

const DEFAULT_TITLE = 'Screen'

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgStyle, CommonModule, RouterModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  screenTitle: string = DEFAULT_TITLE;
  connected: string | null = null;
  isCreateCampaign: boolean = false;

  constructor(
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private thirdwebService: ThirdwebService
  ) { }

  ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => {
        let child = this.activatedRoute.firstChild;
        while (child?.firstChild) {
          child = child.firstChild;
        }
        if (child?.snapshot.data['title']) {
          return child.snapshot.data['title'];
        }
        return DEFAULT_TITLE;
      })
    ).subscribe((title: string) => {
      this.screenTitle = title;
      this.isCreateCampaign = this.router.url === '/create-campaign';
    });

    this.thirdwebService.walletAddress$.subscribe((walletAddress) => {
      this.connected = walletAddress;
    });
  }

  async connectWallet() {
    this.thirdwebService.connectWallet();
  }

  navigateToCreateCampaign() {
    this.router.navigate(['/create-campaign']);
  }
}

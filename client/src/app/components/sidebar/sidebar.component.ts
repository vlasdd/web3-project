import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ThirdwebService } from '../../services/thirdweb/thirdweb.service';
import { SidebarItemComponent } from './components/sidebar-item/sidebar-item.component';
import { SidebarLinkComponent } from './components/sidebar-link/sidebar-link.component';
import { ToggleSidebarButtonComponent } from './components/toggle-sidebar-button/toggle-sidebar-button.component';
import { sidebarItems } from './constants/links';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    SidebarLinkComponent, 
    SidebarItemComponent, 
    CommonModule,
    ToggleSidebarButtonComponent,
    ToggleSidebarButtonComponent,
  ],
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  sidebarItems = sidebarItems;
  isSidebarOpen = false;
  isSidebarOpenAnimationEnded = false;

  constructor(
    private router: Router,
    private thirdwebService: ThirdwebService,
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isSidebarOpen = false;
      }
    });
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    setTimeout(() => {
      this.isSidebarOpenAnimationEnded = !this.isSidebarOpenAnimationEnded;
    }, 300)
  }

  disconnect() {
    this.thirdwebService.disconnectWallet();
  }
}

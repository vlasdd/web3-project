import { Component, Input } from '@angular/core';
import { SidebarItem } from '../../constants/links';
import { Router, RouterModule } from '@angular/router';
import { NgClass } from '@angular/common';
import { SidebarItemComponent } from '../sidebar-item/sidebar-item.component';

@Component({
  selector: 'app-sidebar-link',
  standalone: true,
  imports: [NgClass, RouterModule, SidebarItemComponent],
  templateUrl: './sidebar-link.component.html',
})
export class SidebarLinkComponent {
  @Input() item!: SidebarItem;

  constructor(private router: Router) {}

  isActive(): boolean {
    return this.router.url === this.item.link;
  }
}

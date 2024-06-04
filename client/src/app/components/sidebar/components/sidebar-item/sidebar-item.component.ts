import { Component, Input } from '@angular/core';
import { IconType, NgIconComponent, provideIcons } from '@ng-icons/core';
import * as OutlinedHeroicons from '@ng-icons/heroicons/outline';
import * as SolidHeroicons from '@ng-icons/heroicons/solid';

@Component({
  selector: 'app-sidebar-item',
  standalone: true,
  imports: [NgIconComponent],
  templateUrl: './sidebar-item.component.html',
  viewProviders: [provideIcons({
    ...OutlinedHeroicons,
    ...SolidHeroicons,
  })]
})
export class SidebarItemComponent {
  @Input() title!: string;
  @Input() iconName!: IconType;
  @Input() isActive: boolean = false;
}

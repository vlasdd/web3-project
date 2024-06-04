import { Component, EventEmitter, Output } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroBars3 } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-toggle-sidebar-button',
  standalone: true,
  imports: [NgIcon],
  templateUrl: './toggle-sidebar-button.component.html',
  viewProviders: [provideIcons({
    heroBars3,
  })]
})
export class ToggleSidebarButtonComponent {
  @Output() toggleSidebarEmitter: EventEmitter<undefined> = new EventEmitter();

  toggleSidebar() {
    this.toggleSidebarEmitter.emit();
  }
}

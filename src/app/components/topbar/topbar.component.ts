import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [AvatarModule, BadgeModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  showNotifications: boolean

  constructor() {
    this.showNotifications = false
  }

  switchShowNotifications() {
    this.showNotifications = !this.showNotifications
  }
}

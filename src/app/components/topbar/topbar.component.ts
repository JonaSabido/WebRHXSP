import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { UserResponse } from '../../interfaces/user';
import { JwtService } from '../../../../shared/services/jwt.service';
import { NotificationService } from '../../core/services/notification.service';
import { NotificationUserResponse } from '../../interfaces/notification';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [AvatarModule, BadgeModule, CommonModule, ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  showNotifications: boolean
  currentUser: UserResponse | any
  notifications: NotificationUserResponse[]
  unreadNotifications: number

  constructor(
    private jwtService: JwtService,
    private notificationService: NotificationService
  ) {
    this.showNotifications = false
    this.currentUser = this.jwtService.getDataToken()['authUser']
    this.notifications = []
    this.unreadNotifications = 0
  }

  switchShowNotifications() {
    this.showNotifications = !this.showNotifications
  }

  ngOnInit() {
    this.notificationService.getByUser(this.currentUser.id).subscribe({
      next: (response) => {
        this.notifications = response.data
        this.unreadNotifications = this.notifications.filter(x => x.status == false).length
      },
      error: (e) => {
        this.notifications = []
        this.unreadNotifications = 0
      }
    })
  }

  changeStatus(entity: NotificationUserResponse) {
    this.notificationService.changeStatus(entity.id, true).subscribe({
      next: (response) => {
        entity.status = !entity.status
        this.unreadNotifications = this.notifications.filter(x => x.status == false).length
      }
    })
  }

}

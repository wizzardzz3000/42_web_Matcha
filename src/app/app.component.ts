import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SocketNotificationsService } from './notifications/services/socket-notifications/socket-notifications.service';
import { IsLoggedInGuard } from './guards/is-logged-in-guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public socketNotificationsService: SocketNotificationsService,
              public isLoggedInGuard: IsLoggedInGuard) { }

  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.socketNotificationsService.getNotifications();
    }
  }
}

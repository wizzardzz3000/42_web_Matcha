import { Component, OnInit, Input } from '@angular/core';
import { GetNotificationsService } from './services/get-notifications/get-notifications.service';
import { EnterViewHomeReturn } from '../home/services/enter-view-home/enter-view-home-return';
import { GetNotificationsReturn, Notification } from './services/get-notifications/get-notifications.return';
import { DeleteNotificationService } from './services/delete-notification/delete-notification.service';
import { DeleteNotificationReturn } from './services/delete-notification/delete-notification.return';
import { SocketNotificationsService } from './services/socket-notifications/socket-notifications.service';
import { LastConnectedTimeFormatPipe } from '../pipes/last-connection.pipe';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
  providers: [ LastConnectedTimeFormatPipe ]
})
export class NotificationsComponent implements OnInit {
  /**
   *  Resolve data for the view
   *
   */
  @Input() resolveData: EnterViewHomeReturn = null;
  /**
   *
   * Notification list
   */
  public notifications: Notification[];

  deleteNotification(index: number) {
    this.deleteNotificationService.deleteNotification(this.notifications[index].id_notif)
      .subscribe((result: DeleteNotificationReturn) => {
        if (result.success) {
          this.notifications.splice(index, 1);
        }
      });
  }

  constructor(public getNotificationService: GetNotificationsService,
              public deleteNotificationService: DeleteNotificationService,
              public socketNotificationsService: SocketNotificationsService,
              public lastConnection: LastConnectedTimeFormatPipe) { }

  ngOnInit() {
    this.notifications = this.socketNotificationsService.notifications;
  }

}

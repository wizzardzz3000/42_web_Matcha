import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { DeleteNotificationReturn } from './delete-notification.return';

@Injectable({
  providedIn: 'root'
})
export class DeleteNotificationService {

  public serviceURL = Globals.baseURL + 'deleteNotifications/';
  constructor(public http: HttpClient) { }

  deleteNotification(idNotif: number): Observable<DeleteNotificationReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.get<DeleteNotificationReturn>(this.serviceURL + idNotif, option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

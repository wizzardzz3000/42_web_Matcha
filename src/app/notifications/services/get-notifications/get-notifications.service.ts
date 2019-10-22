import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { GetNotificationsReturn } from './get-notifications.return';

@Injectable({
  providedIn: 'root'
})
export class GetNotificationsService {

  public serviceURL = Globals.baseURL + 'getNotifications/';
  constructor(public http: HttpClient) { }

  getNotifications(idUser: number): Observable<GetNotificationsReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.get<GetNotificationsReturn>(this.serviceURL + idUser, option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

import { Injectable } from '@angular/core';
import {Globals} from '../../../globals';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { AddNotificationParameter } from './add-notification.parameter';
import { AddNotificationReturn } from './add-notification.return';

@Injectable({
  providedIn: 'root'
})
export class AddNotificationService {

  public serviceURL = Globals.baseURL + 'addNotification/';
  constructor(public http: HttpClient) { }

  addNotification(APIParameter: AddNotificationParameter): Observable<AddNotificationReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.post<AddNotificationReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

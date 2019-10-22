import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GetUserOnlineParameter } from './get-user-online-parameter';
import { GetUserOnlineReturn } from './get-user-online-return';

@Injectable({
  providedIn: 'root'
})
export class GetUserOnlineService {

  public serviceURL = Globals.baseURL + 'getUserOnline';
  constructor(public http: HttpClient) { }

  getUserOnline(APIParameter: GetUserOnlineParameter): Observable<GetUserOnlineReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.post<GetUserOnlineReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

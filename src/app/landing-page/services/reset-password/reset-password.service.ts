import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { ResetPasswordReturn } from './reset-password.return';
import { ResetPasswordParameter } from './reset-password.parameter';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {
  public serviceURL = Globals.baseURL + 'resetPassword';
  constructor(public http: HttpClient,
              public router: Router) {}

  sendLink(APIParameter: ResetPasswordParameter): Observable<ResetPasswordReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<ResetPasswordReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

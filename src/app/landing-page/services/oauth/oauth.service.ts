import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Globals} from '../../../globals';
import {Observable, throwError} from 'rxjs';
import {Router} from '@angular/router';
import { OauthReturn } from './oauth.return';
import { OauthParameter } from './oauth.parameter';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  public serviceURL = Globals.baseURL + 'oauth';
  constructor(public http: HttpClient,
              public router: Router) {}

  oauth(APIParameter: OauthParameter): Observable<OauthReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.post<OauthReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}
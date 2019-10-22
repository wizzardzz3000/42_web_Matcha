import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Globals} from '../../../globals';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {LoginParameter} from './login.parameter';
import {LoginReturn} from './login.return';
import { JwtHelperService } from '@auth0/angular-jwt';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public serviceURL = Globals.baseURL + 'login';
  constructor(public http: HttpClient,
              public router: Router) {}

  auth(APIParameter: LoginParameter): Observable<LoginReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.post<LoginReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  createAuthorizationHeader(token, headers: HttpHeaders) {
    const isExpired = new JwtHelperService().isTokenExpired(token);
    if (token !== null && !isExpired) {
      return headers.append('Authorization', 'JWT' + token);
    } else {
      this.logOut();
    }
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    this.router.navigate(['/']);
  }
}

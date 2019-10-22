import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CheckKeyParameter } from './check-key.parameter';
import { Observable, throwError } from 'rxjs';
import { CheckKeyReturn } from './check-key.return';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CheckKeyService {
  public serviceURL = Globals.baseURL + 'checkKey/';
  constructor(public http: HttpClient,
              public router: Router) {}

  checkKey(email: string): Observable<CheckKeyReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<CheckKeyReturn>(this.serviceURL + email, option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

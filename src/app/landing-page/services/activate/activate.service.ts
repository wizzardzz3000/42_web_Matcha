import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ActivateReturn } from './activate.service-return';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ActivateService {

  public serviceURL = Globals.baseURL + 'activateAccount/';

  constructor(public http: HttpClient) { }

  activateAccount(email: string): Observable<ActivateReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get<ActivateReturn>(this.serviceURL + email, option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';
import { HttpClient } from '@angular/common/http';
import { EnterViewActivateReturn } from './enter-view-activate-return';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EnterViewActivateService {

  public serviceURL = Globals.baseURL + 'activate/';

  constructor(private http: HttpClient) { }

  enterView(email): Observable<EnterViewActivateReturn> {

    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.get<EnterViewActivateReturn>(this.serviceURL + email, option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

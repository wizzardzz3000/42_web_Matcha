import { Injectable } from '@angular/core';
import { Globals } from '../../../globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ReportUserNotMatchedParameter } from './report-user-not-matched.parameter';
import { ReportUserNotMatchedReturn } from './report-user-not-matched.return';

@Injectable({
  providedIn: 'root'
})
export class ReportUserNotMatchedService {

  public serviceURL = Globals.baseURL + 'reportUserNotMatched';
  constructor(public http: HttpClient) { }

  reportUserNotMatched(APIParameter: ReportUserNotMatchedParameter): Observable<ReportUserNotMatchedReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.post<ReportUserNotMatchedReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

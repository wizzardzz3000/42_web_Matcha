import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Globals } from 'src/app/globals';
import { ReportUserReturn } from './report-user.return';
import { ReportUserParameter } from './report-user.parameter';

@Injectable({
  providedIn: 'root'
})
export class ReportUserService {

  public serviceURL = Globals.baseURL + 'reportUser/';
  constructor(public http: HttpClient) { }

  reportUser(APIParameter: ReportUserParameter): Observable<ReportUserReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.post<ReportUserReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

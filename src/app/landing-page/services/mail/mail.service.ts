import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MailParameter } from './mail.parameter';
import { Observable, throwError } from 'rxjs';
import { MailReturn } from './mail.return';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MailService {
  public serviceURL = Globals.baseURL + 'sendmail';
  constructor(public http: HttpClient) { }

  sendMail(APIParameter: MailParameter): Observable<MailReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<MailReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../../../globals';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UpdateEmailParameter } from './update-email-parameter';
import { UpdateEmailReturn } from './update-email-return';

@Injectable({
  providedIn: 'root'
})
export class UpdateEmailService {
  public serviceURL = Globals.baseURL + 'updateEmail';
  constructor(private http: HttpClient) { }

  updateEmail(APIParameter: UpdateEmailParameter): Observable<UpdateEmailReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.post<UpdateEmailReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

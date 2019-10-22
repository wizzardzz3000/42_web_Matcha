import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SaveMessageParameter } from './save-message-parameter';
import { Observable, throwError } from 'rxjs';
import { SaveMessageReturn } from './save-message-return';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaveMessageService {
  public serviceURL = Globals.baseURL + 'saveMessage';
  constructor(public http: HttpClient) { }

  saveMessage(APIParameter: SaveMessageParameter): Observable<SaveMessageReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.post<SaveMessageReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

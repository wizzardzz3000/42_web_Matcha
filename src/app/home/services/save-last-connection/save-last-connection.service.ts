import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SaveUserLastConnectionReturn } from './save-last-connection-return';
import { SaveUserLastConnectionParameter } from './save-last-connection-parameter';


@Injectable({
  providedIn: 'root'
})
export class SaveUserLastConnectionService {

  public serviceURL = Globals.baseURL + 'saveLastConnection';
  constructor(public http: HttpClient) { }

  saveUserLastConnection(APIParameter: SaveUserLastConnectionParameter): Observable<SaveUserLastConnectionReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.post<SaveUserLastConnectionReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

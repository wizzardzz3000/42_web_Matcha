import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../../../globals';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UpdatePasswordParameter } from './update-password-parameter';
import { UpdatePasswordReturn } from './update-password-return';

@Injectable({
  providedIn: 'root'
})
export class UpdatePasswordService {
  public serviceURL = Globals.baseURL + 'updatePassword';
  constructor(private http: HttpClient) { }

  updatePassword(APIParameter: UpdatePasswordParameter): Observable<UpdatePasswordReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.post<UpdatePasswordReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

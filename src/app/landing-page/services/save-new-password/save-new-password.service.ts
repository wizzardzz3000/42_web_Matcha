import { Injectable } from '@angular/core';
import { SaveNewPasswordReturn } from './save-new-password.return';
import { SaveNewPasswordParameter } from './save-new-password.parameter';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from 'src/app/globals';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SaveNewPasswordService {
  public serviceURL = Globals.baseURL + 'saveNewPassword';
  constructor(public http: HttpClient,
              public router: Router) {}

  saveNewPassword(APIParameter: SaveNewPasswordParameter): Observable<SaveNewPasswordReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<SaveNewPasswordReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

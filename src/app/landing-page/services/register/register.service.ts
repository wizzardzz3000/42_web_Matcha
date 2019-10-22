import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {RegisterParameter} from './register.parameter';
import {Observable, throwError} from 'rxjs';
import {RegisterReturn} from './register.return';
import {catchError} from 'rxjs/operators';
import {Globals} from '../../../globals';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  public serviceURL = Globals.baseURL + 'register';
  constructor(public http: HttpClient) { }

  register(APIParameter: RegisterParameter): Observable<RegisterReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post<RegisterReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

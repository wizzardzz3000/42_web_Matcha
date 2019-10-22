import { Injectable } from '@angular/core';
import { Globals } from '../../../globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { SwipeParameter } from './swipe-parameter';
import { SwipeReturn } from './swipe-return';

@Injectable({
  providedIn: 'root'
})
export class SwipeService {

  public serviceURL = Globals.baseURL + 'swipe';
  constructor(public http: HttpClient) { }

  swipe(APIParameter: SwipeParameter): Observable<SwipeReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.post<SwipeReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

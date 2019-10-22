import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GetUserToSwipeParameter } from './get-user-to-swipe-parameter';
import { GetUserToSwipeReturn } from './get-user-to-swipe-return';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GetUserToSwipeService {

  public serviceURL = Globals.baseURL + 'getUserToSwipe';
  constructor(public http: HttpClient) { }

  getUserToSwipe(APIParameter: GetUserToSwipeParameter): Observable<GetUserToSwipeReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.post<GetUserToSwipeReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

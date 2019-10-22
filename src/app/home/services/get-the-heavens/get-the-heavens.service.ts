import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { GetTheHeavensReturn } from './get-the-heavens-return';
import { GetTheHeavensParameter } from './get-the-heavens-parameter';

@Injectable({
  providedIn: 'root'
})
export class GetTheHeavensService {

  public serviceURL = Globals.baseURL + 'getTheHeavens';
  constructor(public http: HttpClient) { }

  getTheHeavens(APIParameter: GetTheHeavensParameter): Observable<GetTheHeavensReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.post<GetTheHeavensReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

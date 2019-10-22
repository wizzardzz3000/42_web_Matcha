import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Globals } from 'src/app/globals';
import { LoadMatchesParameter } from './load-matches-parameter';
import { LoadMatchesReturn } from './load-matches-return';

@Injectable({
  providedIn: 'root'
})
export class LoadMatchesService {

  public serviceURL = Globals.baseURL + 'chat/';
  constructor(public http: HttpClient) { }

  loadMatches(APIParameter: LoadMatchesParameter): Observable<LoadMatchesReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.get<LoadMatchesReturn>(this.serviceURL + APIParameter.id, option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

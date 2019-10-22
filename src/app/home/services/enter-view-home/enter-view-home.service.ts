import { Injectable } from '@angular/core';
import {Globals} from '../../../globals';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {EnterViewHomeReturn} from './enter-view-home-return';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {EnterViewHomeParameter} from './enter-view-home-parameter';

@Injectable({
  providedIn: 'root'
})
export class EnterViewHomeService {

  public serviceURL = Globals.baseURL + 'home/';
  constructor(public http: HttpClient) { }

  enterView(APIParameter: EnterViewHomeParameter): Observable<EnterViewHomeReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.get<EnterViewHomeReturn>(this.serviceURL + APIParameter.id, option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

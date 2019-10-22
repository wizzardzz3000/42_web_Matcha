import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Globals} from '../../../globals';
import {GetTagsReturn} from './get-tags-return';

@Injectable({
  providedIn: 'root'
})
export class GetTagsService {

  public serviceURL = Globals.baseURL + 'getTags';
  constructor(public http: HttpClient) { }

  getTags(): Observable<GetTagsReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.get<GetTagsReturn>(this.serviceURL, option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

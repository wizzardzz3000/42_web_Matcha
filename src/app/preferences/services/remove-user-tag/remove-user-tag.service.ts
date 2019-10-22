import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Globals} from '../../../globals';
import { RemoveUserTagReturn } from './remove-user-tag.return';

@Injectable({
  providedIn: 'root'
})
export class RemoveUserTagService {

  public serviceURL = Globals.baseURL + 'removeUserTag/';
  constructor(public http: HttpClient) { }

  removeUserTag(id: number): Observable<RemoveUserTagReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.get<RemoveUserTagReturn>(this.serviceURL + id, option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

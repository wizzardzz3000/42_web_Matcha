import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Globals} from '../../../globals';
import { RemovePrefTagReturn } from './remove-pref-tag.return';

@Injectable({
  providedIn: 'root'
})
export class RemovePrefTagService {

  public serviceURL = Globals.baseURL + 'removePrefTag/';
  constructor(public http: HttpClient) { }

  removePrefTag(id: number): Observable<RemovePrefTagReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.get<RemovePrefTagReturn>(this.serviceURL + id, option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

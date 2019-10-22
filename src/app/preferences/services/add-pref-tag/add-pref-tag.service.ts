import { Injectable } from '@angular/core';
import {Globals} from '../../../globals';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import { AddPrefTagParameter } from './add-pref-tag.parameter';
import { AddPrefTagReturn } from './add-pref-tag.return';

@Injectable({
  providedIn: 'root'
})
export class AddPrefTagService {

  public serviceURL = Globals.baseURL + 'addPrefTag';
  constructor(public http: HttpClient) { }

  addPrefTag(APIParameter: AddPrefTagParameter): Observable<AddPrefTagReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.post<AddPrefTagReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

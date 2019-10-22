import { Injectable } from '@angular/core';
import {Globals} from '../../../globals';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {AddUserTagReturn} from './add-user-tag-return';
import {AddUserTagParameter} from './add-user-tag-parameter';

@Injectable({
  providedIn: 'root'
})
export class AddUserTagService {

  public serviceURL = Globals.baseURL + 'addUserTag';
  constructor(public http: HttpClient) { }

  addUserTag(APIParameter: AddUserTagParameter): Observable<AddUserTagReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.post<AddUserTagReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

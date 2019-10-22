import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Globals} from '../../../globals';
import { GetUserTagsReturn } from './get-user-tags.return';

@Injectable({
  providedIn: 'root'
})
export class GetUserTagsService {

  public serviceURL = Globals.baseURL + 'getUserTags/';
  constructor(public http: HttpClient) { }

  getUserTags(id: number): Observable<GetUserTagsReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.get<GetUserTagsReturn>(this.serviceURL + id, option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

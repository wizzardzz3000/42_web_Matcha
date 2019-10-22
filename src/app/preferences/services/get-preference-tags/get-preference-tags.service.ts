import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError} from 'rxjs/operators';
import {Globals} from '../../../globals';
import { GetPreferenceTagsReturn } from './get-preference-tags.return';

@Injectable({
  providedIn: 'root'
})
export class GetPreferenceTagsService {

  public serviceURL = Globals.baseURL + 'getPreferenceTags/';
  constructor(public http: HttpClient) { }

  getPreferenceTags(id: number): Observable<GetPreferenceTagsReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.get<GetPreferenceTagsReturn>(this.serviceURL + id, option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

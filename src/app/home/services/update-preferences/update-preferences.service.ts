import { Injectable } from '@angular/core';
import {Globals} from '../../../globals';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UpdatePreferencesReturn} from './update-preferences-return';
import {UpdatePreferencesParameter} from './update-preferences-parameter';

@Injectable({
  providedIn: 'root'
})
export class UpdatePreferencesService {

  public serviceURL = Globals.baseURL + 'updatePreferences';
  constructor(public http: HttpClient) { }

  updatePreferences(APIParameter: UpdatePreferencesParameter): Observable<UpdatePreferencesReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.post<UpdatePreferencesReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

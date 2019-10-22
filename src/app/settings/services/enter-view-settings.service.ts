import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { EnterViewSettingsReturn } from './enter-view-settings-return';
import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EnterViewSettingsService {

  public serviceURL = Globals.baseURL + 'setting/';

  constructor(private http: HttpClient) { }

  enterView(id: number): Observable<EnterViewSettingsReturn> {

    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.get<EnterViewSettingsReturn>(this.serviceURL + id, option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

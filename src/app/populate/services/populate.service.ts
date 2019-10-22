import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Globals } from 'src/app/globals';
import { PopulateReturn } from './populate.return';

@Injectable({
  providedIn: 'root'
})
export class PopulateService {

  public serviceURL = Globals.baseURL + 'randomUser/';
  constructor(public http: HttpClient) { }

  populate(): Observable<PopulateReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.get<PopulateReturn>(this.serviceURL, option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

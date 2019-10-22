import { Injectable } from '@angular/core';
import { Globals } from '../../../globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { IpLocationReturn } from './ip-location.return';

@Injectable({
  providedIn: 'root'
})
export class IpLocationService {

  public serviceURL = 'https://ipapi.co/json/';
  constructor(public http: HttpClient) { }

  ipLocation(): Observable<IpLocationReturn> {
    return this.http.get<IpLocationReturn>(this.serviceURL).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      })
    );
  }
}

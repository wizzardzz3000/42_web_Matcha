import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {} from 'googlemaps';
import { GeolocationParameter } from './geolocation.parameter';
import { GeolocationReturn } from './geolocation.return';
import { Observable, throwError } from 'rxjs';
import { Globals } from 'src/app/globals';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {
  public serviceURL = Globals.baseURL + 'updateGeolocation';

  constructor(public http: HttpClient,
              public router: Router) {}
  
  sendPosition(APIParameter: GeolocationParameter): Observable<GeolocationReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.post<GeolocationReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

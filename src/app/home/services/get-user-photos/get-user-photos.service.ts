import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Globals } from '../../../globals';
import { GetUserPhotosReturn } from './get-user-photos-return';

@Injectable({
  providedIn: 'root'
})
export class GetUserPhotosService {

  public serviceURL = Globals.baseURL + 'getUserPhotos/';
  constructor(public http: HttpClient) { }

  getUserPhotos(id: number): Observable<GetUserPhotosReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.get<GetUserPhotosReturn>(this.serviceURL + id, option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

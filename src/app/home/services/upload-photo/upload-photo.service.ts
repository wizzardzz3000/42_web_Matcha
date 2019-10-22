import { Injectable } from '@angular/core';
import {Globals} from '../../../globals';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {UploadPhotoReturn} from './upload-photo-return';
import {UploadPhotoParameter} from './upload-photo-parameter';

@Injectable({
  providedIn: 'root'
})
export class UploadPhotoService {

  public serviceURL = Globals.baseURL + 'uploadPhoto';
  constructor(public http: HttpClient) { }

  uploadPhoto(APIParameter: UploadPhotoParameter): Observable<UploadPhotoReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.post<UploadPhotoReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

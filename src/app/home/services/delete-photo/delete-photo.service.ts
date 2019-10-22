import { Injectable } from '@angular/core';
import {Globals} from '../../../globals';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {DeletePhotoReturn} from './delete-photo-return';
import {DeletePhotoParameter} from './delete-photo-parameter';

@Injectable({
  providedIn: 'root'
})
export class DeletePhotoService {

  public serviceURL = Globals.baseURL + 'deletePhoto';
  constructor(public http: HttpClient) { }

  deletePhoto(APIParameter: DeletePhotoParameter): Observable<DeletePhotoReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.post<DeletePhotoReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

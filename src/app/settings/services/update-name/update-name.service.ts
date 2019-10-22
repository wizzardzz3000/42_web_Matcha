import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Globals } from '../../../globals';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UpdateNameParameter } from './update-name-parameter';
import { UpdateNameReturn } from './update-name-return';

@Injectable({
  providedIn: 'root'
})
export class UpdateNameService {
  public serviceURL = Globals.baseURL + 'updateName';
  constructor(private http: HttpClient) { }

  updateName(APIParameter: UpdateNameParameter): Observable<UpdateNameReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.post<UpdateNameReturn>(this.serviceURL, JSON.stringify(APIParameter), option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

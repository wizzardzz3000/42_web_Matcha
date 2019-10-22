import { Injectable } from '@angular/core';
import { Globals } from 'src/app/globals';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { JoinRoomReturn } from './join-room-return';
import { JoinRoomParameter } from './join-room-parameter';

@Injectable({
  providedIn: 'root'
})
export class JoinRoomService {

  public serviceURL = Globals.baseURL + 'joinRoom/';
  constructor(public http: HttpClient) { }

  joinRoom(APIParameter: JoinRoomParameter): Observable<JoinRoomReturn> {
    const option = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'JWT ' + localStorage.getItem('token')
      }),
    };

    return this.http.get<JoinRoomReturn>(this.serviceURL + APIParameter.matchId, option).pipe(
      catchError((err) => {
        console.log(err);
        return throwError('error');
      }),
    );
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { Srf } from './models/srf.model';
import { retry, catchError, map, finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('https://reqres.in/api/users');
  }
  
  getSrfs(ip: string, start: string, end: string): Observable<Srf[]> {
    const urlIp = 'http://' + ip + ':7776/check-srfs?start=' + start + '&end=' + end;
    const res = this.http.get<Srf[]>(urlIp).pipe(
        retry(1),
        catchError(this.handleError),
        finalize(() => console.log("second finalize() block executed"))
    )
    console.log('res=' + res);
    return res;
  }
  
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    //console.log(errorMessage);
    // return throwError(errorMessage);
    return of([]);
  }
}

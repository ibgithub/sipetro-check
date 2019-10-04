import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Srf } from './models/srf.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('https://reqres.in/api/users');
  }
  
  getSrf(server:string, start: string, end: string ) {
    return this.http.get('http://' + server + ':7776/check-srfs?start=' + start + '&end=' + end);
  }
  
  getSrfs(server:string, start: string, end: string): Observable<Srf[]> {
    const url = 'http://' + server + ':7776/check-srfs?start=' + start + '&end=' + end;
    return this.http.get<Srf[]>(url);
  }
}

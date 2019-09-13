import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
// [{"date":"20180604","serverName":"Koperbi Primary","fileName":"20180604.1.srf.gz","fileSize":"30 MB","lastModified":"04/06/2018 16:35:01"}]
// [{"date":"20190913","serverName":"Koperbi Primary","fileName":"NOT_EXIST","fileSize":"NOT_EXIST","lastModified":"NOT_EXIST"}]
  getUsers() {
    return this.http.get('https://reqres.in/api/users');
  }

  getSrf() {
    return this.http.get('http://localhost:7776/check-srf');
  }
}

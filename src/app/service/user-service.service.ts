import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';



const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  apiURL="your REST API"
  

  constructor(private http: HttpClient) { }


  sendUserFormData(formDetails: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL + 'user'}`, formDetails,httpOptions);
  }
}

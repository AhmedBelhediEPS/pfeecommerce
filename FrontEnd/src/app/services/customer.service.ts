import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http:HttpClient) { }

  getallcustomer(){
    return this.http.get(`${environment.baseurl}/client/all`)
  }

deletecustomer(id:any){
  return this.http.delete(`${environment.baseurl}/client/supprimer/${id}`)
}

getonecustomer(id:any){
  return this.http.get(`${environment.baseurl}/client/getone/${id}`)
}

}

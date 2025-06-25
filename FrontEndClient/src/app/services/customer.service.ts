import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  token =localStorage.getItem("token")!
  headersoption=new HttpHeaders({
    Authorization:'Bearer '+this.token
  })

  constructor(private http:HttpClient) { }

  updatepwd(request:any){
    return this.http.post(`${environment.baseurl}/client/change-password`,request,{headers:this.headersoption})
  }

getallcustomer(){
    return this.http.get(`${environment.baseurl}/client/all`)
  }

deletecustomer(id:any){
  return this.http.delete(`${environment.baseurl}/client/supprimer/${id}`)
}

getonecustomer(id:any){
  return this.http.get(`${environment.baseurl}/client/getone/${id}`)
}

updatecustomer(id:any,customer:any){
  return this.http.put(`${environment.baseurl}/client/maj/${id}`,customer)
}


}

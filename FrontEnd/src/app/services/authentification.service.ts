import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http:HttpClient) { }


  authlogin(login:any){
    return this.http.post(`${environment.baseurl}/api/auth/signin`,login)
  }


  adminsignup(signupRequest:any){
    return this.http.post(`${environment.baseurl}/admin/signup`,signupRequest)
  }

  providersignup(signupRequest:any){
    return this.http.post(`${environment.baseurl}/fournisseur/signup`,signupRequest)
  }


  forgetpassword(email:any){
    return this.http.post(`${environment.baseurl}/api/auth/forgetpassword?email=${email}`,{})
  }

  savepassword(resettoken:any,newpassword:any){
    return this.http.post(`${environment.baseurl}/api/auth/savePassword/${resettoken}?newPassword=${newpassword}`,{})
  }

  getoneadmin(id:any){
    return this.http.get(`${environment.baseurl}/admin/getone/${id}`)
  }



  updateprovider(id:any,provider:any){
    return this.http.put(`${environment.baseurl}/fournisseur/maj/${id}`,provider)
  }


  
}

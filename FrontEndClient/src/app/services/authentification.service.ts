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


  signup(signupRequest:any){
    return this.http.post(`${environment.baseurl}/client/signup`,signupRequest)
  }

  signupfournisseur(signupRequest:any){
    return this.http.post(`${environment.baseurl}/fournisseur/signup`,signupRequest)
  }

  // signupfournisseur(signupRequest: any) {
  //   const completeUrl = 'http://localhost:8080/fournisseur/signup';
  //   return this.http.post(completeUrl, signupRequest);
  // }
  


  forgetpassword(email:any){
    return this.http.post(`${environment.baseurl}/api/auth/forgetpassword?email=${email}`,{})
  }

  savepassword(resettoken:any,newpassword:any){
    return this.http.post(`${environment.baseurl}/api/auth/savePassword/${resettoken}?newPassword=${newpassword}`,{})
  }

// still el html forget w reset

}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http:HttpClient) { }


  getallcontact(){
    return this.http.get(`${environment.baseurl}/contact/all`)
  }
  
  deletecontact(id:any){
    return this.http.delete(`${environment.baseurl}/contact/supprimer/${id}`)
  }
  
  // getonecontact(id:any){
  //   return this.http.get(`${environment.baseurl}/contact/getone/${id}`)
  // }

}

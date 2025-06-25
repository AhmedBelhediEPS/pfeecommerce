import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProviderService {

  constructor(private http:HttpClient) { }


  getallprovider(){
    return this.http.get(`${environment.baseurl}/fournisseur/all`)
  }


  deleteprovider(id:any){
    return this.http.delete(`${environment.baseurl}/fournisseur/supprimer/${id}`)
  }
  
  getoneprovider(id:any){
    return this.http.get(`${environment.baseurl}/fournisseur/getone/${id}`)
  }

  updateimage(id:any,file:any){
    return this.http.put(`${environment.baseurl}/fournisseur/update/${id}`,file)
  }

}

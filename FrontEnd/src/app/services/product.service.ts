import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }

  getallproduct(){
    return this.http.get(`${environment.baseurl}/produit/all`)
  }

  getoneproduct(id:any){
    return this.http.get(`${environment.baseurl}/produit/getone/${id}`)
  }

  deleteproduct(id:any){
    return this.http.delete(`${environment.baseurl}/produit/supprimer/${id}`)
  }

  updateproduct(id:any,id_souscategorie:any,produit:any){
    return this.http.put(`${environment.baseurl}/produit/maj/${id}/${id_souscategorie}`,produit)
  }



  addproduct(produit:any,id_souscategorie:any,id_fournisseur:any){
    return this.http.post(`${environment.baseurl}/produit/ajouter1/${id_souscategorie}/${id_fournisseur}`,produit)
  }




}

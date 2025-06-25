import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubcategoryService {

  constructor(private http:HttpClient) { }

  getallsubcategory(){
    return this.http.get(`${environment.baseurl}/souscategorie/all`)
}


deletesubcategory(id:any){
  return this.http.delete(`${environment.baseurl}/souscategorie/supprimer/${id}`)
}
getonesubcategory(id:any){
  return this.http.get(`${environment.baseurl}/souscategorie/getone/${id}`)
}
updatesubcategory(id:any,subcatogery:any){
  return this.http.put(`${environment.baseurl}/souscategorie/maj/${id}`,subcatogery)
}
addsubcategory(souscategorie:any,id_categorie:any){
  return this.http.post(`${environment.baseurl}/souscategorie/ajouter/${id_categorie}`,souscategorie)
}




}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

getallcategory(){
    return this.http.get(`${environment.baseurl}/categorie/all`)
}
deletecategory(id:any){
  return this.http.delete(`${environment.baseurl}/categorie/supprimer/${id}`)
}
getonecategory(id:any){
  return this.http.get(`${environment.baseurl}/categorie/getone/${id}`)
}
updatecategory(id:any,subcatogery:any){
  return this.http.put(`${environment.baseurl}/categorie/maj/${id}`,subcatogery)
}

addcategory(category:any){
  return this.http.post(`${environment.baseurl}/categorie/ajouter`,category)
}



}

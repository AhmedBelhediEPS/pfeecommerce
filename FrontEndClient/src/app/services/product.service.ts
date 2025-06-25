import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) { }


  getallproduct(){
    return this.http.get(`${environment.baseurl}/produit/all`)
  }

  getallreview(){
    return this.http.get(`${environment.baseurl}/review/all`)
  }


 

  getoneproduct(id:any){
    return this.http.get<any[]>(`${environment.baseurl}/produit/getone/${id}`)
  }


  getallcategory(){
    return this.http.get<any[]>(`${environment.baseurl}/categorie/all`)
}


getallsubcategory(){
  return this.http.get(`${environment.baseurl}/souscategorie/all`)
}

updateqteclient(id:any,qte:any){
  return this.http.put(`${environment.baseurl}/produit/updateqteclient/${id}?qte=${qte}`,{})
}



addReview(review:any,id_user:any,id_product:any){
  return this.http.post(`${environment.baseurl}/review/save/${id_user}/${id_product}`,review)
}



updateAvgRating(id:any,AvgRating:any){
  return this.http.put(`${environment.baseurl}/produit/updateAvgRating/${id}?AvgRating=${AvgRating}`,{})
}



}

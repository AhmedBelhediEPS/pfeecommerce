import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http:HttpClient) { }




  
  getallorder(){
    return this.http.get(`${environment.baseurl}/commande/all`)
}





deleteorder(id:any){
  return this.http.delete(`${environment.baseurl}/commande/supprimer/${id}`)
}
getoneorder(id:any){
  return this.http.get(`${environment.baseurl}/commande/getone/${id}`)
}
updateorder(id:any,order:any){
  return this.http.put(`${environment.baseurl}/commande/maj/${id}`,order)
}

// addorder(order:any){
//   return this.http.post(`${environment.baseurl}/categorie/ajouter`,order)
// }















}

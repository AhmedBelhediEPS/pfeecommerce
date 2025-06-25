import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private http:HttpClient) { }



  getallwishlist(){
    return this.http.get(`${environment.baseurl}/wishlist/all`)
  }

  getonewishlist(id:any){
    return this.http.get(`${environment.baseurl}/wishlist/getone/${id}`)
  }





createWishlist(idclient:any,ids:any){
  return this.http.post(`${environment.baseurl}/wishlist/add/${idclient}?ids=${ids}`,{})
}





  // addcontact(contact:any){
  //   return this.http.post(`${environment.baseurl}/contact/ajouter`,contact)
  // }

  // savepassword(resettoken:any,newpassword:any){
  //   return this.http.post(`${environment.baseurl}/api/auth/savePassword/${resettoken}?newPassword=${newpassword}`,{})
  // }





  deletewishlist(id:any){
    return this.http.delete(`${environment.baseurl}/wishlist/delete/${id}`)
  }




}

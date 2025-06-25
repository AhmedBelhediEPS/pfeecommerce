import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {


items = [] as any;

  constructor() { }




  addToCart(addedItem:any){
this.items.push(addedItem);
this.saveCart();
  }




  itemInCart(item:any):boolean{
    return this.items.findIndex((o:any)=> o.id === item.id) > -1;
  }








  loadCart():void{
    this.items=JSON.parse(localStorage.getItem("cart_items")!) ?? [];
  }

  getItems(){
    return this.items;
  }











saveCart():void{
localStorage.setItem('cart_items',JSON.stringify(this.items));
}


removeItem(item:any){
  console.log(this.items)
  const index = this.items.findIndex((o:any)=> o.id === item.id);

  if(index > -1){
    this.items.splice(index, 1);
    this.saveCart();
  }
 
}





}

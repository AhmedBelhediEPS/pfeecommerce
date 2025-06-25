import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-detailcart',
  templateUrl: './detailcart.component.html',
  styleUrls: ['./detailcart.component.css']
})
export class DetailcartComponent implements OnInit{

  items = [] as any;

  constructor(private cartservice:CartService){}

  ngOnInit(): void {
    
  this.items=this.cartservice.getItems()

  }



  getTotal() {
    let total = 0;
    this.items.forEach((element:any)=>{
      total += Number(element.prix) * Number(element.qteclient);
    })
    return total;
  }

 

  checkout(){

    if(localStorage.getItem("state") == "0"){
      window.location.href="http://localhost:4200/checkout"
      // this.route.navigateByUrl("/")
    }

    else{
      window.location.href="http://localhost:4200/"}

    }







}

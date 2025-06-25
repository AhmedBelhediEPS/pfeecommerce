import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-detailorder',
  templateUrl: './detailorder.component.html',
  styleUrls: ['./detailorder.component.css']
})
export class DetailorderComponent implements OnInit{

  id=this.activeroute.snapshot.params["id"]
  order:any
  listorder:any
  listproduit:any

  constructor(private orderservice:OrderService,private activeroute:ActivatedRoute){}

  ngOnInit(): void {
    console.log("id",this.id)
    this.getorder()
    this.getallorder()
  }


  getorder(){
    console.log("get order")
    
    this.orderservice.getoneorder(this.id).subscribe((res:any)=>{
      this.order=res
      console.log(" order",this.order)
    } )
  }





getallorder(){
  console.log("get order")
  
  this.orderservice.getallorder().subscribe((res:any)=>{
    this.listorder=res
    console.log("list order",this.listorder)
  } )
}


















}

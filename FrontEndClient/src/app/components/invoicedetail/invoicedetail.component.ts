import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-invoicedetail',
  templateUrl: './invoicedetail.component.html',
  styleUrls: ['./invoicedetail.component.css']
})
export class InvoicedetailComponent implements OnInit {

  id=this.activeroute.snapshot.params["id"]
  customer:any
  listorder:any
  order:any
  

  constructor(private customerservice:CustomerService,private orderservice:OrderService,private activeroute:ActivatedRoute){}
  userconnect=JSON.parse(localStorage.getItem("userconnect")!)

  ngOnInit(): void {
    console.log("id",this.userconnect.id)
    console.log("userconnect",this.userconnect)
   this.getoneorder()
    this.getonecustomer()

    this.getallorder()

   
  }



  getoneorder(){
    console.log("get one order")
    
    this.orderservice.getoneorder(this.id).subscribe((res:any)=>{
      this.order=res
      console.log(" order",this.order)
    } )
  }





  getonecustomer(){
    
    this.customerservice.getonecustomer(this.userconnect.id).subscribe((res:any)=>{
      this.customer=res
      console.log("customer",this.customer)
    
    } )
  }




getallorder(){
    console.log("get order")
    
    this.orderservice.getallorder().subscribe((res:any)=>{
      this.listorder=res.filter((el:any)=>el.client.id==this.customer.id)

      console.log("list order",this.listorder)
    } )
  }



}

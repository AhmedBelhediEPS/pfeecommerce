import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit{

customer:any
listorder:any



  constructor(private customerservice:CustomerService,private orderservice:OrderService){}

  userconnect=JSON.parse(localStorage.getItem("userconnect")!)
  
  ngOnInit(): void {
    console.log("id",this.userconnect.id)
    console.log("userconnect",this.userconnect)
  
    this.getonecustomer()

    this.getallorder()
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

import { Component,OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-listcustomer',
  templateUrl: './listcustomer.component.html',
  styleUrls: ['./listcustomer.component.css']
})
export class ListcustomerComponent implements OnInit {

listcustomer:any
customer:any

  constructor(private customerservice:CustomerService){}

  ngOnInit(): void {


    this.getallcustomer()

  
  }


  getallcustomer(){
    console.log("get customer")
    this.customerservice.getallcustomer().subscribe((res:any)=>{
      this.listcustomer=res
      console.log("list customer",this.listcustomer)
    } )
  }



  

  deletecustomer(id:any){

    this.customerservice.deletecustomer(id).subscribe((res:any)=>{
      console.log(res)
      this.getallcustomer()
    
  })
}

open(customer:any) {

  this.customerservice.getonecustomer(customer.id).subscribe((res:any)=>{
    this.customer=res
    console.log("detail customer",this.customer)

  })
}





}

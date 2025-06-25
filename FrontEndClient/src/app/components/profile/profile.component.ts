import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  customer:any

  constructor(private customerservice:CustomerService, private authentificationservice:AuthentificationService,private route:Router){}

  userconnect=JSON.parse(localStorage.getItem("userconnect")!)

  ngOnInit(): void {

  console.log("id",this.userconnect.id)
  console.log("userconnect",this.userconnect)

  this.getonecustomer()
  }



  getonecustomer(){
    
    this.customerservice.getonecustomer(this.userconnect.id).subscribe((res:any)=>{
      this.customer=res
      console.log("customer",this.customer)
    
    } )
  }




  logout(){
    localStorage.clear()
    // this.route.navigateByUrl('/')
    window.location.href="http://localhost:4200/"
  }







  }

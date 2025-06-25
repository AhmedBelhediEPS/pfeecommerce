import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit{

  customer:any
    updateform :FormGroup

    constructor(private customerservice:CustomerService,private formbuilder:FormBuilder){}
    userconnect=JSON.parse(localStorage.getItem("userconnect")!)
    ngOnInit(): void {
      this.updateform=this.formbuilder.group({
        oldPassword:['',Validators.required],
        newPassword:['',Validators.required],
      })


      console.log("id",this.userconnect.id)
      console.log("userconnect",this.userconnect)
    
      this.getonecustomer()

    }
    reset(){
      this.customerservice.updatepwd(this.updateform.value).subscribe((res:any)=>{
        console.log(res)
      }
      )
  }



  getonecustomer(){
    
    this.customerservice.getonecustomer(this.userconnect.id).subscribe((res:any)=>{
      this.customer=res
      console.log("customer",this.customer)
    
    } )
  }

}
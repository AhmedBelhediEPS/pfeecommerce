import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { CustomerService } from 'src/app/services/customer.service';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit{

  
customer:any
profileform:FormGroup
fileToUpload:Array<File>=[];


  constructor(private customerservice:CustomerService,private formbuilder:FormBuilder,private route:Router){}

  userconnect=JSON.parse(localStorage.getItem("userconnect")!)

  ngOnInit(): void {
     console.log("id",this.userconnect.id)
  console.log("userconnect",this.userconnect)

  this.getonecustomer()




  this.profileform=this.formbuilder.group({

    // id:['',Validators.required],
    username:['',Validators.required],
    email:['',Validators.required],
    telephone:['',Validators.required],
    adresse:['',Validators.required],
    ville:['',Validators.required],
    codepostal:['',Validators.required],
    pays:['',Validators.required]

  })

  }



  handleFileInput(files:any){
    this.fileToUpload=<Array<File>>files.target.files;
    console.log(this.fileToUpload);
  }


  updateprofile(){

    let formdata=new FormData();
  formdata.append("username",this.profileform.value.username);
  formdata.append("email",this.profileform.value.email);
  formdata.append("telephone",this.profileform.value.telephone);
  formdata.append("adresse",this.profileform.value.adresse);
  formdata.append("ville",this.profileform.value.ville);
  formdata.append("codepostal",this.profileform.value.codepostal);
  formdata.append("pays",this.profileform.value.pays);
  formdata.append("file",this.fileToUpload[0]);
  
    this.customerservice.updatecustomer(this.customer.id,formdata).subscribe((res:any)=>{
      console.log(res)
    })
    this.route.navigateByUrl("/profile")
  }


  getonecustomer(){
    
    this.customerservice.getonecustomer(this.userconnect.id).subscribe((res:any)=>{
      this.customer=res
      console.log("customer",this.customer)
    
    } )
  }

}

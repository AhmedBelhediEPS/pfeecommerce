import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  adminsignupform:FormGroup
  providersignupform:FormGroup

  fileToUpload:Array<File>=[]
  
  constructor(private authentificationservice:AuthentificationService,private formbuilder:FormBuilder,private route:Router){}

  ngOnInit(): void {
    this.adminsignupform=this.formbuilder.group({
      username:['',Validators.required],
      password:['',Validators.required],
      email:['',Validators.required],
      role:['',Validators.required],
    })

    this.providersignupform=this.formbuilder.group({
      username:['',Validators.required],
      password:['',Validators.required],
      email:['',Validators.required],
      matricule:['',Validators.required],
      service:['',Validators.required],
      societe:['',Validators.required],
      role:['',Validators.required],
    })
  }



  handleFileInput(files:any){
    this.fileToUpload=<Array<File>>files.target.files;
    console.log(this.fileToUpload);
  }

  
  adminsignup(){
    this.adminsignupform.patchValue({role:["ROLE_ADMIN"]})
    let formdata=new FormData();
  formdata.append("username",this.adminsignupform.value.username);
  formdata.append("password",this.adminsignupform.value.password);
  formdata.append("email",this.adminsignupform.value.email);
  formdata.append("role",this.adminsignupform.value.role);
  formdata.append("file",this.fileToUpload[0]);
  console.log(this.adminsignupform.value)
    this.authentificationservice.adminsignup(formdata).subscribe((res:any)=>{
      console.log(res)
      this.route.navigateByUrl("/")
    }
    )
}


providersignup(){
  this.providersignupform.patchValue({role:["ROLE_FOURNISSEUR"]})
  let formdata=new FormData();
formdata.append("username",this.providersignupform.value.username);
formdata.append("password",this.providersignupform.value.password);
formdata.append("email",this.providersignupform.value.email);
formdata.append("matricule",this.providersignupform.value.matricule);
formdata.append("service",this.providersignupform.value.service);
formdata.append("societe",this.providersignupform.value.societe);
formdata.append("role",this.providersignupform.value.role);
formdata.append("file",this.fileToUpload[0]);
console.log(this.providersignupform.value)
  this.authentificationservice.providersignup(formdata).subscribe((res:any)=>{
    console.log(res)
    this.route.navigateByUrl("/")
  }
  )
}










}




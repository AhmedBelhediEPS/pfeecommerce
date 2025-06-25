import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

provider:any
admin:any
providerform:FormGroup
fileToUpload:Array<File>=[];

constructor(private providerservice:ProviderService,private authentificationservice:AuthentificationService,private formbuilder:FormBuilder){}

  userconnect=JSON.parse(localStorage.getItem("userconnect")!)

  ngOnInit(): void {
    console.log("id",this.userconnect.id)
    console.log("userconnect",this.userconnect)
    this.getoneadmin()


    this.providerform=this.formbuilder.group({

      // id:['',Validators.required],
      matricule:['',Validators.required],
      service:['',Validators.required],
      societe:['',Validators.required],
      username:['',Validators.required],
      email:['',Validators.required]
  })


this.getoneprovider()

  }

 
  getoneprovider(){
    
    this.providerservice.getoneprovider(this.userconnect.id).subscribe((res:any)=>{
      this.provider=res
      console.log("provider",this.provider)
      this.providerform.patchValue({
        username:this.provider.username,
        email:this.provider.email,
        service:this.provider.service,
        matricule:this.provider.matricule,
        societe:this.provider.societe,
      
      })
    } )
  }

  getoneadmin(){
    
    this.authentificationservice.getoneadmin(this.userconnect.id).subscribe((res:any)=>{
      this.admin=res
      console.log("admin",this.admin)
      this.providerform.patchValue({
        username:this.admin.username,
        email:this.admin.email,
    } )
  })
  }


isprovider(){
  return this.userconnect.roles[0]=="ROLE_FOURNISSEUR" ? true : false;
}
isadmin(){
  return this.userconnect.roles[0]=="ROLE_ADMIN" ? true : false;
}



updateprovider(){
  this.authentificationservice.updateprovider(this.provider.id,this.providerform.value).subscribe((res:any)=>{
    console.log(res)
    localStorage.setItem("email",JSON.stringify(res.email))
  localStorage.setItem("username",JSON.stringify(res.username))


  })
}




handleFileInput(files:any){
  this.fileToUpload=<Array<File>>files.target.files;
  console.log(this.fileToUpload);
}



updateimage(){

  let formdata=new FormData();
formdata.append("file",this.fileToUpload[0]);

  this.providerservice.updateimage(this.userconnect.id,formdata).subscribe((res:any)=>{
    console.log(res)
    this.getoneprovider()

  })
}






}

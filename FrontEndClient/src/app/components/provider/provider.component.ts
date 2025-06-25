import { Component,OnInit} from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';

@Component({
  selector: 'app-provider',
  templateUrl: './provider.component.html',
  styleUrls: ['./provider.component.css']
})



export class ProviderComponent implements OnInit {

  showForm = false; // Variable pour gérer l'affichage du formulaire
signupform:FormGroup
fileToUpload:Array<File>=[]


constructor(private authentificationservice:AuthentificationService,private formbuilder:FormBuilder,private route:Router){}


ngOnInit(): void {
    

  this.signupform=this.formbuilder.group({
    username:['',Validators.required],
    password:['',Validators.required],
    email:['',Validators.required],
    matricule:['',Validators.required],
    service:['',Validators.required],
    societe:['',Validators.required],
    role:['',Validators.required],
  })


}

  toggleRegistration() {
    this.showForm = !this.showForm; // Inverse la valeur de showForm à chaque clic sur le bouton
  }

  closeRegistration() {
    this.showForm = false; // Ferme le formulaire en changeant la valeur de showForm
  }


  signupfournisseur(){
    this.signupform.patchValue({role:["ROLE_FOURNISSEUR"]})
    let formdata=new FormData();
  formdata.append("username",this.signupform.value.username);
  formdata.append("password",this.signupform.value.password);
  formdata.append("email",this.signupform.value.email);

  formdata.append("matricule",this.signupform.value.matricule);
  formdata.append("service",this.signupform.value.service);
  formdata.append("societe",this.signupform.value.societe);
  
  formdata.append("role",this.signupform.value.role);
  formdata.append("file",this.fileToUpload[0]);
  console.log(this.signupform.value)
    this.authentificationservice.signupfournisseur(formdata).subscribe((res:any)=>{
      console.log(res)
      this.route.navigateByUrl("/")
    }
    )
  }


  handleFileInput(files:any){
    this.fileToUpload=<Array<File>>files.target.files;
    console.log(this.fileToUpload);
  }

}

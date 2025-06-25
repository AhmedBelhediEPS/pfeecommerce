import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  loginform:FormGroup
  signupform:FormGroup
  showSuccessMessage: boolean = false;
    showErrorMessage: boolean = false;

  fileToUpload:Array<File>=[]

  constructor(private authentificationservice:AuthentificationService,private formbuilder:FormBuilder,private route:Router){}

  ngOnInit(): void {
    this.loginform=this.formbuilder.group({
      username:['',Validators.required],
      password:['',Validators.required],
      })



      this.signupform=this.formbuilder.group({

        username:['',[Validators.required, Validators.pattern(/^[A-Za-z]+$/)]],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
          ],
        ],
        email:['',[Validators.required, Validators.pattern(/^[a-zA-Z0-9]+@[a-zA-Z]{2,}\.[a-zA-Z]{2,}$/)]],
        adresse:['',Validators.required],
        codepostal:['',Validators.required],
        pays:['',Validators.required],
        telephone:['',Validators.required],
        ville:['',Validators.required],
        role:['',Validators.required],

      })
  }


  signup(){
    this.signupform.patchValue({role:["ROLE_CLIENT"]})
    let formdata=new FormData();

  formdata.append("username",this.signupform.value.username);
  formdata.append("password",this.signupform.value.password);
  formdata.append("email",this.signupform.value.email);
  formdata.append("adresse",this.signupform.value.adresse);
  formdata.append("codepostal",this.signupform.value.codepostal);
  formdata.append("pays",this.signupform.value.pays);
  formdata.append("telephone",this.signupform.value.telephone);
  formdata.append("ville",this.signupform.value.ville);
  formdata.append("role",this.signupform.value.role);
  formdata.append("file",this.fileToUpload[0]);

  console.log(this.signupform.value)

    this.authentificationservice.signup(formdata).subscribe((res:any)=>{
      console.log(res)
   if (res.message === "Client registered successfully!") {
                this.showSuccessMessage = true;
                this.showErrorMessage = false;
            } else {
                this.showSuccessMessage = false;
                this.showErrorMessage = true;
            }
          
              this.route.navigateByUrl("/");
       
    }
    )
  }


  handleFileInput(files:any){
    this.fileToUpload=<Array<File>>files.target.files;
    console.log(this.fileToUpload);
  }


  login(){
    this.authentificationservice.authlogin(this.loginform.value).subscribe((res:any)=>{
    console.log(res)

    if(res.enabled==true){

      localStorage.setItem("userconnect",JSON.stringify(res))
      localStorage.setItem("token",res.accessToken)
      localStorage.setItem("refreshtoken",res.refreshToken)
      localStorage.setItem("state","0")
      // this.route.navigateByUrl("/home")
      window.location.href="http://localhost:4200/home"
    }

  })

  }


  


}

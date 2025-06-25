import { Component,OnInit } from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


loginform:FormGroup


  constructor(private authentificationservice:AuthentificationService,private formbuilder:FormBuilder,private route:Router){}

  ngOnInit(): void {
    this.loginform=this.formbuilder.group({
      username:['',Validators.required],
      password:['',Validators.required],
      })
  }



  login(){
    this.authentificationservice.authlogin(this.loginform.value).subscribe((res:any)=>{
    console.log(res)

    if(res.enabled==true){

      localStorage.setItem("userconnect",JSON.stringify(res))
      localStorage.setItem("username",JSON.stringify(res.username))
      localStorage.setItem("email",JSON.stringify(res.email))

      localStorage.setItem("token",res.accessToken)
      localStorage.setItem("refreshtoken",res.refreshToken)
      localStorage.setItem("state","0")
      this.route.navigateByUrl("/home")
    }

    
  })
  }






}

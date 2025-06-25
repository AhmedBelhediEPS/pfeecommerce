import { Component , OnInit} from '@angular/core';
import { AuthentificationService } from 'src/app/services/authentification.service';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.css']
})
export class ForgetpasswordComponent implements OnInit{

  forgetpwdform:FormGroup
  constructor(private authentificationservice:AuthentificationService,private formbuilder:FormBuilder,private route:Router){}

  ngOnInit(): void {
    this.forgetpwdform=this.formbuilder.group({
      email:['',Validators.required],
      })
  }
  

  forgetpwd(){
    
    this.authentificationservice.forgetpassword(this.forgetpwdform.value.email).subscribe((res:any)=>{
      console.log(res)
      this.route.navigateByUrl("/")
    })
}



}

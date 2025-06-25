import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthentificationService } from 'src/app/services/authentification.service';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  resettoken=this.activeroute.snapshot.params["resettoken"]
  resetform :FormGroup
  constructor(private authentificationservice:AuthentificationService,private formbuilder:FormBuilder,private route:Router,private activeroute:ActivatedRoute){}
  ngOnInit(): void {
    this.resetform=this.formbuilder.group({
      password:['',Validators.required],
    })
  }
  reset(){
    this.authentificationservice.savepassword(this.resettoken,this.resetform.value.password).subscribe((res:any)=>{
      console.log(res)
      this.route.navigateByUrl("/")
    }
    )
}

}




import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{


  contactform:FormGroup

  constructor(private contactservice:ContactService,private formbuilder:FormBuilder,private route:Router){}

  ngOnInit(): void {


    this.contactform=this.formbuilder.group({

      id:['',Validators.required],
      name:['',Validators.required],
      email:['',Validators.required],
      subject:['',Validators.required],
      message:['',Validators.required]
     
  })


  }



  addcontact(){
      
    this.contactservice.addcontact(this.contactform.value).subscribe((res:any)=>{
      console.log(res)
    })
  }



}

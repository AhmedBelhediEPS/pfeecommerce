import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{

listcontact:any
constructor(private contactservice:ContactService){}

ngOnInit(): void {
  this.getallcontact()
}





getallcontact(){
  console.log("get all contact")
  this.contactservice.getallcontact().subscribe((res:any)=>{
    this.listcontact=res
    console.log("list contact",this.listcontact)
  } )
  }






  deletecontact(id:any){
    this.contactservice.deletecontact(id).subscribe((res:any)=>{
      console.log(res)
    })
  }

  // getonecontact(id:any){
  //   this.contactservice.getonecontact(this.id).subscribe((res:any)=>{
  //     console.log(res)
  //   })
  // }



}

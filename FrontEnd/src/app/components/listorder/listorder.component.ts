import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-listorder',
  templateUrl: './listorder.component.html',
  styleUrls: ['./listorder.component.css']
})
export class ListorderComponent implements OnInit{

  listorder:any
  orderform:FormGroup

  search_order:any

  constructor(private orderservice:OrderService,private formbuilder:FormBuilder){}

  ngOnInit(): void {

    this.orderform=this.formbuilder.group({

      id:['',Validators.required],
      date:['',Validators.required],
      prix:['',Validators.required],
      reference:['',Validators.required]
  })
  this.getorder()
    
  }




getorder(){
  console.log("get order")
  
  this.orderservice.getallorder().subscribe((res:any)=>{
    this.listorder=res
    console.log("list order",this.listorder)
  } )
}


deleteorder(id:any){
  this.orderservice.deleteorder(id).subscribe((res:any)=>{
console.log(res)
this.getorder()
  })

}





// updateorder(){
//   this.orderservice.updateorder(this.orderform.value.id,this.orderform.value).subscribe((res:any)=>{
//     console.log(res)
//     this.getorder()
//   })
// }


// open(commande:any) {


//   this.orderform.patchValue({
//     id:commande.id,
//     date:commande.date,
//     prix:commande.prix,
//     reference:commande.reference
//   })
// }









}
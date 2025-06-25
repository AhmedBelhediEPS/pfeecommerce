import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{

  items = [] as any;
  orderform:FormGroup  
  customer:any

  product:any

  products:any=[]
  ids:any=[]

  total:any
  quantitetotale:any

  qte:number=0



  constructor(private cartservice:CartService,private customerservice:CustomerService,private formbuilder:FormBuilder,private orderservice:OrderService,private productservice:ProductService,private route:Router){}

  userconnect=JSON.parse(localStorage.getItem("userconnect")!)
  orderform1:FormGroup
  ngOnInit(): void {
    this.items=this.cartservice.getItems()
    console.log("id",this.userconnect.id)
    console.log("userconnect",this.userconnect)
  
    this.getonecustomer()

    this.orderform=this.formbuilder.group({
      date:['',Validators.required],
      prix:['',Validators.required],
      reference:['',Validators.required],
      quantitetotale:['',Validators.required],
      })

      this.orderform1=this.formbuilder.group({
        qteclient:['',Validators.required],
      })
    this.getQuantitetotale()
  }


  saveOrder(){ 
    this.orderform.patchValue({
      date:new Date().toISOString().split('T')[0].toString(),
      prix:this.total,
      reference:new Date().toISOString().split('T')[0].toString()+"-0000-" +"1"+ Math.random().toString().substr(2,3),
      quantitetotale:this.quantitetotale
    })

    this.orderservice.addorder1(this.userconnect.id,this.orderform.value).subscribe((res:any)=>{   
      console.log("order",res)
  
for(let i=0;i<this.items.length;i++){
  // this.ids.push(this.items[i].id)
  this.orderform1.patchValue({
    qteclient:this.items[i].qteclient
  })

this.orderservice.ajoutercommandeproduit(this.items[i].id,res.id,this.orderform1.value).subscribe((res:any)=>{   
  console.log("order",res)
window.location.href="http://localhost:4200/facture/"+res.commande.id

})
}
})   
this.getoneproduct()

// this.emptyCart()
}

// emptyCart(){   
//   localStorage.removeItem('cart_items');
//   window.location.href="http://localhost:4200/facture"
//     }
  

  getoneproduct(){
    for(let i=0;i<this.items.length;i++){
      this.productservice.getoneproduct(this.items[i].id).subscribe((res:any)=>{

        this.products.push(res);
        console.log("detail products",this.products)

    for(let j=0;j<this.products.length;j++){
      this.qte=Number(this.products[j].quantite) - Number(this.items[i].qteclient );
      console.log("qte",this.qte)
      this.orderservice.updateqte(this.items[i].id,this.qte).subscribe((res:any)=>{
        console.log("update qte",res)
      }) 
    } 
      } )
    }
  }

  


  
  getonecustomer(){
    
    this.customerservice.getonecustomer(this.userconnect.id).subscribe((res:any)=>{
      this.customer=res
      console.log("customer",this.customer)
    
    } )
  }




  getTotal() {
    let total = 0;
    this.items.forEach((element:any)=>{
      total += Number(element.prix) * Number(element.qteclient);
    })
    this.total=total
    return total;
  }

getQuantitetotale(){
  let quantitetotale = 0;
  this.items.forEach((element:any)=>{
    quantitetotale += Number(element.quantite);
  })
  this.quantitetotale=quantitetotale
  return quantitetotale;
}





 


}

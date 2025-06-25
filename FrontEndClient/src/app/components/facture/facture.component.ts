import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { OrderService } from 'src/app/services/order.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-facture',
  templateUrl: './facture.component.html',
  styleUrls: ['./facture.component.css']
})
export class FactureComponent implements OnInit{


  customer:any
  items = [] as any;

  id=this.activeroute.snapshot.params["id"]
  orderById:any
  
  constructor(private customerservice:CustomerService,private cartservice:CartService,private orderservice:OrderService,private activeroute:ActivatedRoute){}

  userconnect=JSON.parse(localStorage.getItem("userconnect")!)

  ngOnInit(): void {

    console.log("id",this.userconnect.id)
    console.log("userconnect",this.userconnect)
  
    this.getonecustomer()

    this.items=this.cartservice.getItems()
    

    // this.getallorder()
    this.getOrderById()
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
    return total;
  }



  public openPDF(): void {
    let DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('facture.pdf');

      this.emptyCart()
    });
    
  }




emptyCart(){   
  localStorage.removeItem('cart_items');
  window.location.href="http://localhost:4200/home"
    }




  // getallorder(){
  //   console.log("get order")
    
  //   this.orderservice.getallorder().subscribe((res:any)=>{
  //     this.listorder=res
  //     // .filter((el:any)=>el.customer.id==this.userconnect.id)

  //     console.log("list order",this.listorder)
  //   } )
  // }



getOrderById(){
 this.orderservice.getoneorder(this.id).subscribe((res:any)=>{
  this.orderById=res
  console.log("Order By ID : ",res)
})
}




}

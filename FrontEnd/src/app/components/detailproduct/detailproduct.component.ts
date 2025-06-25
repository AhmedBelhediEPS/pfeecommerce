import { Component,OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.component.html',
  styleUrls: ['./detailproduct.component.css']
})
export class DetailproductComponent implements OnInit{


  id=this.activeroute.snapshot.params["id"]
  produit:any

  constructor(private productservice:ProductService,private activeroute:ActivatedRoute){}

  ngOnInit(): void {
    console.log("id",this.id)
  this.getproduct()
  
  }

  getproduct(){
    this.productservice.getoneproduct(this.id).subscribe((res:any)=>{
      this.produit=res
      console.log("detail produit",res)
    })
  }

  

}

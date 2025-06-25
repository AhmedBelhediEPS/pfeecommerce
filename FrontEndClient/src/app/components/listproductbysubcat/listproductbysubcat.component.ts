import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-listproductbysubcat',
  templateUrl: './listproductbysubcat.component.html',
  styleUrls: ['./listproductbysubcat.component.css']
})
export class ListproductbysubcatComponent implements OnInit {

  id=this.activeroute.snapshot.params["id"]

  listproductbysubcat:any


  constructor(private productservice:ProductService,private activeroute:ActivatedRoute){}

  ngOnInit(): void {

    this.getproductsbysubcat()
    
  }


  getproductsbysubcat(){
    console.log("getproductsbysubcat")
    this.productservice.getallproduct().subscribe((res:any)=>{
      this.listproductbysubcat=res.filter((el:any)=>el.souscategorie.id==this.id)
     
      console.log("list product by subcat",this.listproductbysubcat)
    } )
  }



}

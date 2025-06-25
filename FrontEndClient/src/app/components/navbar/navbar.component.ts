import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{


  items = [] as any;

  listcategory:any
  listsubcategory:any
  


  
  // souscategories:any = [];


  // listsubcategoryCat1:any
  // listsubcategoryCat2:any
  
  listsubcategoryClothes:any
  listsubcategoryTech:any

  titre:any

  customer:any
  isLoggedIn: boolean;

  // id=this.activeroute.snapshot.params["id"]




constructor(private cartservice:CartService,private customerservice:CustomerService,private productservice:ProductService,private activeroute:ActivatedRoute){}


userconnect=JSON.parse(localStorage.getItem("userconnect")!)

ngOnInit(): void {
  this.cartservice.loadCart()
  this.items=this.cartservice.getItems()
  console.log("items",this.items)

  
  //  this.getTotal()
  //  console.log("total",this.getTotal())

  // console.log("userconnect",this.userconnect)
  this.getallcategory()
  this.getallsubcategory()
  // this.getallsubactegories1()
  // this.getallsubactegories2()

  this.getallsubcatclothes()
  // this.getallsubcattech()
this.getonecustomer()

// this.isConnected()
this.isLoggedIn = !!localStorage.getItem('token');


}




navigateToSubCat(id:any){
  window.location.href="http://localhost:4200/listproductbysubcat/"+id

}


// getallsubactegories1(){
//   this.productservice.getallsubcategory().subscribe((res:any)=>{
//     this.listsubcategoryCat1=res.filter((el:any)=>el.categorie.titre=="Cat1")
//     console.log("listsubcategoryCat1",this.listsubcategoryCat1)
//   })
// }

// getallsubactegories2(){
//   this.productservice.getallsubcategory().subscribe((res:any)=>{
//     this.listsubcategoryCat2=res.filter((el:any)=>el.categorie.titre=="Cat2")
//     console.log("listsubcategoryCat2",this.listsubcategoryCat2)
//   })
// }




getallsubcattech(titre:any){
  // console.log("titre",this.titre)
  this.productservice.getallsubcategory().subscribe((res:any)=>{
    this.listsubcategoryClothes=res.filter((el:any)=>el.categorie.titre==titre)
    console.log("listsubcategoryClothes",this.listsubcategoryClothes)
  })
}

getallsubcatclothes(){
  this.productservice.getallsubcategory().subscribe((res:any)=>{
    this.listsubcategoryTech=res.filter((el:any)=>el.categorie.titre=="Tech")
    console.log("listsubcategoryTech",this.listsubcategoryTech)
  })
}




getallcategory(){
  console.log("get category")
  this.productservice.getallcategory().subscribe((res:any)=>{
    this.listcategory=res
    console.log("list category",this.listcategory)
  } )
}

getallsubcategory(){
  console.log("get subcategory")
  this.productservice.getallsubcategory().subscribe((res:any)=>{
    this.listsubcategory=res
    console.log("list subcategory",this.listsubcategory)
  } )
}




removeItem(p:any){
    
  this.cartservice.removeItem(p);
  
}



getTotal() {
  let total = 0;
  this.items.forEach((element:any)=>{
    total += Number(element.prix) * Number(element.qteclient);
  })
  return total;
}






  navigate(){
    window.location.href="http://localhost:4200/listproduct"
  }



    navigateToContact(){
      window.location.href="http://localhost:4200/contact"
    }

    navigateToHome(){
      window.location.href="http://localhost:4200/home"
    }

    navigateToProvider(){
      window.location.href="http://localhost:4200/provider"
    }






getsubbycategory(e:any){
  console.log(e.target.value)
  this.productservice.getallsubcategory().subscribe((res:any)=>{
    this.listsubcategory=res.filter((el:any)=>el.categorie.id==e.target.value)
  })
}
    
  checkout(){

    if(localStorage.getItem("state") == "0"){
      window.location.href="http://localhost:4200/checkout"
      // this.route.navigateByUrl("/")
    }

    else{
      window.location.href="http://localhost:4200/"}

    }
    
  //   filterSoucategories(category:any){
  //     this.souscategories = this.listsubcategory.filter( (el:any) => 
  //         el.category.id == category.id
  //     );
  // }
  
// isConnected(){
  // return this.userconnect.enabled=="true" ? true : false;
// return this.token=="!null" ? true : false;
//  return this.isLoggedIn=="true" ? true : false;
    // if (localStorage.length === 0) {
    //   console.log('Local storage is empty.');
    // } else {
    //   console.log('Local storage is not empty.');
    // }
  
    

// }



getonecustomer(){
    
  this.customerservice.getonecustomer(this.userconnect.id).subscribe((res:any)=>{
    this.customer=res
    console.log("customer",this.customer)
  
  } )
}



}

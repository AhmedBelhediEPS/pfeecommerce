import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Options } from 'ng5-slider';
import { CartService } from 'src/app/services/cart.service';
import Swal from 'sweetalert2';
import { WishlistService } from 'src/app/services/wishlist.service';
// import { PaginationInstance } from 'ngx-pagination';

// import { NgxPaginationModule } from 'ngx-pagination';



@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})



export class ListproductComponent implements OnInit{

value=1
items = [] as any;

status:any

userconnect=JSON.parse(localStorage.getItem("userconnect")!)

priceSelection=""
  minValue = 0;
  maxValue = 6150000;
  options : Options={
    floor : 0,
    ceil : 6150000
  }

  // listproduct:any
  listproduct = [] as any;
  listcategory:any
  listsubcategory:any

  p: number = 1;
  search_product:any

  AvgRating:any
  listreview = [] as any;

  ids:any=[]



//   page: number = 1;
// pageSize: number = 3;
// maxSize: number = 5;

// config: PaginationInstance = {
//   id: 'advanced',
//   itemsPerPage: this.pageSize,
//   currentPage: this.page,
//   totalItems: this.listproduct.length
// };

  // totalPages=Math.ceil(this.listproduct.length/itemsPerPage);
  
  // sortCriteria: string = 'priceAsc';  

  constructor(private productservice:ProductService,private cartservice:CartService,private wishlistservice:WishlistService){}

  ngOnInit(): void {
    this.getproducts()

    this.getallcategory()

    this.getallsubcategory()
   
  }

  // createWishlist(idclient:any,ids:any){
  //   return this.http.post(`${environment.baseurl}/wishlist/add/${idclient}?ids=${ids}`,{})
  // }

CreateWishlist(p:any){
  this.ids.push(p.id)
  this.wishlistservice.createWishlist(this.userconnect.id,this.ids).subscribe((res:any)=>{

    console.log(res)
    // this.getwishlist()
  })
}




  addToCart(item:any) {

    if (!this.cartservice.itemInCart(item)) {

      item.qteclient = this.value;

      this.cartservice.addToCart(item); 
      this.items = this.cartservice.getItems();
      console.log(this.items)

      Swal.fire('product added')

    }
    this.productservice.updateqteclient(item.id,this.value).subscribe((res:any)=>{
      console.log(res)
    })
  }

  // isDispo(){
  //   return this.status=="Disponible" ? true : false;
  // }
  
  isDispo(product: any) {
    return product.status === "Disponible";
  }
  

//   getproductbysc(e:any){
// console.log(e.target.value)
// this.productservice.getallproduct().subscribe((res:any)=>{
//   this.listproduct=res.filter((el:any)=>el.souscategorie.id==e.target.value)
//   console.log("list product",this.listproduct)
// })
//   }



tempArray : any = [];
newArray : any = [];
arrays : any = [];

OnChange(event: any){
  if(event.target.checked){
    console.log("detected value",event.target.value)
   this.tempArray=this.arrays.filter((e:any)=>e.souscategorie.id==event.target.value);
    console.log("temporaire" , this.tempArray)
   this.listproduct=[]
   this.newArray.push(this.tempArray)
   for(let i=0;i< this.newArray.length;i++){
     var firstArray=this.newArray[i];
     for(let i=0;i<firstArray.length;i++){
       var obj=firstArray[i];
       this.listproduct.push(obj)
       console.log(this.listproduct)
     }
   }
  }

  else{

   this.tempArray=this.listproduct.filter((e:any)=>e.souscategorie.id!=event.target.value);
   this.newArray=[]
   this.listproduct=[]
   this.newArray.push(this.tempArray)
   for(let i=0;i< this.newArray.length;i++){
    var firstArray=this.newArray[i];
    if (firstArray.length==0){
      this.getproducts()
      
    }
    for(let i=0;i<firstArray.length;i++){
      var obj=firstArray[i];
      this.listproduct.push(obj)
      console.log("LIST PRODUCT",this.listproduct)
    }
  }
  

  }
  
  }

 


// getproducts(){
//   console.log("getproducts")
//   this.productservice.getallproduct().subscribe((res:any)=>{
//     this.listproduct=res
//     this.arrays=res
//     console.log("list product",this.listproduct)
    
//     this.listproduct = this.listproduct.sort((low:any, high:any) => low.prix - high.prix);
//   } )
// }

getproducts() {
  console.log("getproducts");
  this.productservice.getallproduct().subscribe((res: any) => {
    this.listproduct = res;
    this.arrays = res;
    console.log("list product", this.listproduct);

    // Ajouter la logique pour définir le statut en fonction de la quantité
    this.listproduct.forEach((product: any) => {
      product.status = product.quantite > 0 ? "Disponible" : "Indisponible";
    });

    this.listproduct = this.listproduct.sort((low: any, high: any) => low.prix - high.prix);
  });
}



changePrice(){
  console.log('price change',this.priceSelection);
  let event = this.priceSelection
  this.productservice.getallproduct().subscribe((res:any)=>{
  this.listproduct=res

  if (event !== undefined) {
    const ListproduitByPrice = this.listproduct.filter((elemt:any)=>
    elemt.prix >= event[0] && elemt.prix <= event[1]);
    this.listproduct = ListproduitByPrice;
    console.log('filter by price',this.listproduct) 
  }
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











// isDispo(){
//   return this.status=="Disponible" ? true : false;
// }

// isIndispo(){
//   return this.status=="Indisponible" ? true : false;
// }



// sortProducts(): void {
//   if (this.sortCriteria === 'priceAsc') {
//     this.listproduct.sort((a: any, b: any) => a.prix - b.prix);
//   } else if (this.sortCriteria === 'priceDesc') {
//     this.listproduct.sort((a: any, b: any) => b.prix - a.prix);
//   }
// }

  
sort(event: any) {
  switch (event.target.value) {
    case "L2H":
      {
        this.listproduct = this.listproduct.sort((low:any, high:any) => low.prix - high.prix);
        break;
      }

    case "H2L":
      {
        this.listproduct = this.listproduct.sort((low:any, high:any) => high.prix - low.prix);
        break;
      }

      case "AvgRating":
        {
          this.listproduct = this.listproduct.sort((low:any, high:any) => high.avgRating - low.avgRating);
          break;
        }

  }
  return this.listproduct;

}










// onPageChange(pageNumber: number) {
//   this.page = pageNumber;
// }


// navigateToDetailproduct(id:any){
//   window.location.href="http://localhost:4200/detailproduct/"+id

// }
// navigateToDetailproduct(id: any) {
//   const url = `http://localhost:4200/detailproduct/${id}`;
//   window.location.href = url;
// }




}

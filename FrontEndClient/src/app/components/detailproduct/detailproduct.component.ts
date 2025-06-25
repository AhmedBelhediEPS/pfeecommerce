import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.component.html',
  styleUrls: ['./detailproduct.component.css']
})
export class DetailproductComponent implements OnInit{

  id=this.activeroute.snapshot.params["id"]
  produit:any
images:any
 
 value:number=1;

items = [] as any;


reviewform :FormGroup
currentRate=2

status:any

hasReviewedProduct = false;

errorMessage: string = '';


listreview= [] as any;
// listreview2:any

AvgRating:number=0


stars: string[] = [];

  constructor(private productservice:ProductService,private cartservice:CartService,private activeroute:ActivatedRoute,private formbuilder:FormBuilder,private http:HttpClient){  this.generateStars();}

  userconnect=JSON.parse(localStorage.getItem("userconnect")!)

  ngOnInit(): void {
    console.log("id",this.id)
    this.getproduct()



    this.reviewform=this.formbuilder.group({
      ratingStar:['',Validators.required],
      ratingBox:['',Validators.required],
      reviewDate:['',Validators.required]

    })

// this.getStatut()
// this.getallreview()
    this.getallreviewbyidproductandaverage();
    // this.AverageReviews();
  }

 

  // AverageReviews(){
  //   console.log ("this.listreview.length : ",this.listreview.length);
  //   for (let i = 0; i < this.listreview.length; i++) {
  
  //     console.log ("this.listreview[i].ratingStar : ",this.listreview[i].ratingStar);
  //     this.AvgRating+=Number(this.listreview[i].ratingStar)/this.listreview.length;
  //     console.log ("AvgRating : ",this.AvgRating);
  //   }
  // }
  
  

  // getallreview(){
  //   console.log("get all review")
  
  //   this.productservice.getallreview().subscribe((res:any)=>{
  //     this.listreview=res


  //     console.log("list review",this.listreview)
  //   } )
  // }

// à voir demain : le filtre suivant ne marche pas !!

  getallreviewbyidproductandaverage(){
    console.log("get all reviews for one product")
  
    this.productservice.getallreview().subscribe((res:any)=>{
      this.listreview=res.filter((el:any)=>el.produit.id == this.id)

      console.log("list review",this.listreview)
      //////////////////////////////////////////////////////////////////////
      console.log ("this.listreview.length : ",this.listreview.length);
    for (let i = 0; i < this.listreview.length; i++) {
  
      // console.log ("this.listreview[i].ratingStar : ",this.listreview[i].ratingStar);
      this.AvgRating+=Number(this.listreview[i].ratingStar)/this.listreview.length;
    }
    console.log ("AvgRating : ",this.AvgRating);
    
    this.productservice.updateAvgRating(this.id,this.AvgRating).subscribe((res:any)=>
    {
      console.log("res",res)
    })

    } )
  }
 





  



  getproduct(){
    this.productservice.getoneproduct(this.id).subscribe((res:any)=>{
      this.produit=res
      this.images=this.produit.images
      console.log("images",this.images)
      console.log("detail produit",res)
      console.log('getStatut')
      if ( this.produit.quantite != 0 )
      {
        this.status="Disponible"
        console.log('Status : ',this.status)
      }
      else {
        this.status="Indisponible"
        console.log('Status : ',this.status)
      }
    })

  }



  isDispo(){
    return this.status=="Disponible" ? true : false;
  }

  isIndispo(){
    return this.status=="Indisponible" ? true : false;
  }



// getStatut(){
//   console.log('getStatut')
//   if ( this.produit.quantite != null )
//   {
//     console.log('Disponible',this.produit.quantite)
//   }
//   else {
//     console.log('indisponible')
//   }
// }






// getproduct(){
//   this.productservice.getoneproduct(this.id).subscribe((res:any)=>{
//     this.produit=res
//     this.images=this.produit.images
//     console.log("images",this.images)
//     console.log("detail produit",res)
//   })
// }







  // addreview(){

  //   this.reviewform.patchValue({
  //     ratingStar:this.currentRate,
  //     reviewDate:new Date().toISOString().split('T')[0].toString()
  //   })
    
  //       this.productservice.addReview(this.reviewform.value,this.userconnect.id,this.produit.id).subscribe((res:any)=>{
  //         console.log(res)
  //         this.hasReviewedProduct = true;

  //       })
       
  //     }


  addReview() {
    this.reviewform.patchValue({
      ratingStar:this.currentRate,
      reviewDate:new Date().toISOString().split('T')[0].toString()
    });
  
    this.productservice.addReview(this.reviewform.value, this.userconnect.id, this.produit.id).subscribe(
      (res: any) => {
        console.log(res);
        this.hasReviewedProduct = true;
      },
      (error: any) => {
        console.log(error);
        if (error.status === 400 && error.error === 'Review already submitted.') {
          // Show an error message to the user indicating that they have already submitted a review
          this.errorMessage = 'You have already submitted a review for this product.';
        } else {
          // Show a general error message to the user
          this.errorMessage = 'An error occurred while submitting your review. Please try again later.';
        }
      }
    );
  }
  







  addToCart(item:any) {

    if (!this.cartservice.itemInCart(item)) {

      item.qteclient = this.value;

      this.cartservice.addToCart(item); 
      this.items = this.cartservice.getItems();
      console.log(this.items)

      Swal.fire('product added')

    }
    this.productservice.updateqteclient(this.id,this.value).subscribe((res:any)=>{
      console.log(res)
    })
  }





public counter(){
if(this.value<this.produit.quantite)
this.value++;
}


public discounter(){
 if(this.value>1)
  this.value--;
  }



  generateStars() {
    for (let i = 0; i < 5; i++) {
      if (i < this.currentRate) {
        this.stars.push('fa fa-star gold');
      } else {
        this.stars.push('fa fa-star');
      }
    }
  }


  rateStar(rate: number) {
    this.currentRate = rate;
  }


}

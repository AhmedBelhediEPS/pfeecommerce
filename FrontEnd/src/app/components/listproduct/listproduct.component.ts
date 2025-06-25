import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-listproduct',
  templateUrl: './listproduct.component.html',
  styleUrls: ['./listproduct.component.css']
})
export class ListproductComponent implements OnInit{

listsubcategory:any
listproduct:any
produitform:FormGroup
fileToUpload:Array<File>=[];

search_product:any
p: number = 1;

myFiles:string []=[];

constructor(private productservice:ProductService,private subcategoryservice:SubcategoryService,private formbuilder:FormBuilder,route:Router){}


userconnect=JSON.parse(localStorage.getItem("userconnect")!)



ngOnInit(): void {
  this.produitform=this.formbuilder.group({

    id:['',Validators.required],
    nom:['',Validators.required],
    prix:['',Validators.required],
    description:['',Validators.required],
    quantite:['',Validators.required],
    id_souscategorie:['',Validators.required]
  
  })

  this.getproducts()
  this.getallsubcategory()
}



getallsubcategory(){
  console.log("bonjour")
  this.subcategoryservice.getallsubcategory().subscribe((res:any)=>{
    this.listsubcategory=res
    console.log("list subcategory",this.listsubcategory)
  } )
  }


// handleFileInput(files:any){
//   this.fileToUpload=<Array<File>>files.target.files;
//   console.log(this.fileToUpload);
 
// }

getproducts(){
  console.log("bonjour")
  this.productservice.getallproduct().subscribe((res:any)=>{
    this.listproduct=res
    console.log("liste produit",this.listproduct)
  } )
}

onFileChange(event:any){
  for ( var i=0;i<event.target.files.length;i++){
    this.myFiles.push(event.target.files[i]);
  }
}

updateproduct(){

  let formdata=new FormData();
formdata.append("nom",this.produitform.value.nom);
formdata.append("prix",this.produitform.value.prix);
formdata.append("description",this.produitform.value.description);
formdata.append("quantite",this.produitform.value.quantite);
formdata.append("id",this.produitform.value.id);

for (var i=0; i<this.myFiles.length;i++){
  formdata.append("files",this.myFiles[i]);
}
  this.productservice.updateproduct(this.produitform.value.id,this.produitform.value.id_souscategorie,formdata).subscribe((res:any)=>{
    console.log(res)
    this.getproducts()

  })
}





deleteproduct(id:any){
  this.productservice.deleteproduct(id).subscribe((res:any)=>{
    console.log(res)
    this.getproducts()
  })
}


open(produit:any) {


  this.produitform.patchValue({
    id:produit.id,
    nom:produit.nom,
    prix:produit.prix,
    description:produit.description,
    quantite:produit.quantite,
    subcategory:produit.souscategorie.titre
  })
  
}




isprovider(){
  return this.userconnect.roles[0]=="ROLE_FOURNISSEUR" ? true : false;
}


}

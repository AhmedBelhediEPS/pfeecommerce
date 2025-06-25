import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ProviderService } from 'src/app/services/provider.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddproductComponent implements OnInit{

// 
  myFiles:string []=[];
// 


  productform:FormGroup
  listprovider:any
  listsubcategory:any
  fileToUpload:Array<File>=[];

  constructor(private productservice:ProductService,private subcategoryservice:SubcategoryService,private provideservice:ProviderService,private formbuilder:FormBuilder,private route:Router){}
  
ngOnInit(): void {

  this.productform=this.formbuilder.group({
    nom:['',Validators.required],
    prix:['',Validators.required],
    description:['',Validators.required],
    quantite:['',Validators.required],
    provider_id:['',Validators.required],
    subcategory_id:['',Validators.required]
  })
  this.getallprovider()
  this.getallsubcategory()
  
}



// handleFileInput(files:any){
//   this.fileToUpload=<Array<File>>files.target.files;
//   console.log(this.fileToUpload);
// }


// 
onFileChange(event:any){
  for ( var i=0;i<event.target.files.length;i++){
    this.myFiles.push(event.target.files[i]);
  }
}
// 




addproduct(){

  let formdata=new FormData();
formdata.append("nom",this.productform.value.nom);
formdata.append("prix",this.productform.value.prix);
formdata.append("description",this.productform.value.description);
formdata.append("quantite",this.productform.value.quantite);
// formdata.append("file",this.fileToUpload[0]);

// 
for (var i=0; i<this.myFiles.length;i++){
  formdata.append("files",this.myFiles[i]);
}
// 

  this.productservice.addproduct(formdata,this.productform.value.subcategory_id,this.productform.value.provider_id).subscribe((res:any)=>{
    console.log(res)
    this.route.navigateByUrl("/listproduct")

  })
}

getallsubcategory(){
console.log("bonjour")
this.subcategoryservice.getallsubcategory().subscribe((res:any)=>{
  this.listsubcategory=res
  console.log("list subcategory",this.listsubcategory)
} )
}

getallprovider(){
console.log("bonjour")
this.provideservice.getallprovider().subscribe((res:any)=>{
  this.listprovider=res
  console.log("list provider",this.listprovider)
} )
}











}

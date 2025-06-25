import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';
import { SubcategoryService } from 'src/app/services/subcategory.service';

@Component({
  selector: 'app-listsubcategory',
  templateUrl: './listsubcategory.component.html',
  styleUrls: ['./listsubcategory.component.css']
})
export class ListsubcategoryComponent implements OnInit{

  listsubcategory:any
  subcategoryform:FormGroup
  addsubcategoryform:FormGroup
  listcategory:any

  constructor(private subcategoryservice:SubcategoryService,private categoryservice:CategoryService,private formbuilder:FormBuilder,private route:Router){}

  userconnect=JSON.parse(localStorage.getItem("userconnect")!)

  ngOnInit(): void {
    this.subcategoryform=this.formbuilder.group({

      id:['',Validators.required],
      titre:['',Validators.required],
      description:['',Validators.required],
      id_categorie:['',Validators.required]
    
    })
  
    this.getsubcategory()




    this.addsubcategoryform=this.formbuilder.group({
      titre:['',Validators.required],
      description:['',Validators.required],
      id_categorie:['',Validators.required]
    })
    this.getcategory()





  }





  getsubcategory(){
    console.log("get subcategory")
    this.subcategoryservice.getallsubcategory().subscribe((res:any)=>{
      this.listsubcategory=res
      console.log("list subcategory",this.listsubcategory)
    } )
  }


  deletesubcategory(id:any){
    this.subcategoryservice.deletesubcategory(id).subscribe((res:any)=>{
      console.log(res)
      this.getsubcategory()
      })
  }




  updatesubcategory(){
    this.subcategoryservice.updatesubcategory(this.subcategoryform.value.id,this.subcategoryform.value).subscribe((res:any)=>{
      console.log(res)
      this.getsubcategory()
    })
  }




  open(souscategorie:any) {


    this.subcategoryform.patchValue({
      id:souscategorie.id,
      titre:souscategorie.titre,
      description:souscategorie.description,
      id_categorie:souscategorie.id_categorie
    })
  }





  addsubcategory(){
    this.subcategoryservice.addsubcategory(this.addsubcategoryform.value,this.addsubcategoryform.value.id_categorie).subscribe((res:any)=>{
      console.log(res)
      this.getsubcategory()
    })
  }



  getcategory(){
    console.log("get category")
    this.categoryservice.getallcategory().subscribe((res:any)=>{
      this.listcategory =res
      console.log("list category",this.listcategory)
    })
}


isadmin(){
  return this.userconnect.roles[0]=="ROLE_ADMIN" ? true : false;
}


}



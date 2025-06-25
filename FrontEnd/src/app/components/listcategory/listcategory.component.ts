import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,Validators} from '@angular/forms'
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.component.html',
  styleUrls: ['./listcategory.component.css']
})
export class ListcategoryComponent implements OnInit{

  listcategory:any
  categoryform:FormGroup
  addcategoryform:FormGroup

  constructor(private categoryservice:CategoryService,private formbuilder:FormBuilder,private route:Router){}

  userconnect=JSON.parse(localStorage.getItem("userconnect")!)

  ngOnInit(): void {

    this.categoryform=this.formbuilder.group({

      id:['',Validators.required],
      titre:['',Validators.required],
      description:['',Validators.required]
  })
  this.getcategory()


  this.addcategoryform=this.formbuilder.group({

    titre:['',Validators.required], 
    description:['',Validators.required]
  
  })



  

  }




  getcategory(){
    console.log("get category")
    this.categoryservice.getallcategory().subscribe((res:any)=>{
      this.listcategory=res
      console.log("list category",this.listcategory)
    } )
  }


  deletecategory(id:any){

    this.categoryservice.deletecategory(id).subscribe((res:any)=>{
      console.log(res)
      this.getcategory()
    
  })
}



  updatecategory(){
    this.categoryservice.updatecategory(this.categoryform.value.id,this.categoryform.value).subscribe((res:any)=>{
      console.log(res)
      this.getcategory()
    })
  }


  open(category:any) {


    this.categoryform.patchValue({
      id:category.id,
      titre:category.titre,
      description:category.description
    })

  }




  addcategory(){
      
    this.categoryservice.addcategory(this.addcategoryform.value).subscribe((res:any)=>{
      console.log(res)
      this.getcategory()
    })
  }





  isadmin(){
    return this.userconnect.roles[0]=="ROLE_ADMIN" ? true : false;
  }



}

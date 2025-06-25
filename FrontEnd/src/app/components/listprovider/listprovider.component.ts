import { Component,OnInit} from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';

@Component({
  selector: 'app-listprovider',
  templateUrl: './listprovider.component.html',
  styleUrls: ['./listprovider.component.css']
})
export class ListproviderComponent implements OnInit {

listprovider:any
provider:any

  constructor(private providerservice:ProviderService){}
  ngOnInit(): void {
    this.getallprovider()
  }





  getallprovider(){
    console.log("get provider")
    this.providerservice.getallprovider().subscribe((res:any)=>{
      this.listprovider=res
      console.log("list provider",this.listprovider)
    } )
  }



  

  deleteprovider(id:any){

    this.providerservice.deleteprovider(id).subscribe((res:any)=>{
      console.log(res)
      this.getallprovider()
    
  })
}

open(provider:any) {

  this.providerservice.getoneprovider(provider.id).subscribe((res:any)=>{
    this.provider=res
    console.log("detail provider",this.provider)

  })
}






  




}

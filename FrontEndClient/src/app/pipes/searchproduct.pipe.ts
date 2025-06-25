import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchproduct'
})
export class SearchproductPipe implements PipeTransform {

  transform(value: any, term:any): any {
    
    if(term==null)
    {
      return value;
    }
    else{
      return value.filter((item:any)=>(item.nom.includes(term)))
    }
      }

}

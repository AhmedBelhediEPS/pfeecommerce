import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchorder'
})
export class SearchorderPipe implements PipeTransform {

  transform(value: any, term:any): any {
    
    if(term==null)
    {
      return value;
    }
    else{
      return value.filter((item:any)=>(item.name.includes(term)))
    }
      }

}

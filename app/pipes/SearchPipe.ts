import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'search'})
export class SearchPipe implements PipeTransform {
  transform(value: string[], search: string): string[] {
    if(!search){
      return value;
    }
    return value.filter((val)=> {
      //if(val.toString() && val.toString() === search) return true;
      if(val.startsWith) return val.startsWith(search);
      return (Object.getOwnPropertyNames(val).filter((prop) => {
         return (val[prop].startsWith && val[prop].startsWith(search));
      }).length > 0);
    });
  };
};

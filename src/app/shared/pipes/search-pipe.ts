import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {

  transform(value:any[],word:string): any[] {
    return value.filter((item)=> item.title.toLowerCase().includes(word.toLowerCase()));
  }

}

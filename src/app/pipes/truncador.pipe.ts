import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncador'
})
export class TruncadorPipe implements PipeTransform {

  transform(value: string, largo : number): any {
    if (value.length <= largo) {
      return value;
    }else{      
      return value.substring(0,largo) + '...';
    }
  }

}

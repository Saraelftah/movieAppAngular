import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'percentage'
})
export class PercentagePipe implements PipeTransform {

  transform(value: number): string {
     if (value < 0 || value > 100) {
      return 'Invalid percentage';
    }
    const percent = Math.round(value *  10)
    return `${percent}%`;
  }
    
}


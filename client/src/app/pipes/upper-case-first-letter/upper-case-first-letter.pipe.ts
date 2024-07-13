import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'upperCaseFirstLetter',
  standalone: true
})
export class UpperCaseFirstLetterPipe implements PipeTransform {
  transform(value: string): string {
    if(!value) {
      return '';
    }
    
    return value.slice(0, 1).toUpperCase() + value.slice(1)
  }
}

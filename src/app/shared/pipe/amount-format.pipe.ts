import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'amountFormat'
})
export class AmountFormatPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (typeof value === 'string') {
      return value;
    } else if (typeof value === 'number') {
      return value.toFixed(2);
    }
    return null;
  }
}

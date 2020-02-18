import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  // tslint:disable-next-line: max-line-length
  transform(
    value: string,
    limit = 25,
    completeWords = false,
    ellipsis = '<a href="javascript:void(0)" ng-click="moreDetails(event)" style="color: #b32d38;">...more</a>') {
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }

}

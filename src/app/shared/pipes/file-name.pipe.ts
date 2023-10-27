import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate',
})
export class TruncatePipe implements PipeTransform {
  transform(fileName: string) {
    if (fileName.length > 36) {
      return fileName.slice(0, 36) + '...';
    }
    return fileName;
  }
}

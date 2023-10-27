import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fileSize',
})
export class FileSizePipe implements PipeTransform {
  readonly fileSizeExtension = ['B', 'KB', 'MB', 'GB'];
  transform(size: number): string {
    let convertedSize = size;
    let extensionIndex = 0;
    while (convertedSize >= 1024 && extensionIndex <= 3) {
      extensionIndex++;
      convertedSize = convertedSize / 1024;
    }
    return `${Math.round(convertedSize)} ${
      this.fileSizeExtension[extensionIndex]
    }`;
  }
}

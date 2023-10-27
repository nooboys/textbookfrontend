import { Component } from '@angular/core';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from './icons/icon-subset';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent {
  constructor(iconSetService: IconSetService) {
    iconSetService.icons = { ...iconSubset };
  }
}

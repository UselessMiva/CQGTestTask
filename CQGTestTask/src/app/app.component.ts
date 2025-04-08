import { Component } from '@angular/core';
import { PackageListComponent } from './package-list/package-list.component';
import { provideHttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  template: ` <app-package-list></app-package-list> `,
  styles: [
    `
      h1 {
        text-align: center;
        color: rgb(35, 62, 217);
        margin: 20px 0;
      }
    `,
  ],
  imports: [PackageListComponent],
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}

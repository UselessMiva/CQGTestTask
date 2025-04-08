import { Component } from '@angular/core';
import { PackageListComponent } from './package-list/package-list.component';
import { provideHttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  template: ` <app-package-list></app-package-list> `,
  styles: [],
  imports: [PackageListComponent],
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
}

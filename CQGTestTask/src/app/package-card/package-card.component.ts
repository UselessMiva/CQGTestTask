import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PackageWithDependencies } from '../interfaces/packageWithDependencies.interface';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-package-card',
  imports: [MatIconModule],
  templateUrl: './package-card.component.html',
  styleUrl: './package-card.component.css',
})
export class PackageCardComponent {
  @Input() package!: PackageWithDependencies;
  @Input() highlighted = false;
  @Input() dependencyHighlight = false;
  @Output() hover = new EventEmitter<string[]>();

  formatNumber(num: number): string {
    if (num >= 1000000) {
      return `${Math.floor(num / 1000000)}M`;
    }
    if (num >= 1000) {
      return `${Math.floor(num / 1000)}K`;
    }
    return num.toString();
  }

  getPackageNameParts(): {
    packageCoreName: string | null;
    packageModuleName: string;
  } {
    const parts = this.package.id.split('/');
    return parts.length > 1
      ? {
          packageCoreName: parts[0],
          packageModuleName: parts.slice(1).join('/'),
        }
      : { packageCoreName: null, packageModuleName: this.package.id };
  }

  onMouseEnter() {
    if (this.package) {
      this.hover.emit(this.package.dependencies);
    }
  }

  onMouseLeave() {
    this.hover.emit([]);
  }
}

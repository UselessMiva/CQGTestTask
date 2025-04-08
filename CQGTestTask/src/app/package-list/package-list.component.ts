import { Component, OnInit } from '@angular/core';
import { PackageWithDependencies } from '../interfaces/packageWithDependencies.interface';
import { PackageService } from '../services/package.service';
import { FormsModule } from '@angular/forms';
import { PackageCardComponent } from '../package-card/package-card.component';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-package-list',
  imports: [FormsModule, PackageCardComponent, MatIconModule],
  templateUrl: './package-list.component.html',
  styleUrl: './package-list.component.css',
})
export class PackageListComponent {
  packages: PackageWithDependencies[] = [];
  filteredPackages: PackageWithDependencies[] = [];
  searchExpression = '';
  highlightedDependencies: string[] = [];

  constructor(private packageService: PackageService) {}

  ngOnInit(): void {
    this.fetchPackages();
  }

  fetchPackages(): void {
    this.packageService.getPackagesWithDependencies().subscribe({
      next: (packages) => {
        this.packages = packages;
        this.filterPackages();
      },
      error: (err) => console.error(err),
    });
  }

  Renew(): void {
    this.fetchPackages();
    this.onSearchChange('');
  }

  filterPackages(): void {
    if (!this.searchExpression) {
      this.filteredPackages = [...this.packages];
    } else {
      this.filteredPackages = this.packages.filter((pkg) =>
        pkg.id.toLowerCase().includes(this.searchExpression.toLowerCase())
      );
    }
  }
  onSearchChange(searchExpression: string): void {
    this.searchExpression = searchExpression;
    this.filterPackages();
  }

  onDependencyHover(dependencyIds: string[]): void {
    this.highlightedDependencies = dependencyIds;
  }

  isDependencyHighlighted(packageId: string): boolean {
    return this.highlightedDependencies.includes(packageId);
  }
}

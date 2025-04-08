import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Package } from '../interfaces/package.interface';
import { PackageWithDependencies } from '../interfaces/packageWithDependencies.interface';

@Injectable({
  providedIn: 'root',
})
export class PackageService {
  constructor(private http: HttpClient) {}

  getPackages(): Observable<Package[]> {
    return this.http.get<Package[]>(`api/packages`);
  }

  getPackageDependencies(id: string): Observable<string[]> {
    const encodedId = encodeURIComponent(id);
    return this.http
      .get<string[]>(`api/packages/${encodedId}/dependencies`)
      .pipe(
        catchError((err) => {
          console.error(`Error fetching dependencies for ${id}:`, err);
          return of([]);
        })
      );
  }
  getPackagesWithDependencies(): Observable<PackageWithDependencies[]> {
    return this.getPackages().pipe(
      mergeMap((packages) => {
        const dependencyRequests = packages.map((pkg) =>
          this.getPackageDependencies(pkg.id).pipe(
            map((dependencies) => ({
              ...pkg,
              dependencies,
            }))
          )
        );
        return forkJoin(dependencyRequests);
      })
    );
  }
}

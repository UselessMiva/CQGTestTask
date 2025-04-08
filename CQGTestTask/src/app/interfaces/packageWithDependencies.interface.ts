import { Package } from './package.interface';
export interface PackageWithDependencies extends Package {
  dependencies: string[];
}

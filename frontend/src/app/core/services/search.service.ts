import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin, map, tap } from 'rxjs';

// shared/search.service.ts
@Injectable({ providedIn: 'root' })
export class SearchService {
  constructor(private http: HttpClient) {}

 searchAll(query: string): Observable<any[]> {
  return forkJoin({
    assets: this.http.get<any>('https://localhost:7186/api/Assets'),
    employees: this.http.get<any>('https://localhost:7186/api/Employees'),
    assignments: this.http.get<any>('https://localhost:7186/api/AssetAssignments'),
    categories: this.http.get<any>('https://localhost:7186/api/AssetCategories'),
  }).pipe(
    tap(data => console.log('Raw API results:', data)),

    map((results) => {
      const assets = results.assets?.$values || [];
      const employees = results.employees?.$values || [];
      const assignments = results.assignments?.$values || [];
      const categories = results.categories?.$values || [];

      const queryLower = query.toLowerCase();

      return [
        ...assets
          .filter((a: any) => a.name?.toLowerCase().includes(queryLower))
          .map((a: any) => ({ type: 'Asset', data: a })),

        ...employees
          .filter((e: any) => e.name?.toLowerCase().includes(queryLower))
          .map((e: any) => ({ type: 'Employee', data: e })),

        ...assignments
          .filter((a: any) =>
            a.asset?.name?.toLowerCase().includes(queryLower) ||
            a.employee?.name?.toLowerCase().includes(queryLower)
          )
          .map((a: any) => ({ type: 'Assignment', data: a })),

        ...categories
          .filter((c: any) => c.name?.toLowerCase().includes(queryLower))
          .map((c: any) => ({ type: 'Category', data: c })),
        ];
      })
    );
  }
}


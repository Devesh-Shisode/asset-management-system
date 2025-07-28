import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Asset } from 'src/app/shared/models/asset';
import { AssetCategory } from 'src/app/shared/models/assetcategory';
import { Employee } from 'src/app/shared/models/employee';

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private assetUrl = 'https://localhost:7186/api/Assets';
  private categoryUrl = 'https://localhost:7186/api/AssetCategories';
  private employeeUrl = 'https://localhost:7186/api/Employees';
  private assetAssignment = 'https://localhost:7186/api/AssetAssignments';

  constructor(private http: HttpClient) {}

  // 🔹 Asset
  getAssets(): Observable<Asset[]> {
    return this.http.get<any>(this.assetUrl).pipe(
      map(res => res.$values ?? res) // fallback if $values is not present
    );
  }

  addAsset(asset: Asset): Observable<Asset> {
    return this.http.post<Asset>(this.assetUrl, asset);
  }

  updateAsset(asset: Asset): Observable<Asset> {
    return this.http.put<Asset>(`${this.assetUrl}/${asset.assetId}`, asset);
  }

  deleteAsset(id: number): Observable<void> {
    return this.http.delete<void>(`${this.assetUrl}/${id}`);
  }

  // 🔹 Asset Categories
  getAssetCategories(): Observable<AssetCategory[]> {
    return this.http.get<any>(this.categoryUrl).pipe(
      map(res => res.$values ?? res)
    );
  }

  addCategory(category: AssetCategory): Observable<AssetCategory> {
    return this.http.post<AssetCategory>(this.categoryUrl, category);
  }

  updateCategory(category: AssetCategory): Observable<AssetCategory> {
    return this.http.put<AssetCategory>(`${this.categoryUrl}/${category.categoryId}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.categoryUrl}/${id}`);
  }

  // 🔹 Asset Assignments
  getAssignments(): Observable<any[]> {
    return this.http.get<any>(this.assetAssignment).pipe(
      map(res => res.$values ?? res)
    );
  }

  assignAsset(data: {
    assetId: number;
    employeeId: number;
    assignedDate: string;
  }): Observable<any> {
    return this.http.post<any>(this.assetAssignment, data);
  }

  returnAsset(id: number): Observable<void> {
    return this.http.put<void>(`${this.assetAssignment}/${id}/return`, {});
  }

  deleteAssignment(id: number): Observable<void> {
    return this.http.delete<void>(`${this.assetAssignment}/${id}`);
  }

  // 🔹 Employees
  getEmployees(): Observable<Employee[]> {
    return this.http.get<any>(this.employeeUrl).pipe(
      map(res => res.$values ?? res)
    );
  }

  addEmployee(employee: Employee): Observable<Employee> {
    return this.http.post<Employee>(this.employeeUrl, employee);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.employeeUrl}/${id}`);
  }

  updateEmployee(id: number, employee: Employee): Observable<void> {
    return this.http.put<void>(`${this.employeeUrl}/${id}`, employee);
  }

  deleteEmployee(id: number): Observable<void> {
    console.log(id);
    
    return this.http.delete<void>(`${this.employeeUrl}/${id}`);
  }
}

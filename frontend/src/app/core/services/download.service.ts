// download.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DownloadService {
  private assetUrl = 'https://localhost:7186/api/Assets';
  private categoryUrl = 'https://localhost:7186/api/AssetCategories';
  private employeeUrl = 'https://localhost:7186/api/Employees';
  private assetAssignmentUrl = 'https://localhost:7186/api/AssetAssignments';

  constructor(private http: HttpClient) {}

  getAssets() {
    return this.http.get<any[]>(this.assetUrl);
  }

  getCategories() {
    return this.http.get<any[]>(this.categoryUrl);
  }

  getEmployees() {
    return this.http.get<any[]>(this.employeeUrl);
  }

  getAssetAssignments() {
    return this.http.get<any[]>(this.assetAssignmentUrl);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Asset } from 'src/app/shared/models/asset';
import { AssetCategory } from 'src/app/shared/models/assetcategory';
 

@Injectable({
  providedIn: 'root',
})
export class AssetService {
  private assetUrl = 'https://localhost:7186/api/Assets';
  private categoryUrl = 'https://localhost:7186/api/AssetCategories';

  constructor(private http: HttpClient) {}

  getAssets(): Observable<Asset[]> {
    return this.http.get<Asset[]>(this.assetUrl);
  }

  getAssetCategories(): Observable<AssetCategory[]> {
    return this.http.get<AssetCategory[]>(this.categoryUrl);
  }

  addAsset(asset: Asset): Observable<Asset> {
    return this.http.post<Asset>(this.assetUrl,{ assetDto: asset});
  }

  updateAsset(asset: Asset): Observable<Asset> {
    return this.http.put<Asset>(`${this.assetUrl}/${asset.assetId}`, asset);
  }

  deleteAsset(id: number): Observable<void> {
    return this.http.delete<void>(`${this.assetUrl}/${id}`);
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

}

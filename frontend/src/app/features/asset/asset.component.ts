import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AssetService } from 'src/app/core/services/asset.service';
import { Asset } from 'src/app/shared/models/asset';
import { AssetCategory } from 'src/app/shared/models/assetcategory';

@Component({
  selector: 'app-asset',
  templateUrl: './asset.component.html',
  styleUrls: ['./asset.component.css']
})
export class AssetComponent implements OnInit {
  assets: Asset[] = [];
  categories: AssetCategory[] = [];

  newAsset: Asset = {
    name: '',
    categoryId: 0,
    serialNumber: '',
    purchaseDate: '',
    warrantyMonths: 0,
    statusId: 1,
    description: ''
  };

  isEditMode = false;
  editId: number | null = null;

  constructor(private assetService: AssetService) {}

  ngOnInit(): void {
    this.fetchAssets();
    this.fetchCategories();
  }

  fetchAssets() {
    this.assetService.getAssets().subscribe(data => {
      this.assets = data;
    });
  }

  fetchCategories() {
    this.assetService.getAssetCategories().subscribe(data => {
      this.categories = data;
    });
  }

  onSubmit(form: NgForm) {
    if (this.isEditMode && this.editId !== null) {
      const updatedAsset: Asset = {
        assetId: this.editId,
        name: form.value.name,
        categoryId: form.value.categoryId,
        serialNumber: form.value.serialNo,
        purchaseDate: form.value.purchaseDate,
        warrantyMonths: form.value.warrentyMonths,
        statusId: form.value.statusId,
        description: form.value.description
      };

      this.assetService.updateAsset(updatedAsset).subscribe(() => {
        this.fetchAssets();
        this.resetForm(form);
      });
    } else {
    this.assetService.addAsset(this.newAsset).subscribe({
  next: () => {
    this.fetchAssets();
    this.resetForm(form);
  },
  error: (error) => {
    console.error("Asset creation failed:", error.error.errors);
  }
});
    }
  }

  editAsset(asset: Asset) {
    this.newAsset = { ...asset };
    this.editId = asset.assetId!;
    this.isEditMode = true;
  }

  deleteAsset(id: number) {
    if (confirm('Are you sure you want to delete this asset?')) {
      this.assetService.deleteAsset(id).subscribe(() => {
        this.fetchAssets();
      });
    }
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.newAsset = {
      name: '',
      categoryId: 0,
      serialNumber: '',
      purchaseDate: '',
      warrantyMonths: 0,
      statusId: 1,
      description: ''
    };
    this.editId = null;
    this.isEditMode = false;
  }

  getCategoryName(categoryId: number): string {
    const category = this.categories.find(c => c.categoryId === categoryId);
    return category ? category.name : 'Unknown';
  }
}

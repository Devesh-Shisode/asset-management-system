import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AssetService } from 'src/app/core/services/asset.service';
import { AssetCategory } from 'src/app/shared/models/assetcategory';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: AssetCategory[] = [];
  isEditMode = false;
  editId: number | null = null;

  newCategory: AssetCategory = {
    categoryId: 0,
    name: ''
  };

  constructor(private assetService: AssetService) {}

  ngOnInit(): void {
    
    this.fetchCategories();

  }

  fetchCategories() {
    this.assetService.getAssetCategories().subscribe((data : any) => {
      console.log(data);
      
      this.categories = data
    });
  }

  onSubmit(form: NgForm) {
    if (this.isEditMode && this.editId !== null) {
      const updatedCategory: AssetCategory = {
        categoryId: this.editId,
        name: form.value.name
      };

      this.assetService.updateCategory(updatedCategory).subscribe(() => {
        this.fetchCategories();
        this.resetForm(form);
      });
    } else {
      this.assetService.addCategory(this.newCategory).subscribe({
  next: () => {
    this.fetchCategories();
   // form.resetForm();
  },
  error: (err) => {
    console.error('API Error:', err.error.err);
  }
});
    }
  }

  editCategory(category: AssetCategory) {
    this.newCategory = { ...category };
    this.editId = category.categoryId;
    this.isEditMode = true;
  }

  deleteCategory(id: number) {
    if (confirm('Are you sure you want to delete this category?')) {
      this.assetService.deleteCategory(id).subscribe(() => {
        this.fetchCategories();
      });
    }
  }

  resetForm(form: NgForm) {
    form.resetForm();
    this.newCategory = {
      categoryId: 0,
      name: ''
    };
    this.editId = null;
    this.isEditMode = false;
  }

    

}

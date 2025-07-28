import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesComponent } from './categories.component';

const routes: Routes = [
  { path: '', component: CategoriesComponent }
];

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    FormsModule, RouterModule.forChild(routes)
  ]
})
export class CategoriesModule {
    constructor(){
    console.log('categories loaded');
    
  }
 }

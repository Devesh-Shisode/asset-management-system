import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AssetComponent } from './asset.component';

const routes: Routes = [
  { path: '', component: AssetComponent }
];

@NgModule({
  declarations: [AssetComponent],
  imports: [
    CommonModule,FormsModule, RouterModule.forChild(routes)
  ]
})
export class AssetModule { 
    constructor(){
    console.log('asset loaded');
    
  }
}

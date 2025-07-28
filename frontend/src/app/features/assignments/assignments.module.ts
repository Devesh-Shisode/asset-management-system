import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AssignmentsComponent } from './assignments.component';

const routes: Routes = [
  { path: '', component: AssignmentsComponent }
];

@NgModule({
  declarations: [AssignmentsComponent],
  imports: [
    CommonModule,
    FormsModule, RouterModule.forChild(routes)
  ]
})
export class AssignmentsModule { 
  
    constructor(){
    console.log('assetassignment loaded');
    
  }
}

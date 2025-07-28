import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { EmployeesComponent } from './employees.component';

const routes: Routes = [
  { path: '', component: EmployeesComponent }
];

@NgModule({
  declarations: [EmployeesComponent],
  imports: [
    CommonModule,
    FormsModule, RouterModule.forChild(routes)
  ]
})
export class EmployeesModule { 
    constructor(){
    console.log('employee loaded');
    
  }
}

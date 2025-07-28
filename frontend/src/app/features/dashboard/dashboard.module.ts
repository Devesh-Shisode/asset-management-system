import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { NgChartsModule } from 'ng2-charts';


const routes: Routes = [
  { path: '', component: DashboardComponent }
];

@NgModule({
  declarations: [DashboardComponent],
  imports: [
     CommonModule,
        FormsModule, RouterModule.forChild(routes),
        NgChartsModule,
        
  ]
})
export class DashboardModule {
  constructor(){
    console.log('dashboard loaded');
    
  }
 }

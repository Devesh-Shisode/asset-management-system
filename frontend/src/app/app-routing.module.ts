import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AssignmentsComponent } from './features/assignments/assignments.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { EmployeesComponent } from './features/employees/employees.component';
import { AssetComponent } from './features/asset/asset.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },         // Default route
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'categories', component: CategoriesComponent },
  { path: 'assets', component: AssetComponent },
  { path: 'assignments', component: AssignmentsComponent },
  { path: 'employees', component: EmployeesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

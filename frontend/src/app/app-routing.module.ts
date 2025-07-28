import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { AssignmentsComponent } from './features/assignments/assignments.component';
import { CategoriesComponent } from './features/categories/categories.component';

import { AssetComponent } from './features/asset/asset.component';
import { SearchResultsComponent } from './features/search-results/search-results.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./features/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./features/categories/categories.module').then(
        (m) => m.CategoriesModule
      ),
  },
  {
    path: 'assets',
    loadChildren: () =>
      import('./features/asset/asset.module').then((m) => m.AssetModule),
  },
  { path: 'assignments', component: AssignmentsComponent },
  {
    path: 'employees',
    loadChildren: () =>
      import('./features/employees/employees.module').then(
        (m) => m.EmployeesModule
      ),
  },
    {
    path: 'assignments',
    loadChildren: () =>
      import('./features/assignments/assignments.module').then(
        (m) => m.AssignmentsModule
      ),
  },
  {
      path: 'search-results',
  component: SearchResultsComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

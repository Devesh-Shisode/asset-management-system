import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
 
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { CategoriesComponent } from './features/categories/categories.component';
import { AssignmentsComponent } from './features/assignments/assignments.component';
import { EmployeesComponent } from './features/employees/employees.component';
import { SidebarComponent } from './shared/componets/sidebar/sidebar.component';
import { LoginComponent } from './auth/login/login.component';
import { AssetComponent } from './features/asset/asset.component';

@NgModule({
  declarations: [
    AppComponent,
     AssetComponent,
    DashboardComponent,
    CategoriesComponent,
    AssignmentsComponent,
    EmployeesComponent,
    SidebarComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

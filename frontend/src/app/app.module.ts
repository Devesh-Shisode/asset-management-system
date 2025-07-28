import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { SidebarComponent } from './shared/componets/sidebar/sidebar.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './shared/componets/header/header.component';
import { FooterComponent } from './shared/componets/footer/footer.component';
import { SearchResultsComponent } from './features/search-results/search-results.component';
import { DownloadComponent } from './features/download/download.component';
import { FilterPipe } from './shared/pipes/filter.pipe';
 

@NgModule({
  declarations: [AppComponent, SidebarComponent, LoginComponent, HeaderComponent, FooterComponent, SearchResultsComponent, DownloadComponent, FilterPipe],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule,NgChartsModule ,ReactiveFormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

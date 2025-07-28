import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { SidebarComponent } from './shared/componets/sidebar/sidebar.component';
import { LoginComponent } from './auth/login/login.component';
import { HeaderComponent } from './shared/componets/header/header.component';
import { FooterComponent } from './shared/componets/footer/footer.component';
import { SearchResultsComponent } from './features/search-results/search-results.component';

@NgModule({
  declarations: [AppComponent, SidebarComponent, LoginComponent, HeaderComponent, FooterComponent, SearchResultsComponent,],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule,NgChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

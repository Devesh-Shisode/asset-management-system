import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CompanyNameService } from 'src/app/core/services/compny-name.service';
 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

     
companyName: string = 'CodeDisha Technologies';

  searchQuery: string = '';
  results: any[] = [];
  constructor(private companyService : CompanyNameService ,private router: Router) { }

  ngOnInit(): void {
     this.companyService.companyName$.subscribe(name => {
      this.companyName = name;
  });
  }
  onSearch() {
  if (!this.searchQuery.trim()) return;

  this.router.navigate(['/search-results'], {
    queryParams: { query: this.searchQuery.trim() }
  });

  this.searchQuery = '';
}
 

}

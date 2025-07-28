import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

     
companyName: string = 'Codemind Technologies';

  searchQuery: string = '';
  results: any[] = [];
  constructor( private router: Router) { }

  ngOnInit(): void {
  }
  onSearch() {
  if (!this.searchQuery.trim()) return;

  this.router.navigate(['/search-results'], {
    queryParams: { query: this.searchQuery.trim() }
  });

  this.searchQuery = '';
}
 

}

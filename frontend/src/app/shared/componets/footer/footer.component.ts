import { Component, OnInit } from '@angular/core';
import { CompanyNameService } from 'src/app/core/services/compny-name.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  currentYear = new Date().getFullYear();
  companyName = 'Your Company';
  constructor(private companyService : CompanyNameService) { }

  ngOnInit(): void {
      this.companyService.companyName$.subscribe(name => {
      this.companyName = name;
  });
  }

}

import { Injectable } from '@angular/core';
import {   Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompanyNameService {
  private companyNameSubject = new Subject<string>();  
  companyName$ = this.companyNameSubject.asObservable();  

  setCompanyName(name: string) {
    this.companyNameSubject.next(name);  
  }
}

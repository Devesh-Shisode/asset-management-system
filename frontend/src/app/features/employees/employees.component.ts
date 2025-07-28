import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AssetService } from 'src/app/core/services/asset.service';
import { Employee } from 'src/app/shared/models/employee';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
 
export class EmployeesComponent implements OnInit {

  employees: Employee[] = [];
  newEmployee: Employee = {
    employeeId: 0,
    name: '',
    email: '',
    department: '',
    
  };

  constructor(private assetService: AssetService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.assetService.getEmployees().subscribe((data : any) => {
      console.log(data);
      
      this.employees = data
    });
  }

  onSubmit(form: NgForm): void {
    if (form.valid) {
      this.assetService.addEmployee(this.newEmployee).subscribe(() => {
        this.loadEmployees();
        form.resetForm();
      });
    }
  }

  deleteEmployee(id: number): void {
    this.assetService.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }
}




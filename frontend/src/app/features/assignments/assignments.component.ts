import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AssetService } from 'src/app/core/services/asset.service';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {


  assignments: any[] = [];
  newAssignment = {
    assetId: 0,
    employeeId: 0,
    assignedDate: new Date().toISOString()
  };

  constructor(private assignmentService: AssetService) { }

  ngOnInit(): void {
     this.getAllAssignments();
  }
     getAllAssignments(): void {
    this.assignmentService.getAssignments().subscribe((data : any) => {
      console.log(data);
      
      this.assignments = data
    });
  }

  onAssign(form: NgForm): void {
    if (form.valid) {
      this.assignmentService.assignAsset(this.newAssignment).subscribe(() => {
        this.getAllAssignments(); // refresh list
        form.resetForm();
      });
    }
  }

  onReturn(id: number): void {
    this.assignmentService.returnAsset(id).subscribe(() => {
      this.getAllAssignments(); // refresh list
    });
  }

  deleteAssignment(id: number): void {
    this.assignmentService.deleteAssignment(id).subscribe(() => {
      this.getAllAssignments(); // refresh list
    });
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

   isSidebarCollapsed = false;

  @Output() sidebarToggled = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }
      toggleSidebar() {
    this.isSidebarCollapsed = !this.isSidebarCollapsed;
    this.sidebarToggled.emit(this.isSidebarCollapsed); // emit value to parent
  }
}

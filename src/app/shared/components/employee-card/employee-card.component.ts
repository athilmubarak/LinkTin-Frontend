import { Component, Input, OnInit } from '@angular/core';
import { HomeEmployee } from 'app/models/home-employee.types';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.scss']
})
export class EmployeeCardComponent implements OnInit {
  //Variables
  @Input() employees: HomeEmployee[];

  constructor() { }

  ngOnInit(): void {
  }

}

import { Component, OnInit, ViewChild } from '@angular/core';
import { VacancyService } from '../../services/vacancy.service';
import { MatTableDataSource } from '@angular/material/table';
import { Vacancy } from 'app/models/vacancy.types';
import { CommonResponse } from 'app/models/common-response.types';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {
  //Variables

  //Mat-table realted variables
  data_source = new MatTableDataSource<Vacancy>();
  displayed_columns: string[] = ['sl', 'name', 'placement_type', 'vaccancy_count', 'application_starts_from', 'admin'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private vacancy_service: VacancyService
  ) { }

  ngOnInit(): void {
    this.getVacancies();
  }

  /**
   * to get all vacancies
   */
  getVacancies() {
    this.data_source = new MatTableDataSource();

    this.vacancy_service.getAllVacancies().subscribe({
      next: (res: CommonResponse<Vacancy[]>) => {
        console.log(res);

        this.data_source = new MatTableDataSource(res.data);
        this.data_source.sort = this.sort;
      },
      error: () => {
        let data: Vacancy[] = [
          {
            vacancy_id: 1,
            job_id: "",
            name: "test",
            description: "",
            location: "",
            application_starts_from: "",
            due_date: "",
            vaccancy_count: 3,
            employment_type_id: 1,
            placement_type: "test"
          },
          {
            vacancy_id: 1,
            job_id: "",
            name: "test",
            description: "",
            location: "",
            application_starts_from: "",
            due_date: "",
            vaccancy_count: 2,
            employment_type_id: 1,
            placement_type: "test"
          }
        ];

        this.data_source = new MatTableDataSource(data);
        this.data_source.sort = this.sort;
      }
    });
  }

}

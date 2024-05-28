/* eslint-disable prefer-const */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit, ViewChild } from '@angular/core';
import { VacancyService } from '../../services/vacancy.service';
import { MatTableDataSource } from '@angular/material/table';
import { Vacancy } from 'app/models/vacancy.types';
import { CommonResponse } from 'app/models/common-response.types';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { UpdateVacancyComponent } from '../update-vacancy/update-vacancy.component';
import { FuseConfirmationService } from '@fuse/services/confirmation';
import { FuseAlertType } from '@fuse/components/alert';
import { VacancyViewComponent } from 'app/shared/components/vacancy-view/vacancy-view.component';

@Component({
  selector: 'app-vacancies',
  templateUrl: './vacancies.component.html',
  styleUrls: ['./vacancies.component.scss']
})
export class VacanciesComponent implements OnInit {
  //Variables
  show_alert: boolean = false;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };

  //Mat-table realted variables
  data_source = new MatTableDataSource<Vacancy>();
  displayed_columns: string[] = ['sl', 'name', 'placement_type', 'vaccancy_count', 'application_starts_from', 'admin'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private vacancy_service: VacancyService,
    private mat_dialog: MatDialog,
    private confirmation_dialog: FuseConfirmationService
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
        const data: Vacancy[] = [
          {
            vacancy_id: 1,
            job_id: '',
            name: "test",
            description: "",
            location: "",
            application_starts_from: "",
            due_date: "",
            vacancy_count: 3,
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
            vacancy_count: 2,
            employment_type_id: 1,
            placement_type: "test"
          }
        ];

        this.data_source = new MatTableDataSource(data);
        this.data_source.sort = this.sort;
      }
    });
  }

  /**
   * while click on vaccancy to add or edit
   * 
   * @param vacancy 
   */
  clickOnVacancy(vacancy?: Vacancy) {
    let dialog_ref = this.mat_dialog.open(UpdateVacancyComponent, {
      data: vacancy,
      minWidth: '100vw',
      minHeight: '100vh',
      disableClose: false
    });

    dialog_ref.afterClosed().subscribe({
      next: (res: CommonResponse<Vacancy>) => {
        if (res.success) {
          let data = this.data_source.data;

          if (vacancy) {
            //Edit
            data = data.map(x => {
              if (x.vacancy_id === res.data.vacancy_id) {
                return res.data;
              } else {
                return x;
              }
            });
          } else {
            //Add
            data.unshift(res.data);
          }

          this.data_source = new MatTableDataSource(data);
          this.data_source.sort = this.sort;
        }
      }
    });
  }

  /**
   * to delete vacancy
   * 
   * @param vacancy 
   * @param index 
   */
  deleteVacancy(vacancy: Vacancy, index: number) {
    let dialog_ref = this.confirmation_dialog.open(
      {
        title: 'Remove Vacancy',
        message: `Are you sure you want to delete this vacancy? This action cannot be undone. Click 'Confirm' to proceed with the deletion, or 'Cancel' to return to the vacancy details.`,
        icon: {
          show: false,
        },
        actions: {
          confirm: {
            show: true,
            label: "Confirm",
            color: "primary"
          },
          cancel: {
            show: true,
            label: "Cancel"
          }
        },
        dismissible: false
      }
    );

    dialog_ref.afterClosed().subscribe({
      next: (res: string) => {
        if (res === 'confirmed') {
          this.vacancy_service.deleteVacancy(vacancy.vacancy_id).subscribe({
            next: (res: CommonResponse<number>) => {
              console.log(res);
              this.alert = {
                type: res.success ? 'success' : 'error',
                message: res.message
              };
              this.show_alert = true;

              if (res.success) {
                let data = this.data_source.data;
                if (index >= 0) {
                  data.splice(index, 1);
                }

                this.data_source = new MatTableDataSource(data);
                this.data_source.sort = this.sort;
              }
            },
          })
        }
      }
    });
  }

  /**
   * to view vacancy's full details
   * 
   * @param vacancy 
   */
  viewVacancy(vacancy: Vacancy) {
    this.mat_dialog.open(VacancyViewComponent, {
      data: { vacancy_id: vacancy.vacancy_id },
      disableClose: false,
      width: '640px'
    });
  }
}

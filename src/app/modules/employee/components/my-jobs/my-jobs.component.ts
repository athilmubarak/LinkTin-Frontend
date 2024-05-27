import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MyJobsService } from '../../services/my-jobs.service';
import { Vacancy } from 'app/models/vacancy.types';
import { MatSort } from '@angular/material/sort';
import { CommonResponse } from 'app/models/common-response.types';
import { myJobs } from 'app/models/my-jobs.type';
import { FuseAlertType } from '@fuse/components/alert';
import { Subject, takeUntil } from 'rxjs';
import { User } from 'app/models/user.types';
import { FuseConfirmationService } from '@fuse/services/confirmation';
@Component({
  selector: 'app-my-jobs',
  templateUrl: './my-jobs.component.html',
  styleUrls: ['./my-jobs.component.scss']
})
export class MyJobsComponent implements OnInit {

  //Variables
  show_alert: boolean = false;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };

  jobTypes = [
    { id: 0, value: "All" },
    { id: 1, value: "Applied Jobs" },
    { id: 2, value: "Approached by company" }
  ];
  current_user_id = 1;
  filtered_data_source = new MatTableDataSource<myJobs>();
  selectedFilterValue: number = 0;
  user: User;
  //Mat-table realted variables
  data_source = new MatTableDataSource<myJobs>();
  displayed_columns: string[] = ['sl', 'name', 'placement_type', 'vaccancy_count', 'application_starts_from', 'admin'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  private _userService: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private myJobs_service: MyJobsService,
    private _changeDetectorRef: ChangeDetectorRef,
    private confirmation_dialog: FuseConfirmationService
  ) { }

  ngOnInit(): void {
    this.getVacancies();
    this.filtered_data_source = this.data_source;

    this._userService.user$
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((user: User) => {
        this.user = user;

        // Mark for check
        this._changeDetectorRef.markForCheck();
      });
    
  }
 
  /**
  * to get filtered job types
  */
  filterDataByType(e) {

    console.log("filterEvent", e);
    const filterValue = e.value;
    this.selectedFilterValue = filterValue;
    if (filterValue === 0) {
      // If "All" selected, display all data
      this.filtered_data_source = this.data_source;
      console.log("filterDataType", this.data_source);

    } else {
      // this.filtered_data_source = this.data_source.filter(row => {
      //   // Assuming 'placement_type' is the column name for 'Applied / Requested on'
      //   return row.placement_type === filterValue;
      // });


    }
  }
  /**
  * to get all my jobs
  */
  getVacancies() {
    this.data_source = new MatTableDataSource();

    this.myJobs_service.getAllJobVacancies().subscribe({
      next: (res: CommonResponse<myJobs[]>) => {
        console.log(res);

        this.data_source = new MatTableDataSource(res.data);
        this.data_source.sort = this.sort;
      },
      error: () => {
        var data: myJobs[] = [
          {
            sync_registry_id: 1,
            vacancy_id: 1,
            job_id: "1",
            job_name: "Frontend Developer",
            applied_user_id: 1,
            applied_user: "",
            approved_user_id: 1,
            approved_user: "ABC",
            applied_date: "",
            approved_date: "",
            status: 2,
            status_description: "Open",
            resume_attachement_id: 1,
            attachment_url: ""
          },
          {
            sync_registry_id: 1,
            vacancy_id: 1,
            job_id: "1",
            job_name: "Backend Developer",
            applied_user_id: 0,
            applied_user: "test",
            approved_user_id: 1,
            approved_user: "Lyca Group",
            applied_date: "",
            approved_date: "",
            status: 0,
            status_description: "Open",
            resume_attachement_id: 1,
            attachment_url: "https://www.lycamobile.co.uk/en/"
          }
        ];

        this.data_source = new MatTableDataSource(data);
        this.data_source.sort = this.sort;
      }
    });
  }
  redirectUrl(row: any){
    window.open(row.attachment_url, '_blank');
  }
  
    /**
   * to delete jobs
   * 
   * @param jobs 
   * @param index 
   */
    deleteJob(jobs: myJobs, index: number) {
    let dialog_ref = this.confirmation_dialog.open(
      {
        title: 'Remove Jobs',
        message: `Are you sure you want to delete this job? This action cannot be undone. Click 'Confirm' to proceed with the deletion, or 'Cancel' to return to the job details.`,
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
          this.myJobs_service.deleteJob(jobs.sync_registry_id).subscribe({
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



}



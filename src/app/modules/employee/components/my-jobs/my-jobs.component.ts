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

}



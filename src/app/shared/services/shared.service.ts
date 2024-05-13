import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from 'app/models/common-response.types';
import { Gender } from 'app/models/gender.types';
import { Job } from 'app/models/job.types';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  //Variables
  root_url: string = environment.api_url;
  public genders: Gender[] = [];
  public jobs: Job[] = [];

  constructor(private http: HttpClient) { }

  /**
   * to get all genders
   * 
   * @returns 
   */
  getGenders() {
    if (this.genders.length > 0) {
      return;
    }
    this.http.get<CommonResponse<Gender[]>>(`${this.root_url}/genders/get`).subscribe({
      next: (res: CommonResponse<Gender[]>) => {
        this.genders = res.data;
      },
      error: () => {
        this.genders = [
          {
            gender_id: 1,
            description: 'Male'
          },
          {
            gender_id: 2,
            description: 'Female'
          }
        ];
      }
    });
  }

  /**
   * to get all jobs
   * 
   * @returns 
   */
  getJobs() {
    if (this.jobs.length > 0) {
      return
    }
    this.http.get<CommonResponse<Job[]>>(`${this.root_url}/jobs/get`).subscribe({
      next: (res: CommonResponse<Job[]>) => {
        this.jobs = res.data;
      },
      error: () => {
        this.jobs = [
          {
            "name": "Senior Brand Coordinator",
            "job_id": 46
          },
          {
            "name": "Central Solutions Director",
            "job_id": 7
          },
          {
            "name": "Legacy Intranet Developer",
            "job_id": 56
          },
          {
            "name": "District Data Supervisor",
            "job_id": 47
          },
          {
            "name": "Principal Directives Agent",
            "job_id": 90
          },
          {
            "name": "Product Tactics Developer",
            "job_id": 4
          },
          {
            "name": "District Creative Analyst",
            "job_id": 54
          },
          {
            "name": "Senior Solutions Director",
            "job_id": 98
          },
          {
            "name": "Product Program Supervisor",
            "job_id": 87
          },
          {
            "name": "Corporate Factors Manager",
            "job_id": 86
          }
        ]
      }
    });
  }
}

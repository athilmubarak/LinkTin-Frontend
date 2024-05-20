import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from 'app/models/common-response.types';
import { myJobs } from 'app/models/my-jobs.type';
import { Skill } from 'app/models/skill.types';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MyJobsService {
  
  readonly root_url: string = environment.api_url;

  constructor(private http: HttpClient) { }

   /**
   * to get all job-vacancies
   * 
   * @returns 
   */
   getAllJobVacancies() {
    return this.http.get<CommonResponse<myJobs[]>>(`${this.root_url}/job-vacancy/sync/get`);
  }
}

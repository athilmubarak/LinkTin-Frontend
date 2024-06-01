/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from 'app/models/common-response.types';
import { Gender } from 'app/models/gender.types';
import { Job } from 'app/models/job.types';
import { Skill } from 'app/models/skill.types';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  //Variables
  root_url: string = environment.api_url;
  public genders: Gender[] = [];
  public jobs: Job[] = [];
  public skills: Skill[] = [];

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
    this.http.get<CommonResponse<Gender[]>>(`${this.root_url}/user/genders/get`).subscribe({
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
      return;
    }
    this.http.get<CommonResponse<Job[]>>(`${this.root_url}/jobs/get`).subscribe({
      next: (res: CommonResponse<Job[]>) => {
        this.jobs = res.data;
      },
      error: () => {
        this.jobs = [
          {
            'name': 'Senior Brand Coordinator',
            'job_id': 46
          },
          {
            'name': 'Central Solutions Director',
            'job_id': 7
          },
          {
            'name': 'Legacy Intranet Developer',
            'job_id': 56
          },
          {
            'name': 'District Data Supervisor',
            'job_id': 47
          },
          {
            'name': 'Principal Directives Agent',
            'job_id': 90
          },
          {
            'name': 'Product Tactics Developer',
            'job_id': 4
          },
          {
            'name': 'District Creative Analyst',
            'job_id': 54
          },
          {
            'name': 'Senior Solutions Director',
            'job_id': 98
          },
          {
            'name': 'Product Program Supervisor',
            'job_id': 87
          },
          {
            'name': 'Corporate Factors Manager',
            'job_id': 86
          }
        ];
      }
    });
  }

  /**
   * to create new job
   * 
   * @param request 
   * @returns 
   */
  createNewJob(request: { name: string }) {
    return this.http.post<CommonResponse<Job>>(`${this.root_url}/jobs/insert`, request);
  }

  /**
   * to get all skills
   * 
   * @returns 
   */
  getSkills() {
    if (this.skills.length > 0) {
      return;
    }

    this.http.get<CommonResponse<Skill[]>>(`${this.root_url}/skills/get`).subscribe({
      next: (res: CommonResponse<Skill[]>) => {
        this.skills = res.data;
      },
      error: () => {
        this.skills = [
          { skill_id: 1, skill: 'Java' },
          { skill_id: 2, skill: 'Python' },
          { skill_id: 3, skill: 'JavaScript' },
          { skill_id: 4, skill: 'SQL' },
          { skill_id: 5, skill: 'HTML' },
          { skill_id: 6, skill: 'CSS' },
          { skill_id: 7, skill: 'React.js' },
          { skill_id: 8, skill: 'Angular' },
          { skill_id: 9, skill: 'Node.js' },
          { skill_id: 10, skill: 'PHP' },
          { skill_id: 11, skill: 'C#' },
          { skill_id: 12, skill: 'C++' },
          { skill_id: 13, skill: 'Ruby' },
          { skill_id: 14, skill: 'Swift' },
          { skill_id: 15, skill: 'Objective-C' },
          { skill_id: 16, skill: 'Android Development' },
          { skill_id: 17, skill: 'iOS Development' },
          { skill_id: 18, skill: 'Machine Learning' },
        ];
      }
    });
  }

  /**
   * to create new skill
   * 
   * @param request 
   * @returns 
   */
  createNewSkill(request: { skill: string }) {
    return this.http.post<CommonResponse<Skill>>(`${this.root_url}/skills/insert`, request);
  }
}

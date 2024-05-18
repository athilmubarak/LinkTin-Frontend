/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonResponse } from 'app/models/common-response.types';
import { VacancyDetails } from 'app/models/vacancy-details.types';
import { VacancyService } from 'app/modules/employer/services/vacancy.service';

@Component({
  selector: 'app-vacancy-view',
  templateUrl: './vacancy-view.component.html',
  styleUrls: ['./vacancy-view.component.scss']
})
export class VacancyViewComponent implements OnInit {

  //Variables
  vacancy_details: VacancyDetails;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      vacancy_id: number;
    },
    private vacancy_service: VacancyService
  ) {
    this.vacancy_details = {
      vacancy_id: null,
      job_id: null,
      name: 'Angular Developer',
      description: 'Description',
      location: 'Kochi',
      salary_range: '$120-$150/Month',
      experience: '2-5 Years',
      expected_notice_period: 30,
      application_starts_from: '05-05-2024',
      due_date: null,
      vacancy_count: 4,
      responsibilities: '<h1>Name</h1>',
      additional_qualifications: '<h1>Name</h1>',
      role_expectations: '<h1>Name</h1>',
      employment_type_id: null,
      placement_type: 'Full-time',
      required_skills: [
        {
          skill_id: 1,
          skill: 'Angular',
        },
        {
          skill_id: 2,
          skill: 'React',
        },
        {
          skill_id: 3,
          skill: 'Vue',
        },
        {
          skill_id: 4,
          skill: 'Node',
        }
      ]
    };
  }

  ngOnInit(): void {
    if (this.data && this.data.vacancy_id && this.data.vacancy_id > 0) {
      this.vacancy_service.getVacancyDetailsById(this.data.vacancy_id).subscribe({
        next: (res: CommonResponse<VacancyDetails>) => {
          console.log(res);

          this.vacancy_details = res.data;
        }
      });
    }
  }

}

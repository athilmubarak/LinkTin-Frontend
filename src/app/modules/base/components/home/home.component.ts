/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { HomeEmployee } from 'app/models/home-employee.types';
import { HomeVacancy } from 'app/models/home-vacancy.types';
import { HomeService } from '../../services/home.service';
import { CommonResponse } from 'app/models/common-response.types';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    //Variables
    home_data: HomeVacancy[] | HomeEmployee[];
    user_type: number;

    constructor(private home_service: HomeService) {}

    ngOnInit(): void {
        this.user_type = 2;
        this.home_data = [];
        if (this.user_type === 1) {
            //Employee
            this.home_service.getVacanciesForHome().subscribe({
                next: (res: CommonResponse<HomeVacancy[]>) => {
                    console.log(res);

                    this.home_data = res.data;
                },
                error: (err) => {
                    console.log(err);
                    this.home_data = [
                        {
                            vacancy_id: 1,
                            job_id: 1,
                            job_name: 'Software Engineer',
                            employment_type_id: 1,
                            placement_type: '',
                            location: '',
                            salary_range: '',
                            employer_info_id: 1,
                            company_name: '',
                            company_location: '',
                            company_logo: '',
                        },
                        {
                            vacancy_id: 1,
                            job_id: 1,
                            job_name: 'Software Engineer',
                            employment_type_id: 1,
                            placement_type: '',
                            location: '',
                            salary_range: '',
                            employer_info_id: 1,
                            company_name: '',
                            company_location: '',
                            company_logo: '',
                        },
                        {
                            vacancy_id: 1,
                            job_id: 1,
                            job_name: 'Software Engineer',
                            employment_type_id: 1,
                            placement_type: '',
                            location: '',
                            salary_range: '',
                            employer_info_id: 1,
                            company_name: '',
                            company_location: '',
                            company_logo: '',
                        },
                        {
                            vacancy_id: 1,
                            job_id: 1,
                            job_name: 'Software Engineer',
                            employment_type_id: 1,
                            placement_type: '',
                            location: '',
                            salary_range: '',
                            employer_info_id: 1,
                            company_name: '',
                            company_location: '',
                            company_logo: '',
                        },
                    ];
                },
            });
        } else {
            //Employer
            this.home_service.getEmployeeForHome().subscribe({
                next: (res: CommonResponse<HomeEmployee[]>) => {
                    console.log(res);

                    this.home_data = res.data;
                },
                error: (err) => {
                    console.log(err);

                    this.home_data = [
                        {
                            vacancy_id: 1,
                            personal_info_id: 1,
                            name: 'Jacob John',
                            email: '',
                            phone_number: '',
                            profile_url: '',
                            cover_url: '',
                            job_id: 1,
                            job_name: 'Software Engineer',
                            resume_attachment_id: 1,
                            country_id: 1,
                            country_name: 'United Kingdom',
                        },
                        {
                            vacancy_id: 1,
                            personal_info_id: 1,
                            name: 'Jacob John',
                            email: '',
                            phone_number: '',
                            profile_url: '',
                            cover_url: '',
                            job_id: 1,
                            job_name: 'Software Engineer',
                            resume_attachment_id: 1,
                            country_id: 1,
                            country_name: 'United Kingdom',
                        },
                        {
                            vacancy_id: 1,
                            personal_info_id: 1,
                            name: 'Jacob John',
                            email: '',
                            phone_number: '',
                            profile_url: '',
                            cover_url: '',
                            job_id: 1,
                            job_name: 'Software Engineer',
                            resume_attachment_id: 1,
                            country_id: 1,
                            country_name: 'United Kingdom',
                        },
                        {
                            vacancy_id: 1,
                            personal_info_id: 1,
                            name: 'Jacob John',
                            email: '',
                            phone_number: '',
                            profile_url: '',
                            cover_url: '',
                            job_id: 1,
                            job_name: 'Software Engineer',
                            resume_attachment_id: 1,
                            country_id: 1,
                            country_name: 'United Kingdom',
                        },
                    ];
                },
            });
        }
    }
}

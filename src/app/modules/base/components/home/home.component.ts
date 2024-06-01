/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, OnInit } from '@angular/core';
import { HomeEmployee } from 'app/models/home-employee.types';
import { HomeVacancy } from 'app/models/home-vacancy.types';
import { HomeService } from '../../services/home.service';
import { CommonResponse } from 'app/models/common-response.types';
import { AuthService } from 'app/core/auth/auth.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
    //Variables
    home_data: HomeVacancy[] | HomeEmployee[];
    user_type: number;

    constructor(
        private home_service: HomeService,
        private auth_service: AuthService
    ) {}

    ngOnInit(): void {
        this.user_type = this.auth_service.userType;
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
                            placement_type: 'Full-Time',
                            location: 'Kochi',
                            salary_range: '20000/- to 35000/-',
                            employer_info_id: 1,
                            company_name: 'Company Name',
                            company_location: 'Location',
                            company_logo: '',
                        },
                        {
                            vacancy_id: 1,
                            job_id: 1,
                            job_name: 'Software Engineer',
                            employment_type_id: 1,
                            placement_type: 'Full-Time',
                            location: 'Kochi',
                            salary_range: '20000/- to 35000/-',
                            employer_info_id: 1,
                            company_name: 'Company Name',
                            company_location: 'Location',
                            company_logo: '',
                        },
                        {
                            vacancy_id: 1,
                            job_id: 1,
                            job_name: 'Software Engineer',
                            employment_type_id: 1,
                            placement_type: 'Full-Time',
                            location: 'Kochi',
                            salary_range: '20000/- to 35000/-',
                            employer_info_id: 1,
                            company_name: 'Company Name',
                            company_location: 'Location',
                            company_logo: '',
                        },
                        {
                            vacancy_id: 1,
                            job_id: 1,
                            job_name: 'Software Engineer',
                            employment_type_id: 1,
                            placement_type: 'Full-Time',
                            location: 'Kochi',
                            salary_range: '20000/- to 35000/-',
                            employer_info_id: 1,
                            company_name: 'Company Name',
                            company_location: 'Location',
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

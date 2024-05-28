/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from 'app/models/common-response.types';
import { HomeEmployee } from 'app/models/home-employee.types';
import { HomeVacancy } from 'app/models/home-vacancy.types';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class HomeService {
    readonly root_url: string = environment.api_url;

    constructor(private http: HttpClient) {}

    /**
     * to get vacancies for home incase of employee
     *
     * @returns
     */
    getVacanciesForHome(): Observable<CommonResponse<HomeVacancy[]>> {
        return this.http.get<CommonResponse<HomeVacancy[]>>(
            `${this.root_url}/employee/home/vacancies/get`
        );
    }

    /**
     * to get employees for home incase of employer
     *
     * @returns
     */
    getEmployeeForHome(): Observable<CommonResponse<HomeEmployee[]>> {
        return this.http.get<CommonResponse<HomeEmployee[]>>(
            `${this.root_url}/employer/home/employees/get`
        );
    }
}

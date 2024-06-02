/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from 'app/models/common-response.types';
import { Country } from 'app/models/country.types';
import { EducationType } from 'app/models/education-type.types';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {
    //Variables
    readonly root_url: string = environment.api_url;

    constructor(private http: HttpClient) {}

    /**
     * to get all countries
     *
     * @returns
     */
    getAllCountries(): Observable<CommonResponse<Country[]>> {
        return this.http.get<CommonResponse<Country[]>>(
            `${this.root_url}/user/countries/get`
        );
    }

    /**
     * to get all education types
     * 
     * @returns 
     */
    getEducationTypes(): Observable<CommonResponse<EducationType[]>> {
        return this.http.get<CommonResponse<EducationType[]>>(
            `${this.root_url}/education-types/get`
        );
    }
}

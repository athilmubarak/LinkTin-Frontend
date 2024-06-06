/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from 'app/models/common-response.types';
import { Country } from 'app/models/country.types';
import { EducationType } from 'app/models/education-type.types';
import { Education } from 'app/models/education.types';
import { Experience } from 'app/models/experience.types';
import { UpdateEmployee } from 'app/models/update-employee.types';
import { User } from 'app/models/user.types';
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
            `${this.root_url}/education/education-types/get`
        );
    }

    /**
     * to remove experience
     *
     * @param id
     * @returns
     */
    removeExperience(id: number): Observable<CommonResponse<number>> {
        return this.http.delete<CommonResponse<number>>(
            `${this.root_url}/user/experience/delete/${id}`
        );
    }

    /**
     * to remove education
     *
     * @param id
     * @returns
     */
    removeEducation(id: number): Observable<CommonResponse<number>> {
        return this.http.delete<CommonResponse<number>>(
            `${this.root_url}/user/education/delete/${id}`
        );
    }

    /**
     * to remove employee skill
     *
     * @param employee_skill_id
     * @returns
     */
    removeSkill(employee_skill_id: number): Observable<CommonResponse<number>> {
        return this.http.delete<CommonResponse<number>>(
            `${this.root_url}/user/skill/delete/${employee_skill_id}`
        );
    }

    /**
     * to remove certification
     *
     * @param certification_id
     * @returns
     */
    removeCertification(
        certification_id: number
    ): Observable<CommonResponse<number>> {
        return this.http.delete<CommonResponse<number>>(
            `${this.root_url}/user/certification/delete/${certification_id}`
        );
    }

    /**
     * to remove license
     *
     * @param license_id
     * @returns
     */
    removeLicense(license_id: number): Observable<CommonResponse<number>> {
        return this.http.delete<CommonResponse<number>>(
            `${this.root_url}/user/license/delete/${license_id}`
        );
    }

    /**
     * to remove reference
     *
     * @param reference_id
     * @returns
     */
    removeReference(reference_id: number): Observable<CommonResponse<number>> {
        return this.http.delete<CommonResponse<number>>(
            `${this.root_url}/user/reference/delete/${reference_id}`
        );
    }

    /**
     * to update employee details
     *
     * @param request
     * @param user_id
     * @returns
     */
    updateEmployeeDetails(
        request: UpdateEmployee,
        user_id: number
    ): Observable<CommonResponse<User>> {
        return this.http.put<CommonResponse<User>>(
            `${this.root_url}/user/employee/update/${user_id}`,
            request
        );
    }

    /**
     * to create experience
     *
     * @param experience
     * @returns
     */
    createExperience(
        experience: Experience
    ): Observable<CommonResponse<Experience>> {
        return this.http.post<CommonResponse<Experience>>(
            `${this.root_url}/user/experience/insert`,
            experience
        );
    }

    /**
     * to update experience
     *
     * @param experience
     * @returns
     */
    updateExperience(
        experience: Experience,
        id: number
    ): Observable<CommonResponse<Experience>> {
        return this.http.put<CommonResponse<Experience>>(
            `${this.root_url}/user/experience/update/${id}`,
            experience
        );
    }

    /**
     * to add new employee education
     *
     * @param education
     * @returns
     */
    createEducation(
        education: Education
    ): Observable<CommonResponse<Education>> {
        return this.http.post<CommonResponse<Education>>(
            `${this.root_url}/user/education/insert`,
            education
        );
    }

    /**
     * to update employee education
     *
     * @param education
     * @param id
     * @returns
     */
    updateEducation(
        education: Education,
        id: number
    ): Observable<CommonResponse<Education>> {
        return this.http.put<CommonResponse<Education>>(
            `${this.root_url}/user/education/update/${id}`,
            education
        );
    }
}

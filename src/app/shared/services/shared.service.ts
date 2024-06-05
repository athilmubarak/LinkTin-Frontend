/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountType } from 'app/models/account-type.types';
import { CommonResponse } from 'app/models/common-response.types';
import { Country } from 'app/models/country.types';
import { Gender } from 'app/models/gender.types';
import { Job } from 'app/models/job.types';
import { Skill } from 'app/models/skill.types';
import { UpdateUser } from 'app/models/update-user.types';
import { User } from 'app/models/user.types';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class SharedService {
    //Variables
    root_url: string = environment.api_url;
    public genders: Gender[] = [];
    public jobs: Job[] = [];
    public skills: Skill[] = [];
    public account_types: AccountType[] = [];
    public countries: Country[] = [];

    constructor(private http: HttpClient) {}

    /**
     * to get all genders
     *
     * @returns
     */
    getGenders() {
        if (this.genders.length > 0) {
            return;
        }
        this.http
            .get<CommonResponse<Gender[]>>(`${this.root_url}/user/genders/get`)
            .subscribe({
                next: (res: CommonResponse<Gender[]>) => {
                    this.genders = res.data;
                },
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
        this.http
            .get<CommonResponse<Job[]>>(`${this.root_url}/jobs/get`)
            .subscribe({
                next: (res: CommonResponse<Job[]>) => {
                    this.jobs = res.data;
                },
            });
    }

    /**
     * to create new job
     *
     * @param request
     * @returns
     */
    createNewJob(request: { name: string }) {
        return this.http.post<CommonResponse<Job>>(
            `${this.root_url}/jobs/insert`,
            request
        );
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

        this.http
            .get<CommonResponse<Skill[]>>(`${this.root_url}/skill/get`)
            .subscribe({
                next: (res: CommonResponse<Skill[]>) => {
                    this.skills = res.data;
                },
            });
    }

    /**
     * to create new skill
     *
     * @param request
     * @returns
     */
    createNewSkill(request: { skill: string }) {
        return this.http.post<CommonResponse<Skill>>(
            `${this.root_url}/skills/insert`,
            request
        );
    }

    /**
     * to get all account types
     *
     * @returns
     */
    getAccountTypes() {
        if (this.account_types.length > 0) {
            return;
        }

        this.http
            .get<CommonResponse<AccountType[]>>(
                `${this.root_url}/account/account-types/get`
            )
            .subscribe({
                next: (res: CommonResponse<AccountType[]>) => {
                    this.account_types = res.data;
                },
            });
    }

    /**
     * to update user details
     *
     * @param user
     * @returns
     */
    updateUserDetails(user: UpdateUser): Observable<CommonResponse<User>> {
        return this.http.post<CommonResponse<User>>(
            `${this.root_url}/user/information/update`,
            user
        );
    }

    /**
     * to delete attachment
     *
     * @param attachment_id
     * @returns
     */
    removeAttachment(
        attachment_id: number
    ): Observable<CommonResponse<number>> {
        return this.http.delete<CommonResponse<number>>(
            `${this.root_url}/user/attachment/delete/${attachment_id}`
        );
    }

    /**
     * to remove other account
     *
     * @param other_account_id
     * @returns
     */
    removeOtherAccount(
        other_account_id: number
    ): Observable<CommonResponse<number>> {
        return this.http.delete<CommonResponse<number>>(
            `${this.root_url}/user/other-account/delete/${other_account_id}`
        );
    }

    /**
     * to get countries
     * 
     * @returns 
     */
    getCountries() {
        if (this.countries.length > 0) {
            return;
        }

        this.http
            .get<CommonResponse<Country[]>>(
                `${this.root_url}/user/countries/get`
            )
            .subscribe({
                next: (res: CommonResponse<Country[]>) => {
                    console.log(res);

                    this.countries = res.data;
                },
            });
    }
}

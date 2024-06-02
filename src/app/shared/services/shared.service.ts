/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountType } from 'app/models/account-type.types';
import { CommonResponse } from 'app/models/common-response.types';
import { Gender } from 'app/models/gender.types';
import { Job } from 'app/models/job.types';
import { Skill } from 'app/models/skill.types';
import { environment } from 'environments/environment';

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
            .get<CommonResponse<Skill[]>>(`${this.root_url}/skills/get`)
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
                `${this.root_url}/account-types/get`
            )
            .subscribe({
                next: (res: CommonResponse<AccountType[]>) => {
                    this.account_types = res.data;
                },
            });
    }
}

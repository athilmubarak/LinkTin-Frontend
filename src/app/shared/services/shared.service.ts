/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccountType } from 'app/models/account-type.types';
import { Attachment } from 'app/models/attachment.types';
import { CommonResponse } from 'app/models/common-response.types';
import { Country } from 'app/models/country.types';
import { Gender } from 'app/models/gender.types';
import { HomeEmployee } from 'app/models/home-employee.types';
import { HomeVacancy } from 'app/models/home-vacancy.types';
import { Job } from 'app/models/job.types';
import { OtherAccount } from 'app/models/other-account.types';
import { Skill } from 'app/models/skill.types';
import { SyncRegister } from 'app/models/sync-register.types';
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

    /**
     * add new other account
     *
     * @param account
     * @returns
     */
    addNewOtherAccount(
        account: OtherAccount
    ): Observable<CommonResponse<OtherAccount>> {
        return this.http.post<CommonResponse<OtherAccount>>(
            `${this.root_url}/user/other-account/insert`,
            account
        );
    }

    /**
     * update other account
     *
     * @param account
     * @returns
     */
    updateOtherAccount(
        account: OtherAccount
    ): Observable<CommonResponse<OtherAccount>> {
        return this.http.put<CommonResponse<OtherAccount>>(
            `${this.root_url}/user/other-account/update`,
            account
        );
    }

    /**
     * to upload file
     *
     * @param data
     * @returns
     */
    uploadFile(data: any): Observable<CommonResponse<string>> {
        return this.http.post<CommonResponse<string>>(
            `${this.root_url}/fileupload/upload`,
            data
        );
    }

    /**
     * to add new user's attachment
     *
     * @param attachment
     * @returns
     */
    createNewAttachment(
        attachment: Attachment
    ): Observable<CommonResponse<Attachment>> {
        return this.http.post<CommonResponse<Attachment>>(
            `${this.root_url}/user/attachment/insert`,
            attachment
        );
    }

    /**
     * to register vacancy request
     *
     * @param request
     * @returns
     */
    syncVacancy(
        request: SyncRegister
    ): Observable<CommonResponse<HomeVacancy[] | HomeEmployee[]>> {
        return this.http.post<CommonResponse<HomeVacancy[] | HomeEmployee[]>>(
            `${this.root_url}/job_vacancy/sync/register`,
            request
        );
    }

    /**
     * to get employee's details by user_id
     *
     * @param user_id
     * @returns
     */
    getEmployeeDetails(user_id: number): Observable<CommonResponse<User>> {
        return this.http.get<CommonResponse<User>>(
            `${this.root_url}/employee/details/get/${user_id}`
        );
    }
}

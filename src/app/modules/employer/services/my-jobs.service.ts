/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from 'app/models/common-response.types';
import { MyJobs } from 'app/models/my-jobs.type';
import { Skill } from 'app/models/skill.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class MyJobsService {
    readonly root_url: string = environment.api_url;

    constructor(private http: HttpClient) {}

    /**
     * to get all job-vacancies
     *
     * @returns
     */
    getAllJobVacancies() {
        return this.http.get<CommonResponse<MyJobs[]>>(
            `${this.root_url}/job-vacancy/sync/get`
        );
    }
    /**
     * to delete vacancy
     *
     * @param sync_registry_id
     * @returns
     */
    deleteJob(sync_registry_id: number) {
        return this.http.get<CommonResponse<number>>(
            `${this.root_url}job-vacancy/sync/delete/${sync_registry_id}`
        );
    }

    /**
     * To update attachment
     *
     * @param sync_registery_id
     * @returns
     */
    updateAttachment(
        sync_registry_id: number,
        request: { resume_attachment_id: number }
    ) {
        return this.http.put<CommonResponse<number>>(
            `${this.root_url}job-vacancy/sync/attachment/update/${sync_registry_id}`,
            request
        );
    }
}
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from 'app/models/common-response.types';
import { UpdateEmployer } from 'app/models/update-employer.types';
import { User } from 'app/models/user.types';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class MyAccountService {
    //Variables
    readonly root_url: string = environment.api_url;

    constructor(private http: HttpClient) {}

    /**
     * to update employer details
     *
     * @param request
     * @returns
     */
    updateEmployerDetails(
        request: UpdateEmployer
    ): Observable<CommonResponse<User>> {
        return this.http.put<CommonResponse<User>>(
            `${this.root_url}/user/employer/update`,
            request
        );
    }
}

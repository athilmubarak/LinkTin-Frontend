/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { User } from 'app/core/user/user.types';
import { UserDetails } from 'app/models/user-details.types';
import { CommonResponse } from 'app/models/common-response.types';
import { environment } from 'environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    //Variables
    private _user: ReplaySubject<User> = new ReplaySubject<User>(1);
    private user_details: ReplaySubject<UserDetails> = new ReplaySubject<UserDetails>();
    readonly root_url: string = environment.api_url;

    /**
     * Constructor
     */
    constructor(private _httpClient: HttpClient) {}

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Setter & getter for user-details
     *
     * @param value
     */
    set userDetails(value: UserDetails) {
        this.user_details.next(value);
    }

    get userDetails$(): Observable<UserDetails> {
        return this.user_details.asObservable();
    }

    

    /**
     * Setter & getter for user
     *
     * @param value
     */
    set user(value: User) {
        // Store the value
        this._user.next(value);
    }

    get user$(): Observable<User> {
        return this._user.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get the current logged in user data
     */
    get(): Observable<User> {
        return this._httpClient.get<User>('api/common/user').pipe(
            tap((user) => {
                this._user.next(user);
            })
        );
    }

    /**
     * Update the user
     *
     * @param user
     */
    update(user: User): Observable<any> {
        return this._httpClient.patch<User>('api/common/user', { user }).pipe(
            map((response) => {
                this._user.next(response);
            })
        );
    }

    /**
     * to get user details
     */
    getUserDetails() {
        this._httpClient.get<CommonResponse<UserDetails>>(`${this.root_url}/user/information/get`).subscribe({
            next: (res: CommonResponse<UserDetails>) => {
                console.log(res);
                
                this.user_details.next(res.data);
            }
        });
    }
}

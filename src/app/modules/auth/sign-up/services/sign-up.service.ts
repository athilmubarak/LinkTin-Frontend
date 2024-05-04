import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from 'app/models/common-response.types';
import { SignUpRequest } from 'app/models/sign-up-request.types';
import { UserType } from 'app/models/user-type.types';
import { User } from 'app/models/user.types';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

  root_url: string = environment.api_url;

  constructor(private http: HttpClient) { }

  /**
   * to get user types
   * 
   * @returns 
   */
  getUserTypes() {
    return this.http.get<CommonResponse<UserType[]>>(`${this.root_url}/user-types/get`);
  }

  /**
   * to sign-up user
   * 
   * @param request 
   * @returns 
   */
  signUpUser(request: SignUpRequest) {
    return this.http.post<CommonResponse<User>>(`${this.root_url}/auth/sign-up`, request);
  }

  /**
   * To check whether the entered email already exist or not
   * 
   * @param request 
   * @returns 
   */
  checkForEmailExistance(request: { email: string }) {
    return this.http.post<CommonResponse<undefined>>(`${this.root_url}/user/email/is-exist`, request);
  }

  /**
   * To check whether the entered user_name already exist or not
   * 
   * @param request 
   * @returns 
   */
  checkForUserNameExistance(request: { user_name: string }) {
    return this.http.post<CommonResponse<undefined>>(`${this.root_url}/user/user-name/is-exist`, request);
  }
}

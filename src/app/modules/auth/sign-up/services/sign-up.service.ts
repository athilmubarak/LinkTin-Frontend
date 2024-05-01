import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from 'app/models/common-response.types';
import { UserType } from 'app/models/user-type.types';
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
}

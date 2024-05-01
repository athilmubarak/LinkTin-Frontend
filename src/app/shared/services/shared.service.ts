import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from 'app/models/common-response.types';
import { Gender } from 'app/models/gender.types';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  //Variables
  root_url: string = environment.api_url;
  genders: Gender[] = [];

  constructor(private http: HttpClient) { }

  /**
   * to get all genders
   * 
   * @returns 
   */
  getGenders() {
    if (this.genders.length > 0) {
      return;
    }
    this.http.get<CommonResponse<Gender[]>>(`${this.root_url}/genders/get`).subscribe({
      next: (res: CommonResponse<Gender[]>) => {
        this.genders = res.data;
      },
      error: () => {
        this.genders = [
          {
            gender_id: 1,
            description: 'Male'
          },
          {
            gender_id: 2,
            description: 'Female'
          }
        ];
      }
    });
  }
}

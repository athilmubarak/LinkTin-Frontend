import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommonResponse } from 'app/models/common-response.types';
import { PlacementType } from 'app/models/placement-type.types';
import { Skill } from 'app/models/skill.types';
import { VacancyDetails } from 'app/models/vacancy-details.types';
import { VacancyRequest } from 'app/models/vacancy-request.types';
import { Vacancy } from 'app/models/vacancy.types';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  readonly root_url: string = environment.api_url;
  public placement_types: PlacementType[] = [];

  constructor(private http: HttpClient) { }

  /**
   * to get all vacancies
   * 
   * @returns 
   */
  getAllVacancies() {
    return this.http.get<CommonResponse<Vacancy[]>>(`${this.root_url}/job-vacancy/get/all`);
  }

  /**
   * to get all details of vacancy by id 
   * 
   * @param vacancy_id 
   * @returns 
   */
  getVacancyDetailsById(vacancy_id: number) {
    return this.http.get<CommonResponse<VacancyDetails>>(`${this.root_url}/job-vacancy/get/${vacancy_id}`);
  }

  /**
   * to create new vacancy
   * 
   * @param vacancy 
   * @returns 
   */
  createVacancy(vacancy: VacancyRequest) {
    return this.http.post<CommonResponse<Vacancy>>(`${this.root_url}/job-vacancy/insert`, vacancy);
  }

  /**
   * to update vacancy
   * 
   * @param vacancy_id 
   * @param vacancy 
   * @returns 
   */
  updateVacany(vacancy_id: number, vacancy: VacancyRequest) {
    return this.http.put<CommonResponse<Vacancy>>(`${this.root_url}/job-vacancy/update/${vacancy_id}`, vacancy);
  }

  /**
   * to delete vacancy
   * 
   * @param vacancy_id 
   * @returns 
   */
  deleteVacancy(vacancy_id: number) {
    return this.http.get<CommonResponse<number>>(`${this.root_url}/job-vacancy/delete/${vacancy_id}`);
  }

  /**
   * to add new required skill
   * 
   * @param vacancy_id 
   * @param request 
   * @returns 
   */
  addNewRequiredSkill(vacancy_id: number, request: { skill_id: number }) {
    return this.http.put<CommonResponse<Skill>>(`${this.root_url}/job-vacancy/skill/insert/${vacancy_id}`, request);
  }

  /**
   * to delete required skill
   * 
   * @param required_skill_id 
   * @returns 
   */
  deleteRequiredSkill(required_skill_id: number) {
    return this.http.delete<CommonResponse<number>>(`${this.root_url}/job-vacancy/skill/delete/${required_skill_id}`);
  }

  /**
   * to get all placement types
   */
  getPlacementTypes() {
    if (this.placement_types.length > 0) {
      return;
    }
    this.http.get<CommonResponse<PlacementType[]>>(`${this.root_url}/placement-types/get`).subscribe({
      next: (res: CommonResponse<PlacementType[]>) => {
        this.placement_types = res.data;
      },
      error: () => {
        this.placement_types = [
          {
            placement_type_id: 1,
            placement_type: 'Full-time'
          },
          {
            placement_type_id: 2,
            placement_type: 'Part-time'
          }
        ];
      }
    });
  }
}

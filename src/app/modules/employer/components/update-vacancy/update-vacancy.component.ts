import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FuseAlertType } from '@fuse/components/alert';
import { Vacancy } from 'app/models/vacancy.types';
import { VacancyService } from '../../services/vacancy.service';
import { CommonResponse } from 'app/models/common-response.types';
import { VacancyDetails } from 'app/models/vacancy-details.types';
import { Skill } from 'app/models/skill.types';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-vacancy',
  templateUrl: './update-vacancy.component.html',
  styleUrls: ['./update-vacancy.component.scss']
})
export class UpdateVacancyComponent implements OnInit {

  //Variables
  show_alert: boolean = false;
  alert: { type: FuseAlertType; message: string } = {
    type: 'success',
    message: ''
  };
  required_skills: Skill[];

  //FormGroup
  vacancy_form: FormGroup;

  constructor(
    private dialog_ref: MatDialogRef<UpdateVacancyComponent>,
    private form_builder: FormBuilder,
    private vacancy_service: VacancyService,
    @Inject(MAT_DIALOG_DATA) public data?: Vacancy
  ) {
    this.vacancy_form = this.form_builder.group({
      job_id: new FormControl('', Validators.required),
      description: new FormControl(''),
      location: new FormControl('', Validators.required),
      salary_range: new FormControl(''),
      experience: new FormControl('', Validators.required),
      expected_notice_period: new FormControl(30, [Validators.required, Validators.min(1)]),
      application_starts_from: new FormControl('', Validators.required),
      due_date: new FormControl(''),
      vaccancy_count: new FormControl('', [Validators.required, Validators.min(1)]),
      responsibilities: new FormControl(''),
      additional_qualifications: new FormControl(''),
      role_expectations: new FormControl(''),
      employment_type_id: new FormControl('', Validators.required)
    });
  }

  ngOnInit(): void {
    this.required_skills = [];
    if (this.data) {
      this.vacancy_service.getVacancyDetailsById(this.data.vacancy_id).subscribe({
        next: (res: CommonResponse<VacancyDetails>) => {
          if (res.success) {
            this.vacancy_form.patchValue({
              job_id: res.data.job_id,
              description: res.data.description,
              location: res.data.location,
              salary_range: res.data.salary_range,
              experience: res.data.experience,
              expected_notice_period: res.data.expected_notice_period,
              application_starts_from: res.data.application_starts_from,
              due_date: res.data.due_date,
              vaccancy_count: res.data.vaccancy_count,
              responsibilities: res.data.responsibilities,
              additional_qualifications: res.data.additional_qualifications,
              role_expectations: res.data.role_expectations,
              employment_type_id: res.data.employment_type_id
            });
            this.required_skills = res.data.required_skills;
          }
        }
      });
    }
  }

  /**
   * to close dialog
   */
  close() {
    this.dialog_ref.close({ success: false });
  }

  /**
   * to save vacancy
   * 
   * @returns 
   */
  saveVacancy() {
    if (this.vacancy_form.invalid) {
      return;
    }

    let request: Observable<CommonResponse<Vacancy>>;

    if (this.data) {
      request = this.vacancy_service.updateVacany(this.data.vacancy_id, this.vacancy_form.value);
    } else {
      request = this.vacancy_service.createVacancy({ ...this.vacancy_form.value, required_skills: this.required_skills.map(x => x.skill_id) });
    }

    request.subscribe({
      next: (res: CommonResponse<Vacancy>) => {
        console.log(res);

        this.alert = {
          type: res.success ? 'success' : 'error',
          message: res.message
        };

        if (res.success) {
          this.dialog_ref.close(res);
        }
      }
    });
  }

}

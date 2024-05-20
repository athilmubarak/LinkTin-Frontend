/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
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
import { SharedService } from 'app/shared/services/shared.service';
import { Job } from 'app/models/job.types';
import { DatePipe } from '@angular/common';
import { VacancyRequest } from 'app/models/vacancy-request.types';

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
  jobs: Job[] = [];
  quillModules: any = {
    toolbar: [
      ['bold', 'italic', 'underline'],
      [{ align: [] }, { list: 'ordered' }, { list: 'bullet' }],
      ['clean']
    ]
  };
  skills: Skill[];

  //FormGroup
  vacancy_form: FormGroup;

  constructor(
    private dialog_ref: MatDialogRef<UpdateVacancyComponent>,
    private form_builder: FormBuilder,
    public vacancy_service: VacancyService,
    private shared_service: SharedService,
    private date_pipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) public data?: Vacancy
  ) {
    this.vacancy_form = this.form_builder.group({
      job: new FormControl('', Validators.required),
      description: new FormControl(''),
      location: new FormControl('', Validators.required),
      salary_range: new FormControl(''),
      experience: new FormControl('', Validators.required),
      expected_notice_period: new FormControl(30, [Validators.required, Validators.min(1)]),
      application_starts_from: new FormControl(new Date(), Validators.required),
      due_date: new FormControl(''),
      vacancy_count: new FormControl('', [Validators.required, Validators.min(1)]),
      responsibilities: new FormControl(''),
      additional_qualifications: new FormControl(''),
      role_expectations: new FormControl(''),
      employment_type_id: new FormControl('', Validators.required),
      skill: new FormControl('')
    });
    this.shared_service.getJobs();
    this.vacancy_service.getPlacementTypes();
    this.shared_service.getSkills();

    setTimeout(() => {
      this.filterJobs('');
      this.skills = [...this.shared_service.skills];
    }, 2000);
  }

  ngOnInit(): void {
    this.required_skills = [];
    if (this.data) {
      this.vacancy_service.getVacancyDetailsById(this.data.vacancy_id).subscribe({
        next: (res: CommonResponse<VacancyDetails>) => {
          if (res.success) {
            const job = this.shared_service.jobs.find(x => x.job_id === res.data.job_id);
            this.vacancy_form.patchValue({
              job: job,
              description: res.data.description,
              location: res.data.location,
              salary_range: res.data.salary_range,
              experience: res.data.experience,
              expected_notice_period: res.data.expected_notice_period,
              application_starts_from: res.data.application_starts_from,
              due_date: res.data.due_date,
              vacancy_count: res.data.vacancy_count,
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
    if (this.vacancy_form.invalid || !this.vacancy_form.value.job.hasOwnProperty('job_id')) {
      return;
    }

    let request: Observable<CommonResponse<Vacancy>>;
    const vacancy: VacancyRequest = {
      ...this.vacancy_form.value,
      application_starts_from: this.date_pipe.transform('yyyy-MM-dd', this.vacancy_form.value.application_starts_from),
      due_date: this.date_pipe.transform('yyyy-MM-dd', this.vacancy_form.value.due_date),
      job_id: this.vacancy_form.value.job?.job_id,
      required_skills: this.data ? undefined : this.required_skills.map(x => x.skill_id)
    };

    if (this.data) {
      request = this.vacancy_service.updateVacancy(
        this.data.vacancy_id,
        vacancy
      );
    } else {
      request = this.vacancy_service.createVacancy(vacancy);
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

  /**
   * to filter jobs
   *
   * @param value
   */
  filterJobs(value: string) {
    if ([undefined, null, '', ' '].includes(value)) {
      this.jobs = [...this.shared_service.jobs];
    } else {
      this.jobs = this.shared_service.jobs.filter(x => x.name.toLowerCase().includes(value.toLowerCase()));
    }
  }

  /**
   * display function for job auto-complete
   *
   * @param job
   * @returns
   */
  displayFn(job: Job): string {
    return job && job.name ? job.name : '';
  }

  /**
   * to show or hide job save button
   *
   * @returns
   */
  showDoneButtonForJob(): boolean {
    return ![null, undefined, '', ' '].includes(this.vacancy_form.get('job').value) && this.jobs.length === 0;
  }

  /**
   * to save new job
   */
  saveNewJob() {
    this.shared_service.createNewJob({ name: this.vacancy_form.get('job').value }).subscribe({
      next: (res: CommonResponse<Job>) => {
        console.log(res);

        if (res.success) {
          this.vacancy_form.get('job').setValue(res.data);
          this.jobs = [res.data];
          this.shared_service.jobs.push(res.data);
        }
      }
    });
  }

  /**
   * to filter skills
   *
   * @param value
   */
  filterSkills(value: string) {
    if ([undefined, null, '', ' '].includes(value)) {
      this.skills = [...this.shared_service.skills];
    } else {
      this.skills = this.shared_service.skills.filter(x => x.skill.toLowerCase().includes(value.toLowerCase()));
    }
  }

  /**
   * display function for skill auto-complete
   *
   * @param skill
   * @returns
   */
  displayFnSkill(skill: Skill): string {
    return skill && skill.skill ? skill.skill : '';
  }

  /**
   * to show or hide skill save button
   *
   * @returns
   */
  showDoneButtonForSkill(): boolean {
    return ![null, undefined, '', ' '].includes(this.vacancy_form.get('skill').value) && this.skills.length === 0;
  }

  /**
   * to save new skill
   */
  saveNewSkill() {
    this.shared_service.createNewSkill({ skill: this.vacancy_form.get('skill').value }).subscribe({
      next: (res: CommonResponse<Skill>) => {
        console.log(res);

        if (res.success) {
          this.vacancy_form.get('skill').setValue('');
          this.shared_service.skills.push(res.data);
        }
      }
    });
  }

  /**
   * while selecting a skill
   *
   * @param skill
   */
  skillSelected(skill: Skill) {
    const index = this.required_skills.findIndex(x => x.skill_id === skill.skill_id);

    if (index === -1) {
      if (this.data) {
        this.vacancy_service.addNewRequiredSkill(this.data.vacancy_id, { skill_id: skill.skill_id }).subscribe({
          next: (res: CommonResponse<Skill>) => {
            console.log(res);

            if (res.success) {
              this.required_skills.push(res.data);
            }
          }
        });
      } else {
        this.required_skills.push(skill);
      }
    }

    this.vacancy_form.get('skill').setValue('');
  }

  /**
   * to remove skill
   *
   * @param skill
   * @param index
   */
  removeSkill(skill: Skill, index: number) {
    if (skill.required_skill_id && skill.required_skill_id > 0) {
      this.vacancy_service.deleteRequiredSkill(skill.required_skill_id).subscribe({
        next: (res: CommonResponse<number>) => {
          console.log(res);

          this.alert = {
            type: res.success ? 'success' : 'error',
            message: res.message
          };
          if (res.success) {
            this.required_skills.splice(index, 1);
          }
        }
      });
    } else if (index >= 0) {
      this.required_skills.splice(index, 1);
    }
  }
}

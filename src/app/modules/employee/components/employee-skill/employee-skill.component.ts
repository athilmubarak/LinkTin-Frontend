/* eslint-disable no-trailing-spaces */
/* eslint-disable arrow-parens */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { Component, Inject, OnInit } from '@angular/core';
import { Skill } from 'app/models/skill.types';
import { SharedService } from 'app/shared/services/shared.service';
import { EmployeeService } from '../../services/employee.service';
import { FormControl } from '@angular/forms';
import { CommonResponse } from 'app/models/common-response.types';
import { UserService } from 'app/core/user/user.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'app/models/user.types';

@Component({
    selector: 'app-employee-skill',
    templateUrl: './employee-skill.component.html',
    styleUrls: ['./employee-skill.component.scss'],
})
export class EmployeeSkillComponent implements OnInit {
    //Variables
    skills: Skill[];
    selected_skills: Skill[];

    skill_control: FormControl;

    constructor(
        private shared_service: SharedService,
        private employee_service: EmployeeService,
        private user_service: UserService,
        private dialog_ref: MatDialogRef<EmployeeSkillComponent>,
        private snack_bar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA)
        public data: {
            user: User;
        }
    ) {
        this.shared_service.getSkills();
        this.skill_control = new FormControl('');

        setTimeout(() => this.filterSkills(''), 200);
        this.selected_skills = [];
    }

    ngOnInit(): void {}

    /**
     * to filter skills
     *
     * @param value
     */
    filterSkills(value: string) {
        const skill_ids = this.data.user.skill.map((x) => x.skill_id);
        const filtered_skills = this.shared_service.skills.filter(
            (x) => !skill_ids.includes(x.skill_id)
        );

        if ([undefined, null, '', ' '].includes(value)) {
            this.skills = [...filtered_skills];
        } else {
            this.skills = filtered_skills.filter((x) =>
                x.skill1.toLowerCase().includes(value.toLowerCase())
            );
        }
    }

    /**
     * display function for skill auto-complete
     *
     * @param skill
     * @returns
     */
    displayFnSkill(skill: Skill): string {
        return skill && skill.skill1 ? skill.skill1 : '';
    }

    /**
     * to show or hide skill save button
     *
     * @returns
     */
    showDoneButtonForSkill(): boolean {
        return (
            ![null, undefined, '', ' '].includes(this.skill_control.value) &&
            this.skills.length === 0
        );
    }

    /**
     * to save new skill
     */
    saveNewSkill() {
        this.shared_service
            .createNewSkill({ skill1: this.skill_control.value })
            .subscribe({
                next: (res: CommonResponse<Skill>) => {
                    console.log(res);

                    if (res.success) {
                        this.skill_control.setValue('');
                        this.shared_service.skills.push({
                            skill_id: res.data.skill_id,
                            skill1: res.data.skill1,
                        });
                        this.skills = [{
                            skill_id: res.data.skill_id,
                            skill1: res.data.skill1,
                        }];
                        this.skillSelected({
                            skill_id: res.data.skill_id,
                            skill1: res.data.skill1,
                        });
                    }
                },
            });
    }

    /**
     * while selecting a skill
     *
     * @param skill
     */
    skillSelected(skill: Skill) {
        const index = this.selected_skills.findIndex(
            (x) => x.skill_id === skill.skill_id
        );

        if (index === -1) {
            this.selected_skills.push(skill);
        }

        this.skill_control.setValue('');
    }

    /**
     * to remove skill
     *
     * @param skill
     */
    removeSkill(index: number) {
        if (index >= 0) {
            this.selected_skills.splice(index, 1);
        }
    }

    /**
     * to insert new employee skills
     *
     * @returns
     */
    saveEmployeeSkills() {
        if (this.selected_skills.length === 0) {
            return;
        }

        this.skill_control.disable();
        this.employee_service
            .insertEmployeeSkills(this.selected_skills.map((x) => x.skill_id))
            .subscribe({
                next: (res: CommonResponse<{ skill: Skill[] }>) => {
                    console.log(res);

                    this.snack_bar.open(res.message, 'Close', {
                        duration: 2000,
                        panelClass: res.success
                            ? 'success-message'
                            : 'error-message',
                    });

                    if (res.success) {
                        this.data.user.skill.push(
                            ...res.data.skill.filter((x) => !x.is_deleted)
                        );

                        this.user_service.user = this.data.user;
                        this.dialog_ref.close();
                    }
                },
                error: () => this.skill_control.enable(),
                complete: () => this.skill_control.enable(),
            });
    }
}

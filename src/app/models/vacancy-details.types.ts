import { Skill } from "./skill.types";

export interface VacancyDetails {
    vacancy_id: number;
    job_id: number;
    description: string;
    location: string;
    salary_range: string;
    experience: string;
    expected_notice_period: number;
    application_starts_from: string;
    due_date: string;
    vaccancy_count: number;
    responsibilities: string;
    additional_qualifications: string;
    role_expectations: string;
    employment_type_id: number;
    placement_type: string;
    required_skills: Skill[];
}
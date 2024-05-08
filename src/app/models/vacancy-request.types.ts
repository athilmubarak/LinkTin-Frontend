export interface VacancyRequest {
    job_id: number;
    description: string;
    location: string;
    salary_range: string;
    experience: string;
    expected_notice_period: number;
    application_starts_from: Date | string;
    due_date: Date | string;
    vaccancy_count: string;
    responsibilities: string;
    additional_qualifications: string;
    role_expectations: string;
    employment_type_id: number;
    required_skills?: number[];
}
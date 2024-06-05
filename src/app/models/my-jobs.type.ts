export interface MyJobs {
    sync_registry_id:number;
    vacancy_id: number;
    job_id: string;
    job_name: string;
    applied_user_id: number;
    applied_user: string; 
    approved_user_id: number;
    approved_user: string; 
    applied_date: string;
    approved_date: string;
    status: number;
    status_description:string;
    resume_attachement_id: number;
    attachment_url: string;
}
export interface UserDetils {
    user_id: number;
    user_name: string;
    last_login_date: Date | string;
    gender_id?: number;
    description?: string;
    country_id?: number;
    country_name?: string;
    coutry_code?: string;
    personal_info_id?: number;
    name?: string;
    email: string;
    phone_number: string;
    dob?: Date | string;
    profile_url?: string;
    cover_url: string;
    portfolio?: string;
    employer_info_id?: number;
    company_name: string;
    location?: string;
    logo1?: string;
    logo2?: string;
    website_url?: string;
    number_of_employees?: number;
}
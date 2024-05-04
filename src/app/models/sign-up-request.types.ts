export interface SignUpRequest {
    user_type_id: number;
    name?: string;
    email: string;
    phone_number: string;
    dob?: Date | string;
    gender_id?: number;
    user_name: string;
    password: string;
    company_name?: string;
    location?: string;
}
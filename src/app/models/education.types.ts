/* eslint-disable eol-last */
/* eslint-disable @typescript-eslint/naming-convention */
export interface Education {
    id?: number;
    education_type_id: number;
    description?: string;
    institution: string;
    academic_year: string;
    display_order: number;
}
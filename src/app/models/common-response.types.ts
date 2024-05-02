export interface CommonResponse<Type> {
    success: boolean;
    message: string;
    data?: Type;
}
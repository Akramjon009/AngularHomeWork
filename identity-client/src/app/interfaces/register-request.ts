export interface RegisterRequest {
    fullname: string;
    username: string;
    age: number;
    email: string;
    password: string;
    confirmPassword: string;
    roles: string[];
}

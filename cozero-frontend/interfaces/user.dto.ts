export interface UserRegistrationDTO {
    email: string;
    password: string;
}

export interface UserLoginDTO {
    email: string;
    access_token: string;
}
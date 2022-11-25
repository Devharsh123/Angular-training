export interface User {
    email: string
    token: string
}

export interface LoginSuccessPayload{
    token: string
    email: string
}

export interface UserData {

    Name: string,
    Password: string,
    ConfirmPassword: string,
    Email: string,
    Phone: string,
    PloomesId: number,    
}

export const defaultUserData = {

    Name: '',
    Password: '',
    Email: '',
    Phone: '',
    ConfirmPassword: '',
    PloomesId: -1
}
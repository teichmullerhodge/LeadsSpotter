export interface HashedALGO {

    content: string
}


export interface UserData {

    Id: number,
    Name: string,
    Email: string,
    Password: string,
    PloomesId: number | null,

}

export enum LoginErrors {

    MISSING_FIELDS = "Preencha os campos corretamente!",
    WRONG_CREDENTIALS = "Credenciais incorretas.",
    SERVER_ERROR = "Erro no servidor."
}

export enum RegisterErrors {

    EMAIL_ALREADY_EXISTS = "Email pertence a outro usuário.",
    MISSING_FIELDS = "Preencha os campos corretamente!",
    WRONG_CREDENTIALS = "Credenciais incorretas.",
    SERVER_ERROR = "Erro no servidor."

    
}
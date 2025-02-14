import { UserData } from "../declarations/interfaces";
import { ServerRoutes } from "./ServerRoutes";
import toast from "solid-toast";
import { DefaultHeaders } from "./Fetchio";



export async function register_user(U: UserData, navigate: (path: string) => void): Promise<boolean> {
    
    if(U.Password !== U.ConfirmPassword){
        toast.error("As senhas não coincidem");
        return false;

    }

    if(!U.Name || !U.Email || !U.Password){

        console.log(JSON.stringify(U, null, 2));
        toast.error("Preencha os dados corretamente!");
        return false;
    }

    const response = await fetch("http://localhost:8080/register", {
        method: 'POST',
        body: JSON.stringify(U),
        headers: {"Content-Type" : "application/json"}
    });

    if(response.ok){

        const data = await response.json();
        const userKey = data.UserKey;
        localStorage.setItem("UserKey", userKey)
        toast.success("Usuário criado!");
        setTimeout(() => {
            navigate('/chat');
        }, 1900);
        return true;
    }

    const errorResponse = await response.json();

    console.error("Usuário não criado!");
    toast.error(errorResponse.Reason);
    return false;


}


export async function log_user(U: Partial<UserData>, navigate: (path: string) => void): Promise<boolean> {

    if(!U.Email || !U.Password){
        toast.error("Preencha todos os campos!");
        return false;
    }

    const payload = {
        Email: U.Email,
        Password: U.Password
    };

    const response = await fetch(ServerRoutes.loginURL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: DefaultHeaders
    });

    if(response.ok){

        //set the data to the local storage.
        const data = await response.json();
        const userKey = data.UserKey;
        localStorage.setItem("UserKey", userKey)
        toast.success("Usuário logado!");
        setTimeout(() => {
            navigate('/');
        }, 1900);
        return true;
    }


    const errorResponse = await response.json();

    console.error("Usuário não logado!");
    toast.error(errorResponse.Reason);
    return false;

}   


import { ServerRoutes } from "./ServerRoutes";
import toast from "solid-toast";


export function get_user_key(): string | null {

    return localStorage.getItem("UserKey");
}

export function logout(): void {

    localStorage.removeItem("UserKey");
    window.location.href = "/login";

}


export async function is_logged(): Promise<boolean> {

    const authHeaders = {"Authorization" : `Bearer ${get_user_key()}`, "Content-Type" : "application/json"}

    const response = await fetch(ServerRoutes.authURL, {
    
        method: 'GET',
        headers: authHeaders
    });

    if(response.ok){
        return true;
    }

    toast.error("Sessão expirada!");
    return false;
    
}
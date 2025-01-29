import './chat.css';
import Message from '../components/Message';
import { ServerRoutes } from '../library/ServerRoutes';
import toast, { Toaster } from 'solid-toast';
import { get_user_key, logout } from '../library/Session';
import { onMount } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import Touchable from '../components/Touchable';
import { FiLogOut } from 'solid-icons/fi';


async function is_logged(navigate: (path: string) => void): Promise<boolean> {

    const authHeaders = {"Authorization" : `Bearer ${get_user_key()}`, "Content-Type" : "application/json"}

    const response = await fetch(ServerRoutes.authURL, {
        method: 'GET',
        headers: authHeaders
    });

    if(response.ok){

        return true;
    }

    toast.error("Sessão expirada!");
    navigate("/login");
    return false;
 
}

export default function Chat() {

    const navigate = useNavigate();
    onMount(async () => is_logged(navigate));

    return (

    <div class="chat-container">
        <Toaster/>
        <div class="chat">
            <Message fromUser={true} content='Hello, are you there?'/>
            <Touchable
                style={{"background-color": "red", "border" : "2px solid red"}}
                text='Logout'
                icon={<FiLogOut/>}
                onclick={logout}
            />
        </div>
    </div>
    )
}


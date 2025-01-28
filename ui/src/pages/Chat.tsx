import './chat.css';
import Message from '../components/Message';
import { ServerRoutes } from '../library/ServerRoutes';
import { DefaultHeaders } from '../library/Fetchio';


async function is_logged(): Promise<boolean> {

    const response = await fetch(ServerRoutes.chatURL, {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if(response.ok){

        console.log("Usuário logado!");
        return true;
    }

    console.log("Usuário não logado!");
    return false;
 
}

export default function Chat() {

    const _isLogged = is_logged().then(() => {});
    return (

    <div class="chat-container">
        <div class="chat">
            <Message fromUser={true} content='Hello, are you there?'/>
        </div>
    </div>
    )
}


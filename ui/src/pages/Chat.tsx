import './chat.css';
import Message from '../components/Message';
import { Toaster } from 'solid-toast';
import { logout, is_logged } from '../library/Session';
import { createEffect, createResource, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import Touchable from '../components/Touchable';
import { FiLogOut } from 'solid-icons/fi';
import VerifyingSession from './VerifyingSession';
import Layout from '../layout/Layout';

export default function Chat() {

    const navigate = useNavigate();
    const [authStatus] = createResource(is_logged)
    createEffect(() => {

        if (authStatus() == false) {
            navigate('/Login');
        }

    });

    return (
        <Layout>
             <Show when={authStatus()} fallback={<VerifyingSession/>}>
                <div class="chat-container">
                    <Toaster />
                    <div class="chat">
                        <Message fromUser={true} content='Hello, are you there?' />
                        <Touchable
                            style={{ "background-color": "red", "border": "2px solid red" }}
                            text='Logout'
                            icon={<FiLogOut />}
                            onclick={logout}
                        />
                    </div>
                </div>
            </Show> 
        </Layout>
    )
}


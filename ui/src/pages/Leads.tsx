import './leads.css';
import Message from '../components/Message';
import { Toaster } from 'solid-toast';
import { logout } from '../library/Session';
import Touchable from '../components/Touchable';
import { FiLogOut } from 'solid-icons/fi';
import Layout from '../layout/Layout';

export default function Leads() {


    return (
        <Layout activeRoute='leads'>
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
        </Layout>
    )
}


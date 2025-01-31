import './leads.css';
import { is_logged } from '../library/Session';
import { createEffect, createResource, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import Layout from '../layout/Layout';

export default function Configurations() {

    const navigate = useNavigate();
    const [authStatus] = createResource(is_logged)
    createEffect(() => {

        if (authStatus() == false) {
            navigate('/login');
        }

    });

    return (
        <Layout activeRoute='configurations'>
             <Show when={authStatus()} fallback={<></>}>
            <h1>Configurations!</h1>
            </Show> 
        </Layout>
    )
}


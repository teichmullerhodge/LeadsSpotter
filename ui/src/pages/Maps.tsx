import './maps.css';
import { is_logged } from '../library/Session';
import { createResource, onMount, Show } from 'solid-js';
import Layout from '../layout/Layout';
import { init_google_maps } from '../library/GoogleMaps';


export default function Maps() {

    const [authStatus] = createResource(is_logged)
    onMount(() => init_google_maps());
    return (
        <Layout activeRoute='maps'>
             <Show when={authStatus()} fallback={<></>}>
                <div class="maps-container" id="map">
                    Maps
                </div>
            </Show> 
        </Layout>
    )
}


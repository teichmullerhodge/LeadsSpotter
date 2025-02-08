import { JSX } from "solid-js";
import Header from "./Header";
import Sidebar from "./Sidebar";
import './layout.css'
import { createResource, createEffect } from "solid-js";
import { useNavigate } from "@solidjs/router";
import { is_logged } from "../library/Session";

interface LayoutProperties {

    children?: JSX.Element | JSX.Element[]
    activeRoute: 'index' | 'leads' | 'maps' | 'configurations' | 'chat'
}

export default function Layout(properties: LayoutProperties){
    const navigate = useNavigate()
    const [authStatus] = createResource(is_logged)
    createEffect(() => {

        if (authStatus() == false) {
            navigate('/login');
        }

    });


    return(
        <div class="app">
            <div class="content">
                <Sidebar activeRoute={properties.activeRoute} />
                <div class="children-container">
                    {properties.children}
                </div>
            </div>
            <Header/>
        </div>
    )    
}
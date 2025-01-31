import { JSX } from "solid-js";
import Header from "./Header";
import Sidebar from "./Sidebar";
import './layout.css'

interface LayoutProperties {

    children: JSX.Element | JSX.Element[]
}

export default function Layout(properties: LayoutProperties){

    return(
        <div class="app">
                <Header/>
            <div class="content">
                <Sidebar/>
                {properties.children}
            </div>
        </div>
    )    
}
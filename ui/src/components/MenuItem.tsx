import { JSX } from "solid-js/jsx-runtime";
import './menuitem.css';

interface MenuItemProperties {

    icon?: JSX.Element | undefined,
    text: string,
    onclick?: () => void,
    type?: "submit" | "reset" | "button" | undefined,
    active?: boolean
}

function MenuItem(properties: MenuItemProperties){

    return(
    
            <button

                class={properties.active ? "menuitem active" : "menuitem"}
                type={properties.type}
                on:click={properties.onclick}         

            >
                {properties.icon}
                {properties.text}
           </button>)

}


export default MenuItem;
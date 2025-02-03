import { JSX } from "solid-js/jsx-runtime";
import './menuitem.css';

interface MenuItemProperties {

    icon?: JSX.Element | undefined,
    text: string,
    onclick?: () => void,
    type?: "submit" | "reset" | "button" | undefined,
    active?: boolean,
    logout?: boolean,
    tooltip?: string,

}

function MenuItem(properties: MenuItemProperties){

    let menuClass = properties.active ? "menuitem active" : "menuitem";
    menuClass = properties.logout ? menuClass + ' logout' : menuClass;

    return(
    
            <button
                title={properties.tooltip}
                class={menuClass}
                type={properties.type}
                on:click={properties.onclick}         

            >
                {properties.icon}
                {properties.text}
           </button>)

}


export default MenuItem;
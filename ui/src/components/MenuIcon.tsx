import { JSX } from "solid-js/jsx-runtime";
import './menuicon.css';

interface MenuIconProperties {

    icon: JSX.Element,
    logout?: boolean,
    onclick?: () => void,
    active?: boolean,
    tooltip?: string,
}

function MenuIcon(properties: MenuIconProperties){

    let iconClass = properties.active ? "icon-container active" : "icon-container";
    iconClass = properties.logout ? iconClass + ' logout' : iconClass;

    return(
    
            <div class={iconClass} title={properties.tooltip}
                 onclick={properties.onclick}>
                {properties.icon}
           </div>)

}


export default MenuIcon;
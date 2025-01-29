import { JSX } from "solid-js/jsx-runtime";
import './touchable.css';


interface TouchableProperties {

    style?: string | JSX.CSSProperties | undefined,
    icon?: JSX.Element | undefined,
    text: string,
    onclick?: () => void,
    type?: "submit" | "reset" | "button" | undefined,
}

function Touchable(properties: TouchableProperties){

    return(
    
            <button 
                class="touchable"
                type={properties.type}
                style={properties.style}   
                on:click={properties.onclick}         
            >
                {properties.text}
                {properties.icon}
           </button>)

}


export default Touchable;
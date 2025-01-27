import { JSX } from "solid-js/jsx-runtime";
import './touchable.css';


interface TouchableProperties {

    style: string | JSX.CSSProperties | undefined,
    icon?: JSX.Element | undefined,
    text: string,

}

function Touchable(properties: TouchableProperties){

    return(
    
            <button 
            class="touchable"
            style={properties.style}            
            >
            {properties.text}
            {properties.icon}
           </button>)

}


export default Touchable;
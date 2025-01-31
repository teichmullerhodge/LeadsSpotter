import { JSX } from 'solid-js';
import './logoimage.css';


interface LogoImageProperties {

    width: string,
    height: string,
    class?: string,
    style: JSX.CSSProperties,
    textSize?: string,
}


export default function LogoImage(properties: LogoImageProperties){

    return(
        <div class="logo-container" style={properties.style}>
            <img 
                class={properties.class}
                src="src/assets/logo.png"
                width={properties.width}
                height={properties.height}
            ></img>
            <span 
                class="logo-text"
                style={{"font-size": properties.textSize}}
            >Saphire</span>
        </div>
    );

}
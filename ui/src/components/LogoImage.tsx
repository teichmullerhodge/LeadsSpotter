import { JSX } from 'solid-js';
import './logoimage.css';


interface LogoImageProperties {

    width: string,
    height: string,
    style?: JSX.CSSProperties,
    textSize?: string,
    hasText?: boolean
}


export default function LogoImage(properties: LogoImageProperties){

    return(
        <div class="logo-container" style={properties.style}>
            <img 
                class="logo"
                src="src/assets/logo.png"
                width={properties.width}
                height={properties.height}
            ></img>
            {
            properties.hasText ? 
                <span
                    class="logo-text"
                    style={{"font-size": properties.textSize}}
                >Leadspotter</span>
                : <></>
            }
        </div>
    );

}
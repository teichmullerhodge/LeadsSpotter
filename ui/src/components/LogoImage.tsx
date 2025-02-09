import { JSX } from 'solid-js';
import './logoimage.css';


interface LogoImageProperties {

    width: string,
    height: string,
    style?: JSX.CSSProperties,
    textSize?: string,
    hasText?: boolean
    darkTheme?: boolean
}


export default function LogoImage(properties: LogoImageProperties){

    return(
        <div class={properties.darkTheme ? "logo-container dark" : "logo-container"} style={properties.style}>
            <img 
                class={properties.darkTheme ? "logo dark" : "logo"}
                src="src/assets/logo.png"
                width={properties.width}
                height={properties.height}
            ></img>
            {
            properties.hasText ? 
            <span class={properties.darkTheme ? "lead dark" : "lead"}>Lead <span class= { properties.darkTheme ? "spotter dark" : "spotter"}>spotter</span></span>
            : <></>
            }
        </div>
    );

}
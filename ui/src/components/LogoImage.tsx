import './logoimage.css';


interface LogoImageProperties {

    width: string,
    height: string,
    class?: string,
}


export default function LogoImage(properties: LogoImageProperties){

    return(
        <div class="logo-container">
            <img 
                class={properties.class}
                src="src/assets/logo.png"
                width={properties.width}
                height={properties.height}
            ></img>
            <span class="logo-text">Saphire</span>
        </div>
    );

}
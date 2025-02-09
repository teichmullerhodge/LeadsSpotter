import { createSignal, JSX } from "solid-js";
import './toogleswitch.css';


interface ToogleSwitchProperties {

    label?: string,
    icon?: JSX.Element
    style?: JSX.CSSProperties,
    onclick?: () => void 

}


export default function ToogleSwitch(properties: ToogleSwitchProperties){

    const [active, setActive] = createSignal(false);

    return(<div class="toogle-container" style={properties.style}>
                {properties.icon}
                <span class="label">{properties.label}</span>
                <div class="toogle" onclick={() => setActive(!active())}>
                    <div 
                        class= {active() ? "inner-circle active" : "inner-circle"} 
                    ></div>
                </div>
            </div>
        )

}
import './entry.css';
import { JSX } from "solid-js/jsx-runtime";

interface MenuEntryProperties {

    style?: JSX.CSSProperties,
    icon?: JSX.Element,
    label?: string,
    placeholder?: string,
    type: string,
    value?: string,
    onchange?: (e: any) => void

}
/**
 * 
 * This component is an extension of the Entry component
 *  The difference? The icon is placed on the start of the entry.
 */
export default function MenuEntry(properties: MenuEntryProperties){

    return(
        <div class="entry-container">
            <span class="entry-label">{properties.label}</span>
            <div class="entry" style={properties.style}>
                {properties.icon}
                <input 
                    value={properties.value}
                    onchange={properties.onchange}
                    class="entry-override"
                    type={properties.type} 
                    placeholder={properties.placeholder}
                ></input>
            </div>
        </div>


    )
}
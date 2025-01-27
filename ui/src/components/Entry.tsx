import './entry.css';
import { JSX } from "solid-js/jsx-runtime";

interface EntryProperties {

    
    icon?: JSX.Element,
    label?: string,
    placeholder?: string,
    type: string,

}

export default function Entry(properties: EntryProperties){

    return(
        <div class="entry-container">
            <span class="entry-label">{properties.label}</span>
            <div class="entry">
                <input 
                    class="entry-override"
                    type={properties.type} 
                    placeholder={properties.placeholder}
                ></input>
                {properties.icon}
            </div>
        </div>


    )
}
import { JSX } from 'solid-js/jsx-runtime';
import './checkbox.css';

interface CheckBoxProperties {

    label: string,
    callback?: () => void,
    style?: JSX.CSSProperties

}


export default function CheckBox(properties: CheckBoxProperties) {

    return(
    <div class="checkbox-container">
        <input class="checkbox" type="checkbox" style={properties.style}></input>
        <span class="check-label">{properties.label}</span>
    </div>)
}
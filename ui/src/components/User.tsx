import './user.css'
import { JSX } from "solid-js"


interface UserProperties {

    name: string,
    src: string,
    style?: JSX.CSSProperties
}


export default function User(properties: UserProperties) {

    return(
            <div class="user-container">
                <img src={properties.src} 
                    style={properties.style} 
                    class="user-image"
                />
                <span class="user-name">{properties.name}</span>                
            </div>
    )
}
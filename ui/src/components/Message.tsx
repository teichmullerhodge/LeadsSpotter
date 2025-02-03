
import { Properties } from 'solid-js/web';
import './message.css';
import LogoImage from './LogoImage';


declare type messageType = 'text' | 'audio' | 'file' | 'image'

interface MessageProperties {

    content: string,
    fromUser: boolean,
    type?: messageType
}

const botImageStyle = {
    
    "width": '20px',
    "border-radius": "20px", 
    "display" : "flex",
    "justify-content": "center",
    "align-items" : "center",
    "height": "25px",
    "padding": "8px",
    "border" : "3px solid var(--saphire-fade)",

}

export default function Message(properties: MessageProperties){

    return(<div class={properties.fromUser ? "message-container" : "bot-message-container"}
                    
            >
            {!properties.fromUser ? 
            <LogoImage 
                width='20px' 
                height='20px' 
                style={botImageStyle}
            />
            : <></>
            }
            <span class={properties.fromUser ? "message" : "bot-message"}>
                {properties.content}
            </span>
        
        </div>)
}
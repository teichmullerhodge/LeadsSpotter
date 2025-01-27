
import './message.css';


declare type messageType = 'text' | 'audio' | 'file' | 'image'

interface MessageProperties {

    content: string,
    fromUser: boolean,
    type?: messageType
}

export default function Message(properties: MessageProperties){

    return(<div class="message-container">
            
            <span class={properties.fromUser ? "message" : "bot-message"}>
                {properties.content}
            </span>
        
        </div>)
}
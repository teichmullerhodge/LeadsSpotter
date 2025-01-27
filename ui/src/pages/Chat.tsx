import './chat.css';
import Message from '../components/Message';

export default function Chat() {


    return (

    <div class="chat-container">
        <div class="chat">
            <Message fromUser={true} content='Hello, are you there?'/>
        </div>
    </div>
    )
}


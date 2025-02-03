import { BiRegularPaperclip, BiRegularPaperPlane } from 'solid-icons/bi';
import './chatentry.css';
import { JSX } from "solid-js/jsx-runtime";

interface ChatEntryProperties {

    style?: JSX.CSSProperties,
    onchange?: (e: any) => void

}

export default function ChatEntry(properties: ChatEntryProperties){

    return(
            <div class="chat-entry" style={properties.style}>
                <div contentEditable={true}        
                    spellcheck={true} 
                    aria-expanded="false" 
                    aria-autocomplete="list" 
                    aria-multiline="true" 
                    aria-label="Message" 
                    dir="auto" 
                    contenteditable={true} 
                    role="textbox" 
                    onchange={properties.onchange}
                    class="chat-entry-override"
                >                    
                </div>
                <BiRegularPaperclip/>
                <BiRegularPaperPlane/>
            </div>


    )
}
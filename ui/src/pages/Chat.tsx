import { FiFile, FiSend } from "solid-icons/fi";
import Message from "../components/Message";
import Touchable from "../components/Touchable";
import Layout from "../layout/Layout";
import './chat.css'
import Entry from "../components/Entry";
import { BiRegularPaperclip, BiRegularPaperPlane } from "solid-icons/bi";
import ChatEntry from "../components/ChatEntry";

export default function Chat() {


    return(
            <Layout activeRoute="chat">
                <div class="chat-container">
                    <div class="chat-list">
                        oK.
                    </div>
                    <div class="chat-content">
                        <h4>New chat</h4>
                        <div class="messages">
                            <Message 
                                type="text" 
                                fromUser={false}
                                content="Hi? I'm sending a really really really big message, are you sure it's not breaking your clumsy application made in solid JS? Hi? I'm sending a really really really big message, are you sure it's not breaking your clumsy application made in solid JS? Hi? I'm sending a really really really big message, are you sure it's not breaking your clumsy application made in solid JS? Hi? I'm sending a really really really big message, are you sure it's not breaking your clumsy application made in solid JS?"
                            />
                            <Message 
                                type="text" 
                                fromUser={true}
                                content="Hi? I'm sending a really really really big message, are you sure it's not breaking your clumsy application made in solid JS? Hi? I'm sending a really really really big message, are you sure it's not breaking your clumsy application made in solid JS? Hi? I'm sending a really really really big message, are you sure it's not breaking your clumsy application made in solid JS? Hi? I'm sending a really really really big message, are you sure it's not breaking your clumsy application made in solid JS?"
                            />
                            <Message 
                                type="text" 
                                fromUser={true}
                                content="Hi? I'm sending a really really really big message, are you sure it's not breaking your clumsy application made in solid JS? Hi? I'm sending a really really really big message, are you sure it's not breaking your clumsy application made in solid JS? Hi? I'm sending a really really really big message, are you sure it's not breaking your clumsy application made in solid JS? Hi? I'm sending a really really really big message, are you sure it's not breaking your clumsy application made in solid JS?"
                            />
                            <Message 
                                type="text" 
                                fromUser={true}
                                content="Cool, hm?"
                            />
                            <Message 
                                type="text" 
                                fromUser={false}
                                content="Yes! This is really cool."
                            />
                            <Message 
                                type="text" 
                                fromUser={false}
                                content="Let's see the scrolling effect."
                            />
                            <Message 
                                type="text" 
                                fromUser={false}
                                content="Hi? I'm sending a really really really big message, are you sure it's not breaking your clumsy application made in solid JS? Hi? I'm sending a really really really big message, are you sure it's not breaking your clumsy application made in solid JS? Hi? I'm sending a really really really big message, are you sure it's not breaking your clumsy application made in solid JS? Hi? I'm sending a really really really big message, are you sure it's not breaking your clumsy application made in solid JS?"
                            />

                        </div>
                        <div class="input-container">
                            <ChatEntry
                                style={{width: "100%"}}
                            />

                        </div>
                    </div>
                </div>
            </Layout>
        )
    
}
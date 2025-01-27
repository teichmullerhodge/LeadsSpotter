import Touchable from '../components/Touchable'; 
import Entry from '../components/Entry';
import LogoImage from '../components/LogoImage';
import { A } from '@solidjs/router';
import { FiMail, FiEye, FiEyeOff } from 'solid-icons/fi';
import { createSignal } from 'solid-js';
import CheckBox from '../components/CheckBox';

import './forms.css';

export default function Login() {
    
    const [passwordHidden, setPasswordHidden] = createSignal(true);
    const passwordNewState = () => setPasswordHidden(!passwordHidden());

    
    return(

        <div class="main-container">
            <form class='form-container'>
                <LogoImage 
                    width="10%"
                    height="10%"                
                />
                <span class="greetings">Welcome back again 👋</span>
                <span class="greetings-login">Enter your credentials bellow.</span>
                <Entry 
                    label='Email'
                    placeholder='Your email' 
                    type='text'
                    icon={<FiMail on:click={() => alert('Hi!')}/>}                    
                />
                <Entry 
                    label='Password'
                    placeholder='Password' 
                    type={passwordHidden() ? 'password' : 'text'}
                    icon={passwordHidden() ? 
                        <FiEye 
                        on:click={() => passwordNewState()}
                        /> : 
                        <FiEyeOff
                        on:click={() => passwordNewState()}
                        />
                    }
                />
                <CheckBox label='Remember me?'/>
                <Touchable 
                    text='Sign in!' 
                    style={{"font-size": "16px", width: "80x", height: "35px"}}
                />
                <span>Already have an account? 
                    <A href='/register'>Register</A>
                </span>

            </form>
    
            </div>
                        
    )

}

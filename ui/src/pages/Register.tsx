import Touchable from '../components/Touchable'; 
import Entry from '../components/Entry';
import LogoImage from '../components/LogoImage';
import { A } from '@solidjs/router';
import { FiMail, FiEye, FiEyeOff, FiUser } from 'solid-icons/fi';
import { createSignal } from 'solid-js';

import './forms.css';

export default function Register() {
    
    const [passwordHidden, setPasswordHidden] = createSignal(true);
    const passwordNewState = () => setPasswordHidden(!passwordHidden());

    
    return(

        <div class="main-container">
            <form class='form-container'>
                <LogoImage 
                    width="10%"
                    height="10%"                
                />
                <span class="greetings">Good to see you here! Let's start? 💎</span>
                <span class="greetings-login">Create your account bellow.</span>
                <Entry 
                    label='Name'
                    placeholder='Your name' 
                    type='text'
                    icon={<FiUser on:click={() => alert('Hi!')}/>}                    
                />
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
                <Entry 
                    label='Confirm your password'
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

                <Touchable 
                    text='Register!' 
                    style={{"font-size": "16px", width: "80x", height: "35px"}}
                />
                <span>Already have an account? 
                    <A href='/login'>Login</A>
                </span>

            </form>
    
            </div>
                        
    )

}

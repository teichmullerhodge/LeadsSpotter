import Touchable from '../components/Touchable'; 
import Entry from '../components/Entry';
import LogoImage from '../components/LogoImage';
import { A, useNavigate } from '@solidjs/router';
import { FiMail, FiEye, FiEyeOff } from 'solid-icons/fi';
import { createSignal } from 'solid-js';
import CheckBox from '../components/CheckBox';
import { Toaster } from 'solid-toast';
import { log_user } from '../library/DatabaseCommunication';
import { UserData } from '../declarations/interfaces';
import './forms.css';


export default function Login() {
    
    const navigate = useNavigate();


    const [passwordHidden, setPasswordHidden] = createSignal(true);
    const passwordNewState = () => setPasswordHidden(!passwordHidden());
    const [userCredentials, setUserCredentials] = createSignal<Partial<UserData>>({Email: '', Password: ''})
    function update_user_credentials(key: keyof UserData, value: string): void {
        setUserCredentials((prev) => ({ ...prev, [key]: value }));
    
    };
    
    return(

        <div class="main-container">
            <Toaster/>
            <form class='form-container'>
                <LogoImage 
                    width="10%"
                    height="10%"                
                />
                <span class="greetings">Bem vindo! 👋</span>
                <span class="greetings-login">Faça login abaixo.</span>
                <Entry 
                    value={userCredentials().Email}
                    onchange={(e: any) => update_user_credentials("Email", e.currentTarget.value)}
                    label='Email'
                    placeholder='Seu email' 
                    type='text'
                    icon={<FiMail on:click={() => alert('Hi!')}/>}                    
                />
                <Entry 
                    value={userCredentials().Password}
                    onchange={(e: any) => update_user_credentials("Password", e.currentTarget.value)}
                    label='Password'
                    placeholder='Sua senha' 
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
                <CheckBox label='Lembrar sessão?'/>
                <Touchable 
                    type='button'
                    text='Entrar!' 
                    style={{"font-size": "16px", width: "80x", height: "35px"}}
                    onclick={() => log_user(userCredentials(), navigate)}
                
                />
                <span>Ainda não possui uma conta? 
                    <A href='/register'>Cadastrar-se</A>
                </span>

            </form>
    
            </div>
                        
    )

}

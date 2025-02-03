import Touchable from '../components/Touchable'; 
import Entry from '../components/Entry';
import LogoImage from '../components/LogoImage';
import { A, useNavigate } from '@solidjs/router';
import { FiMail, FiEye, FiEyeOff, FiUser, FiPhone } from 'solid-icons/fi';
import { createSignal } from 'solid-js';
import { defaultUserData, UserData } from '../declarations/interfaces';
import './forms.css';
import { Toaster } from 'solid-toast';

import { new_user } from '../library/DatabaseCommunication';



export default function Register() {
    
    const navigate = useNavigate();
    const [passwordHidden, setPasswordHidden] = createSignal(true);
    const passwordNewState = () => setPasswordHidden(!passwordHidden());
    const [userData, setUserData] = createSignal<UserData>(defaultUserData);
    
    function update_user_value(key: keyof UserData, value: string): void {
        setUserData((prev) => ({ ...prev, [key]: value }));
    
    };
    

    return(

        <div class="main-container">
            <Toaster/>
            <form class='form-container'>
                <LogoImage 
                    width="15%"
                    height="15%"       
                    hasText={true}         
                />
                <span class="greetings">Bom vê-lo por aqui! Vamos começar? 🎯</span>
                <span class="greetings-login">Crie sua conta abaixo.</span>
                <Entry 

                    value={userData().Name}
                    onchange={(e: any) => update_user_value("Name", e.currentTarget.value)}
                    label='Nome'
                    placeholder='Seu nome' 
                    type='text'
                    icon={<FiUser size={18}/>}                    

                />
                <Entry 
                    value={userData().Email}
                    onchange={(e: any) => update_user_value("Email", e.currentTarget.value)}
                    label='Email'
                    placeholder='Seu email' 
                    type='text'
                    icon={<FiMail size={18}/>}                    
                />
                <Entry 
                    value={userData().Phone}
                    onchange={(e: any) => update_user_value("Phone", e.currentTarget.value)}
                    label='Telefone'
                    placeholder='Seu telefone' 
                    type='text'
                    icon={<FiPhone size={18}/>}                    
                />
                <Entry 
                    value={userData().Password}
                    onchange={(e: any) => update_user_value("Password", e.currentTarget.value)}
                    label='Senha'
                    placeholder='Senha' 
                    type={passwordHidden() ? 'password' : 'text'}
                    icon={passwordHidden() ? 
                        <FiEye size={18}
                        on:click={() => passwordNewState()}
                        /> : 
                        <FiEyeOff size={18}
                        on:click={() => passwordNewState()}
                        />
                    }
                />
                <Entry 
                    label='Confirme sua senha'
                    placeholder='Senha' 
                    value={userData().ConfirmPassword}
                    onchange={(e: any) => update_user_value("ConfirmPassword", e.currentTarget.value)}
                    type={passwordHidden() ? 'password' : 'text'}
                    icon={passwordHidden() ? 
                        <FiEye size={18}
                        on:click={() => passwordNewState()}
                        /> : 
                        <FiEyeOff size={18}
                        on:click={() => passwordNewState()}
                        />
                    }
                />

                <Touchable                     
                    type='button'
                    text='Cadastrar-se!' 
                    style={{"font-size": "16px", width: "80x", height: "35px", }}
                    onclick={async () => await new_user(userData(), navigate)}
                />
                <span>Já possui uma conta? 
                    <A href='/login'>Login</A>
                </span>

            </form>
    
            </div>
                        
    )

}

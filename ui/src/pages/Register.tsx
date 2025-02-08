import Touchable from '../components/Touchable'; 
import Entry from '../components/Entry';
import LogoImage from '../components/LogoImage';
import { useNavigate } from '@solidjs/router';
import { FiMail, FiEye, FiEyeOff, FiUser, FiPhone } from 'solid-icons/fi';
import { createSignal } from 'solid-js';
import { defaultUserData, UserData } from '../declarations/interfaces';
import './forms.css';
import { Toaster } from 'solid-toast';
import Link from '../components/Link';
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
            <div class="forms-header">
                <LogoImage width='30px' height='30px' hasText={true}/>
                <Link href="/help" text='Ajuda'/>
            </div>
            
            <Toaster/>
            <form class='form-container'>
                <span class="greetings">Vamos começar? Crie sua conta 🎯</span>
                <span class="greetings-login">Registre-se abaixo.</span>
                <Entry 

                    value={userData().Name}
                    onchange={(e: any) => update_user_value("Name", e.currentTarget.value)}
                    label='Nome'
                    placeholder='' 
                    type='text'
                    icon={<FiUser size={18}/>}                    

                />
                <Entry 
                    value={userData().Email}
                    onchange={(e: any) => update_user_value("Email", e.currentTarget.value)}
                    label='Email'
                    placeholder='' 
                    type='text'
                    icon={<FiMail size={18}/>}                    
                />
                <Entry 
                    value={userData().Phone}
                    onchange={(e: any) => update_user_value("Phone", e.currentTarget.value)}
                    label='Telefone'
                    placeholder='' 
                    type='text'
                    icon={<FiPhone size={18}/>}                    
                />
                <Entry 
                    value={userData().Password}
                    onchange={(e: any) => update_user_value("Password", e.currentTarget.value)}
                    label='Senha'
                    placeholder='' 
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
                    placeholder='' 
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
                    text='Criar conta' 
                    style={{"font-size": "16px", width: "40x", height: "45px"}}
                    onclick={async () => await new_user(userData(), navigate)}
                />
                <span class="centered-register">Já possui uma conta? 
                    <Link href='/login' text='Login'/>
                </span>

            </form>
                <div class="footer">
                    <span class="subtitle">Ampliando suas vendas</span>
                    <div class="mock">
                        <Link href="usage" text='Termos'/>
                        <span> | </span>
                        <Link href="politics" text='Política de privacidade'/>
                        <span> | Versão Beta: </span>
                        <Link href="changelog" text='Changelog'/>                
                    </div>
                </div>
            </div>
                        
    )

}

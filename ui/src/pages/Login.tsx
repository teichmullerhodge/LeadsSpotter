import Touchable from '../components/Touchable'; 
import Entry from '../components/Entry';
import LogoImage from '../components/LogoImage';
import { useNavigate } from '@solidjs/router';
import Link from '../components/Link';
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
            <div class="forms-header">
                <LogoImage width='30px' height='30px' hasText={true}/>
                <Link href="/help" text='Ajuda'/>
            </div>
            <Toaster/>
            <form class='form-container'>
                <span class="greetings">Iniciar sessão</span>
                <span class="greetings-login">Faça login abaixo.</span>
                <Entry 
                    value={userCredentials().Email}
                    onchange={(e: any) => update_user_credentials("Email", e.currentTarget.value)}
                    label='Email ou seu usuário'
                    placeholder='' 
                    type='text'
                    icon={<FiMail size={18} on:click={() => alert('Hi!')}/>}                    
                />
                <Entry 
                    value={userCredentials().Password}
                    onchange={(e: any) => update_user_credentials("Password", e.currentTarget.value)}
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
                <CheckBox label='Lembrar sessão?'/>
                <Touchable 
                    type='button'
                    text='Iniciar sessão' 
                    style={{"font-size": "16px", width: "40x", height: "45px"}}
                    onclick={() => log_user(userCredentials(), navigate)}
                
                />
                <span class="centered-register">Novo por aqui? 
                    <Link href='/register' text='Cadastre-se'/>
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

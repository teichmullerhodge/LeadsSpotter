import './verifyingsession.css'
import { FiLoader } from 'solid-icons/fi'
import LogoImage from '../components/LogoImage'
export default function VerifyingSession(){

    return(
        <div class="verify-container">
            <div class="mock">
                <span class="info">Verificando sessão...</span>
                <FiLoader 
                size={36}
                class='loader'
                />
            </div>
            <LogoImage class='fading-logo' width='150px' height='150px'/>
        </div>
)
}
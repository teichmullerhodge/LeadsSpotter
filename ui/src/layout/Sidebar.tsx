import { FiHome, FiLogOut, FiMap, FiSettings, FiUser } from 'solid-icons/fi';
import './sidebar.css';
import MenuItem from '../components/MenuItem';
import LogoImage from '../components/LogoImage';
import { useNavigate } from '@solidjs/router';



export default function Sidebar(){

    const navigate = useNavigate();


    return(<div class="sidebar">

            <LogoImage
                width='30'
                height='30'
                style={{"margin-top": "20px", "margin-bottom": "30px"}}
                textSize='20px'
            />

            <MenuItem
                text='Resumo'
                active={true}
                icon={<FiHome size={16}/>}
                onclick={() => navigate('/')}
            />
            <MenuItem
                text='Leads'
                icon={<FiUser size={16}/>}
                onclick={() => navigate('/leads')}

            />
            <MenuItem
                text='Mapa de leads'
                icon={<FiMap size={16}/>}
                onclick={() => navigate('/maps')}
            />
            <MenuItem
                text='Configurações'
                icon={<FiSettings size={16}/>}
                onclick={() => navigate('/configurations')}
            />
            <MenuItem                
                text='Logout'
                icon={<FiLogOut size={16}/>}
                onclick={() => navigate('/login')}
            />

           </div>
    )
    
}
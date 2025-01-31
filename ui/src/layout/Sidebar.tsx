import { FiHome, FiLogOut, FiMap, FiMoon, FiSearch, FiSettings, FiUser } from 'solid-icons/fi';
import './sidebar.css';
import MenuItem from '../components/MenuItem';
import LogoImage from '../components/LogoImage';
import { useNavigate } from '@solidjs/router';
import ToogleSwitch from '../components/ToogleSwitch';
import MenuEntry from '../components/MenuEntry';



export default function Sidebar(){

    const navigate = useNavigate();


    return(<div class="sidebar">

            <LogoImage
                width='30'
                height='30'
                style={{"margin-top": "20px", "margin-bottom": "30px"}}
                textSize='20px'
            />
            <MenuEntry
                    type='search'
                    icon={<FiSearch onclick={() => alert('Busca sendo feita...')}/>}
                    placeholder='Buscar...'
                    value=''
                    style={{"background-color": "var(--saphire-fade)"}}
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
            <div class="divider"></div>
            <MenuItem          

                text='Logout'
                logout={true}
                icon={<FiLogOut size={16}/>}
                onclick={() => navigate('/login')}
            />
            <ToogleSwitch 
                label='Modo escuro'  
                icon={<FiMoon/>}

            />
           </div>
    )
    
}
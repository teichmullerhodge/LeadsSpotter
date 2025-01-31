import { FiArrowLeftCircle, FiArrowRightCircle, FiHome, FiLogOut, FiMap, FiMoon, FiSearch, FiSettings, FiUser } from 'solid-icons/fi';
import './sidebar.css';
import MenuItem from '../components/MenuItem';
import LogoImage from '../components/LogoImage';
import { useNavigate } from '@solidjs/router';
import ToogleSwitch from '../components/ToogleSwitch';
import MenuEntry from '../components/MenuEntry';
import { logout } from '../library/Session';
import { createSignal } from 'solid-js';
import MenuIcon from '../components/MenuIcon';
import { LayoutState } from '../library/State';

interface SidebarProperties {

    activeRoute: 'index' | 'leads' | 'maps' | 'configurations',

}


export default function Sidebar({ activeRoute }: SidebarProperties) {
    const navigate = useNavigate();
    const expandedState = LayoutState.get_nav_state();
    const [expanded, setExpanded] = createSignal(expandedState);
    
    function expand_nav(state: boolean){
        setExpanded(state);
        LayoutState.set_nav_state(state);
        console.log("Estado armazenado: ", LayoutState.get_nav_state())
    }

    const menuItems = [
        { text: 'Resumo', route: 'index', icon: <FiHome size={16} /> },
        { text: 'Leads', route: 'leads', icon: <FiUser size={16} /> },
        { text: 'Mapa de leads', route: 'maps', icon: <FiMap size={16} /> },
        { text: 'Configurações', route: 'configurations', icon: <FiSettings size={16} /> },

    ];

    return (
        <div class={expanded() ? "sidebar" : "sidebar min"}>
            {expanded() ? 
                <LogoImage width='30' 
                           height='30' 
                           style={{ "margin-top": "20px", "margin-bottom": "30px" }} 
                           textSize='20px' 
                />
                    : 
                <LogoImage width='30' 
                           height='30' 
                           style={{ "margin-top": "20px", "margin-bottom": "30px" }} 
                           hasText={false}
                />
            }
            
            {expanded() ? (
                <MenuEntry
                    type='search'
                    icon={<FiSearch onClick={() => alert('Busca sendo feita...')} />}
                    placeholder='Buscar'
                    value=''
                    style={{ "background-color": "var(--saphire-fade)" }}
                />
            ) : (
                <MenuIcon icon={<FiSearch size={16} />} 
                onclick={() => expand_nav(!expanded())} />
            )}
            
            {menuItems.map(({ text, route, icon }) => (
                expanded() ? (
                    <MenuItem text={text} 
                              active={activeRoute === route} 
                              icon={icon} 
                              onclick={() => navigate(`/${route}`)} 
                    />
                ) : (
                    <MenuIcon icon={icon} 
                              onclick={() => navigate(`/${route}`)} 
                              active={activeRoute === route}
                    />
                )
            ))}
            
            <div class="divider"></div>
            {
                expanded() ? 
                <MenuItem text='Logout' 
                          logout={true} 
                          icon={<FiLogOut size={16}/>} 
                          onclick={logout} 
                />

                : <MenuIcon icon={<FiLogOut size={16}/>}
                            onclick={logout}
                            logout={true}
                    />
            }
            {
                expanded() ? 
                <ToogleSwitch label='Modo escuro' icon={<FiMoon />} />
                : 
                <ToogleSwitch/>

            }
            <MenuIcon 
                icon={expanded() ? <FiArrowLeftCircle size={16} /> : <FiArrowRightCircle size={16}/>} 
                onclick={() => expand_nav(!expanded())} 
            />  
        </div>
    );
}

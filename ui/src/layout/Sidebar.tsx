import './sidebar.css';
import MenuItem from '../components/MenuItem';
import LogoImage from '../components/LogoImage';
import { useNavigate } from '@solidjs/router';
import ToogleSwitch from '../components/ToogleSwitch';
import { logout } from '../library/Session';
import { createSignal } from 'solid-js';
import MenuIcon from '../components/MenuIcon';
import { LayoutState } from '../library/State';
import { BiRegularArrowToLeft, BiRegularArrowToRight, BiRegularCog, BiRegularHome, BiRegularLogOut, BiRegularMap, BiRegularMessageRounded, BiRegularMoon, BiRegularSearch, BiRegularUser } from 'solid-icons/bi';
interface SidebarProperties {
    activeRoute: 'home' | 'leads' | 'maps' | 'configurations' | 'chat',
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
        { text: 'Resumo', route: 'index', icon: <BiRegularHome size={19} /> },
        { text: 'Leads', route: 'leads', icon: <BiRegularUser size={19} /> },
        { text: 'Mapa de leads', route: 'maps', icon: <BiRegularMap size={19} /> },
        { text: 'IA Sales', route: 'chat', icon: <BiRegularMessageRounded size={19}/>},
        { text: 'Configurações', route: 'configurations', icon: <BiRegularCog size={19} /> },
    ];
    return (
        <div class={expanded() ? "sidebar" : "sidebar min"}>
            {expanded() ? 
                <LogoImage width='30' 
                           height='30' 
                           style={{ "margin-top": "20px", "margin-bottom": "30px" }} 
                           textSize='20px' 
                           hasText={true}
                />
                    : 
                <LogoImage width='30' 
                           height='30' 
                           style={{ "margin-top": "20px", "margin-bottom": "30px" }} 
                           hasText={false}
                />
            }
                        
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
                              tooltip={text}
                    />
                )
            ))}
            
            <div class="divider"></div>
            {
                expanded() ? 
                <MenuItem text='Logout' 
                          logout={true} 
                          icon={<BiRegularLogOut size={19}/>} 
                          onclick={logout} 
                />
                : <MenuIcon icon={<BiRegularLogOut size={19}/>}
                            onclick={logout}
                            logout={true}
                            tooltip='Logout'
                    />
            }
            {
                expanded() ? 
                <ToogleSwitch label='Modo escuro' icon={<BiRegularMoon />} />
                : 
                <ToogleSwitch/>
            }
            <MenuIcon 
                icon={expanded() ? <BiRegularArrowToLeft size={19} /> : <BiRegularArrowToRight size={19}/>} 
                onclick={() => expand_nav(!expanded())} 
                tooltip='Expandir'
            />  
        </div>
    );
}
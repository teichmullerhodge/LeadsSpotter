import './header.css';
import Entry from '../components/Entry';
import { FiBell, FiMap, FiSearch } from 'solid-icons/fi';
import Touchable from '../components/Touchable';
import User from '../components/User';

export default function Header(){

    return(<div class="header">
            <Entry
                type='search'
                icon={<FiSearch onclick={() => alert('Busca sendo feita...')}/>}
                placeholder='Buscar...'
                value=''
                style={{"background-color": "white"}}
            />
            <FiBell
                style={{cursor: "pointer"}}
                size={20}
            />
            <Touchable
                text='Mapa de clientes'
                icon={<FiMap/>}                
            /> 
            <User 
                style={{width: "40px", height: "40px"}}
                name={"Developer"}
                src={"https://cdn-icons-png.flaticon.com/512/892/892781.png"} 
            />
           </div>
    )
}
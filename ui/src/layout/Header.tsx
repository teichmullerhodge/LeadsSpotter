import './header.css';
import { FiBell, FiMap } from 'solid-icons/fi';
import Touchable from '../components/Touchable';
import User from '../components/User';

export default function Header(){

    return(<div class="header">
        
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
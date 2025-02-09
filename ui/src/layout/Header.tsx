import './header.css';

import { BiRegularBell, BiRegularMap } from "solid-icons/bi";
import Touchable from '../components/Touchable';
import User from '../components/User';



export default function Header(){

    return(<div class="header">

            <Touchable
                text='Mapa de leads'
                icon={<BiRegularMap size={20}/>}
                style={{"width": "200px",
                        "height": "75%",
                        "background": "linear-gradient(309deg, rgb(83, 72, 243) 23%, rgba(49, 41, 170, 0.86) 42%, rgb(91, 56, 138) 79%)",
                        "font-size": "14px",
                        "font-weight": "bold",
                }}
            />                
                <BiRegularBell
                    size={20}
                    style={{"cursor" : "pointer"}}
                />
                <User name="Matheus" 
                      src="https://gratisography.com/wp-content/uploads/2024/11/gratisography-augmented-reality-800x525.jpg"
                      style={{"width" : "40px", "height": "40px"}}
                />

            </div>
    )
}
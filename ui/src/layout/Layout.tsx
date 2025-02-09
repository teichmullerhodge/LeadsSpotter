import './layout.css'
import Sidebar from "./Sidebar";
import Header from './Header';

interface LayoutProperties {

    activeRoute: 'home' | 'leads' | 'maps' |  'chat' | 'configurations'

}


export default function Layout(properties: LayoutProperties){


    return(
        <div class="app">
            <Sidebar 
                    activeRoute={properties.activeRoute}        
            />
            <Header/>
        </div>
    
    )
}

import { A } from "@solidjs/router";
import './link.css'

interface LinkProperties {

    href: string;
    class?: string;
    text: string
}

export default function Link(properties: LinkProperties){


    return(<A href={properties.href} class={properties.class ? properties.class : 'ref'}>
        {properties.text}    
          </A>)
}
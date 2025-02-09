/* @refresh reload */
import './index.css'
import { render } from 'solid-js/web'
import { lazy } from 'solid-js'
import { Router } from '@solidjs/router'
import Home from './pages/Home'
import Laboratory from './pages/Laboratory'
import Leads from './pages/Leads'
import Maps from './pages/Maps'
import Chat from './pages/Chat'
import Configurations from './pages/Configurations'

const root = document.getElementById('root')
const routes = [ 
    
    {
        path: '/laboratory',
        component: Laboratory
    },
    {
        path: '/leads',
        component: Leads
    },
    {
        path: '/maps',
        component: Maps
    },
    {
        path: '/chat',
        component: Chat
    },
    {
        path: '/configurations',
        component: Configurations
    },
    {
        path: '/home',
        component: Home
    },
    {
        path: '/register',
        component: lazy(() => import("./pages/Register"))
    },
    {
        path: '/login',
        component: lazy(() => import("./pages/Login"))
    }
];


render(() => <Router>{routes}</Router>, root!)

/* @refresh reload */
import './index.css'
import { render } from 'solid-js/web'
import { lazy } from 'solid-js'
import { Router } from '@solidjs/router'

import Index from './pages/Index'
import Leads from './pages/Leads'
import Maps from './pages/Maps'
import Configurations from './pages/Configurations'
import Laboratory from './pages/Laboratory'
import Chat from './pages/Chat'


const root = document.getElementById('root')
const routes = [ 
    
    {
        path: '/index',
        component: Index
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
        path: '/laboratory',
        component: Laboratory
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

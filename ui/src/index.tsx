/* @refresh reload */
import { render } from 'solid-js/web'
import { lazy } from 'solid-js'
import { Router } from '@solidjs/router'
import './index.css'

const root = document.getElementById('root')
const routes = [ 
    
    {
        path: '/chat',
        component: lazy(() => import("./pages/Chat"))
    },
    {
        path: '/',
        component: lazy(() => import("./pages/Index"))
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

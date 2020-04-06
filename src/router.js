import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'

import { loadUserFromLocalStorage } from './utils'

import Notifications from "./view/Notifications";
import CallBack from '@/components/CallBack'

import Community from '@/view/Community'
import NotFound from '@/view/NotFound'
import Support from '@/view/Support'
import Albums from '@/view/Albums'
import Tasks from '@/view/Tasks'
import Index from '@/view/Index'
import Plans from "./view/Plans";


Vue.use(Router);

let router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index,
            meta: {
                title: 'Новости - Wlusm',
            }
        },
        {
            path: '/plans',
            name: 'Plans',
            component: Plans,
            meta: {
                title: 'Тарифные планы - Wlusm',
            }
        },
        {
            path: '/tasks',
            name: 'Tasks',
            component: Tasks,
            meta: {
                title: 'Задачи - Wlusm',
                requiresAuth: true,
            }
        },
        {
            path: '/support',
            name: 'Support',
            component: Support,
            meta: {
                title: 'Поддержка - Wlusm',
            }
        },
        {
            path: '/community',
            name: 'Community',
            component: Community,
            meta: {
                title: 'Сообщества - Wlusm',
                requiresAuth: true,
            }
        },
        {
            path: '/albums/:cummunity_id',
            name: 'Albums',
            component: Albums,
            meta: {
                title: 'Альбом - Wlusm',
                requiresAuth: true,
            }
        },
        {
            path: '/notifications',
            name: 'Notifications',
            component: Notifications,
            meta: {
                title: 'Уведомления - Wlusm',
                requiresAuth: true,
            }
        },
        {
            path: '/callback',
            name: 'CallBack',
            component: CallBack,
            meta: {
                title: 'Ожидайте - Wlusm',
            }
        },
        {
            path: '*',
            component: NotFound,
            meta: {
                title: 'Страница не найдена - Wlusm',
            }
        }
    ]
});

router.beforeResolve((to, from, next) => {
    if (to.name) {
        NProgress.start()
    }
    next()
});

router.afterEach((to, from) => {
    NProgress.done()
});

router.beforeEach((to, from, next) => {
    if (store.getters.isAuthenticated) {
        let user = loadUserFromLocalStorage()

        if (user) {
            let isPaid = user.subscription ? user.subscription.paid : null

            if(isPaid !== true && to.name !== 'Plans'){
                next('/plans')
            } else {
                next()
            }
        }
    } else {
        next()
    }
});

router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if(!store.getters.isAuthenticated) {
            next('/')
        } else {
            next()
        }
    } else {
        next()
    }
});

export default router
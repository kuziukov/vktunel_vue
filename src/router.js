import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'

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
    // If this isn't an initial page load.
    if (to.name) {
        // Start the route progress bar.
        NProgress.start()
    }
    next()
});

router.afterEach((to, from) => {
    // Complete the animation of the route progress bar.
    NProgress.done()
});


router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    if(to.matched.some(record => record.meta.requiresAuth)) {
        if (store.getters.isAuthenticated) {
            let user = JSON.parse(localStorage.getItem('user') || {}) ;
            let isPaid = user.subscription ? user.subscription.paid : null;

            if(isPaid !== true){
                next('/plans');
                return;
            }
            next();
            return;
        }
        next('/');
    } else {
        next();
    }
});

export default router
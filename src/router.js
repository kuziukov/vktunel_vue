import Vue from 'vue'
import Router from 'vue-router'
import store from './store.js'

import CallBack from '@/components/CallBack'

import Community from '@/view/Community'
import NotFound from '@/view/NotFound'
import Support from '@/view/Support'
import Albums from '@/view/Albums'
import Tasks from '@/view/Tasks'
import Index from '@/view/Index'


Vue.use(Router)

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
        path: '/community/:cummunity_id/albums',
        name: 'Albums',
        component: Albums,
        meta: {
          title: 'Альбом - Wlusm',
          requiresAuth: true,
        }
      },
      {
        path: '/callback',
        name: 'CallBack',
        component: CallBack
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
})

router.afterEach((to, from) => {
  // Complete the animation of the route progress bar.
  NProgress.done()
})


router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next()
      return
    }
    next('/') 
  } else {
    next() 
  }
})

export default router
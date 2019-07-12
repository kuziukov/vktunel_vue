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
          title: 'VK Tunel',
        }
      },
      {
        path: '/tasks',
        name: 'Tasks',
        component: Tasks,
        meta: {
          title: 'Задачи - VKTunel',
          requiresAuth: true,
        }
      },
      {
        path: '/support',
        name: 'Support',
        component: Support,
        meta: {
          title: 'Поддержка - VKTunel',
          requiresAuth: true,
        }
      },
      {
        path: '/community',
        name: 'Community',
        component: Community,
        meta: {
          title: 'Сообщества - VKTunel',
          requiresAuth: true,
        }
      },
      {
        path: '/community/:cummunity_id/albums',
        name: 'Albums',
        component: Albums,
        meta: {
          title: 'Альбом - VKTunel',
          requiresAuth: true,
        }
      },
      {
        path: '/callback',
        name: 'CallBack',
        component: CallBack
      },
      {
        path: '/404',
        name: '404',
        component: NotFound,
      },
      {
        path: '*',
        redirect: '/404'
      }
    ]
  });


router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)) {
    if (store.getters.isLoggedIn) {
      next()
      return
    }
    next('/') 
  } else {
    next() 
  }
})

export default router
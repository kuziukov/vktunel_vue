import Vue from 'vue'
import Router from 'vue-router'

import Community from '@/view/Community'
import NotFound from '@/view/NotFound'
import Support from '@/view/Support'
import Albums from '@/view/Albums'
import Tasks from '@/view/Tasks'
import Index from '@/view/Index'


Vue.use(Router)

export default new Router({
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
      path: '/404', 
      name: '404', 
      component: NotFound, 
    }, 
    { 
      path: '*', 
      redirect: '/404' 
    }
  ],
  computed : {
    isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
  }
})


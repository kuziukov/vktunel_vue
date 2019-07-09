import Vue from 'vue'
import Router from 'vue-router'
import LandingComponent from '@/components/LandingComponent'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'LandingComponent',
      component: LandingComponent
    },
    {
      path: '/about',
      name: 'HelloWorld',
      component: HelloWorld
    }
  ]
})
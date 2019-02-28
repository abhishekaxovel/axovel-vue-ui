import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import HelloWorld from '@/components/HelloWorld'
import Admin from '@/components/Admin'
import User from '@/components/User'
import LogIn from '@/components/LogIn'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/logIn',
      name: 'Log-In',
      component: LogIn
    },
    {
      path: '/hello',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/user',
      name: 'User',
      component: User
    }
  ]
})

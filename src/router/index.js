import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Admin from '@/components/Admin'
import User from '@/components/User'
import LogIn from '@/components/LogIn'
import UserLogIn from '@/components/UserLogIn'
import userdashboard from '@/components/user-dashboard'
import admindashboard from '@/components/admin-dashboard'
import event_list from '@/components/event-list'
import forgotPassword from '@/components/forgotPassword'
import demo from '@/components/demo'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/',
      name: 'Log-In',
      component: LogIn
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
    },
    {
      path: '/demo',
      name: 'Demo',
      component: demo
    },
    {
      path: '/admin-dash',
      name: 'Admin-Dash',
      component: admindashboard,
      meta: { 
        requiresAuth: true,
        is_admin : true
        }
    },
    {
      path: '/event-list',
      name: 'Event-List',
      component: event_list
    },
    {
      path: '/user-dash',
      name: 'User-Dash',
      component: userdashboard,
      meta: { 
        requiresAuth: true
        }
    },
    {
      path: '/login-page',
      name: 'UserLogIn',
      component: UserLogIn
    },
    {
      path: '/forgot-password',
      name: 'forgotpassword',
      component: forgotPassword
    }
  ]
})

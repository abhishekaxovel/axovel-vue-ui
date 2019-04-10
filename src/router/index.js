import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Admin from '@/components/Admin'
import User from '@/components/User'
import LogIn from '@/components/LogIn'
import userdashboard from '@/components/user-dashboard'
import admindashboard from '@/components/admin-dashboard'
import event_list from '@/components/event-list'
import forgotPassword from '@/components/forgotPassword'
import updatePassword from '@/components/updatePassword'
import demo from '@/components/demo'
import event from '@/components/event-preview'
import eventLocation from '@/components/eventLocation'
import eventRegistration from '@/components/eventRegistration'
import eventPayment from '@/components/eventPayment'
import list from '@/components/list'

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
      path: '/forgot-password',
      name: 'forgotpassword',
      component: forgotPassword
    },
    {
      path: '/update-password',
      name: 'updatepassword',
      component: updatePassword
    },
    {
      path: '/event',
      name: 'event',
      component: event
    },
    {
      path: '/eventLocation',
      name: 'eventLocation',
      component: eventLocation
    },
    {
      path: '/eventRegistration',
      name: 'eventRegistration',
      component: eventRegistration
    },
    {
      path: '/eventPayment',
      name: 'eventPayment',
      component: eventPayment
    },
    {
      path: '/list',
      name: 'list',
      component: list
    }
  ]
})

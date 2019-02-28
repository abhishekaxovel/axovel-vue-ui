import Admin from './components/Admin.vue';
import User from './components/User.vue';
import HelloWorld from './components/HelloWorld';

export const routes = [
    {path: '/', component: Admin},
    {path: '/user', component: User},
    {path: 'helloWorld', component: HelloWorld}
];
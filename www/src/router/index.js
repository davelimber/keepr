import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '../components/Login'
import Register from '../components/Register'
import Board from '../components/Board'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }, 
    {
      path: '/login',
      name: 'Login',
      component: Login
    },{
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/boards/:id',
      name: 'Board',
      component: Board
    }
  ]
})

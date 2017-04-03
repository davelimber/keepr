import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '../components/Login'
import Register from '../components/Register'
import Vault from '../components/Vault'
import Keep from '../components/Keep'
import SelectVault from '../components/SelectVault'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    }, {
      path: '/login',
      name: 'Login',
      component: Login
    }, {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/vaults/:id',
      name: 'Vault',
      component: Vault
    },
    // {
    //   path: '/vaults/',
    //   name: 'Vault',
    //   component: Vault
    // },
    {
      path: '/keeps/',
      name: 'Keep',
      component: Keep
    },
    {
      path: '/selectvault/',
      name: 'SelectVault',
      component: SelectVault
    },
    {
      path: '/selectvault/:id',
      name: 'SelectVault',
      component: SelectVault
    }

  ]
})

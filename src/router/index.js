import Vue from 'vue'
import VueRouter from 'vue-router'
import Menu from '../views/Menu.vue'
import Orders from '../views/Orders.vue'
import Customers from '../views/Customers.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/menu',
    name: 'Menu',
    component: Menu
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/customers',
    name: 'Customers',
    component: Customers
  }
]

const router = new VueRouter({
  routes
})

export default router

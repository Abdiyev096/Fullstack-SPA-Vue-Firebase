import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {
      layout: 'AuthLayout'
    },
    component: () => import('../views/Login.vue')
  },
  {
    path: '/register',
    name: 'register',
    meta: {
      layout: 'AuthLayout'
    },
    component: () => import('../views/Register.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    meta: {
      layout: 'MainLayout',
      auth: true
    },
    component: () => import('../views/Categories.vue')
  },
  {
    path: '/detail-record/:id',
    name: 'detail-record',
    meta: {
      layout: 'MainLayout',
      auth: true
    },
    component: () => import('../views/DetailRecord.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: {
      layout: 'MainLayout',
      auth: true
    },
    component: () => import('../views/History.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: {
      layout: 'MainLayout',
      auth: true
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/planning',
    name: 'planning',
    meta: {
      layout: 'MainLayout',
      auth: true
    },
    component: () => import('../views/Planning.vue')
  },
  {
    path: '/profile',
    name: 'profile',
    meta: {
      layout: 'MainLayout',
      auth: true
    },
    component: () => import('../views/Profile.vue')
  },
  {
    path: '/record',
    name: 'record',
    meta: {
      layout: 'MainLayout',
      auth: true
    },
    component: () => import('../views/Record.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.meta.auth

  if (!currentUser && requireAuth) {
    next('/login')
  } else {
    next()
  }
})

export default router

import Vue from 'vue/dist/vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui';
import Home from './pages/Home'
import ParkingTransaction from './pages/ParkingTransaction'
import User from './pages/User'
import Report from './pages/Report'
import Snapshot from './pages/Snapshot'
import Setting from './pages/setting/Index'
import Member from './pages/Member'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/user', component: User, name: 'user' },
    { path: '/parking-transaction', component: ParkingTransaction, name: 'parking-transaction' },
    { path: '/report', component: Report, name: 'report' },
    { path: '/snapshot', component: Snapshot, name: 'snapshot' },
    { path: '/setting', component: Setting, name: 'setting' },
    { path: '/member', component: Member, name: 'member' },
    { path: '*', component: Home },
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path == '/') {
    next()
  }

  else {
    let params = { route: to.path }
    axios.get('/checkAuth', { params: params }).then(r => {
      next()
    }).catch(e => {
      Message({
        message: 'Anda tidak berhak mengakses halaman ini.',
        type: 'error',
        showClose: true,
        duration: 10000
      })
      next(false)
    })
  }
});

export default router

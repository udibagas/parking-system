import Vue from 'vue'
import VueRouter from 'vue-router'
import { Message } from 'element-ui';
import Home from './pages/Home'
import ParkingMember from './pages/ParkingMember'
import ParkingGate from './pages/ParkingGate'
import LocationIdentity from './pages/LocationIdentity'
import VehicleType from './pages/VehicleType'
import ParkingTransaction from './pages/ParkingTransaction'
import User from './pages/User'
import Report from './pages/Report'
// import MemberRenewal from './pages/MemberRenewal'

Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        { path: '/', component: Home, name: 'home' },
        { path: '/user', component: User, name: 'user' },
        { path: '/parking-member', component: ParkingMember, name: 'parking-member' },
        { path: '/parking-transaction', component: ParkingTransaction, name: 'parking-transaction' },
        { path: '/location-identity', component: LocationIdentity, name: 'location-identity' },
        { path: '/parking-gate', component: ParkingGate, name: 'parking-gate' },
        { path: '/vehicle-type', component: VehicleType, name: 'vehicle-type' },
        { path: '/report', component: Report, name: 'report' },
        // { path: '/member-renewal', component: MemberRenewal, name: 'member-renewal' },
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

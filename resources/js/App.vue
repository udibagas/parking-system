<template>
    <div>
        <Login v-if="!$store.state.is_logged_in" :visible.sync="!$store.state.is_logged_in" />
        <el-container v-else>
            <Profile v-if="$store.state.is_logged_in" :show="showProfile" @close="showProfile = false" />
            <el-aside width="auto">
                <div v-show="!collapse" class="brand-box">
                    <img src="/images/logo.jpeg" style="height:60px;margin:25px 0" alt="">

                    <div>
                        <el-avatar :size="50" icon="el-icon-user"></el-avatar>
                        <br>
                        <strong>{{$store.state.user.name}}</strong><br>
                        <small>{{$store.state.user.email}}</small>
                    </div>
                </div>
                <el-menu
                :collapse="collapse"
                default-active="1"
                background-color="#060446"
                text-color="#fff"
                class="sidebar"
                active-text-color="#cc0000">
                    <el-menu-item v-for="(m, i) in menus" :index="(++i).toString()" :key="i" @click="$router.push(m.path)">
                        <i :class="m.icon"></i><span slot="title">{{m.label}}</span>
                    </el-menu-item>
                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <el-row>
                        <el-col :span="12">
                            <el-button type="text" class="btn-big text-white" @click.prevent="collapse = !collapse" :icon="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></el-button>
                            <span class="brand"> {{appName}} </span>
                        </el-col>
                        <el-col :span="12" class="text-right">
                            <el-dropdown @command="handleCommand">
                                <span class="el-dropdown-link" style="cursor:pointer">Welcome, {{$store.state.user.name}}!</span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="profile">My Profile</el-dropdown-item>
                                    <el-dropdown-item command="logout">Logout</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </el-col>
                    </el-row>
                </el-header>
                <el-main style="padding:20px">
                    <el-collapse-transition>
                        <router-view @back="goBack"></router-view>
                    </el-collapse-transition>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import Login from './pages/Login'
import Profile from './pages/Profile'

export default {
    components: { Login, Profile },
    computed: {
        menus() {
            let menus = [
                {label: 'Home', icon: 'el-icon-s-home', path: '/' },
                // {label: 'Gate In App', icon: 'el-icon-remove-outline', path: 'gate-in-app' },
                {label: 'Transactions', icon: 'el-icon-document-copy', path: 'parking-transaction' },
                // {label: 'Member Renewal', icon: 'el-icon-refresh', path: 'member-renewal' },
                {label: 'Snapshot', icon: 'el-icon-camera', path: 'snapshot' },
                {label: 'Report', icon: 'el-icon-data-analysis', path: 'report' },
            ]

            if (this.$store.state.user.role == 1) {
                menus.push(
                    {label: 'Gates', icon: 'el-icon-minus', path: 'parking-gate' },
                    {label: 'Vehicle Type', icon: 'el-icon-truck', path: 'vehicle-type' },
                    {label: 'Location Identity', icon: 'el-icon-office-building', path: 'location-identity' },
                    {label: 'Members', icon: 'el-icon-bank-card', path: 'parking-member' },
                    // {label: 'Server Information', icon: 'el-icon-odometer', path: 'server-information' },
                    {label: 'Users', icon: 'el-icon-user', path: 'user' },
                    // {label: 'Log', icon: 'el-icon-bell', path: 'log' }
                )
            }

            return menus;
        }
    },
    data() {
        return {
            collapse: false,
            appName: APP_NAME,
            showProfile: false,
            loginForm: !this.$store.state.is_logged_in,
            notif: false
        }
    },
    methods: {
        goBack() {
            window.history.back();
        },
        handleCommand(command) {
            if (command === 'logout') {
                axios.get('/logout').then(r => {
                    window.localStorage.removeItem('user')
                    window.localStorage.removeItem('token')
                    this.$store.state.user = {}
                    this.$store.state.token = ''
                    this.$store.state.is_logged_in = false
                })
            }

            if(command === 'profile') {
                this.showProfile = true
            }
        },
        getNotification() {
            if (!this.$store.state.is_logged_in) {
                return
            }

            let params = { read: 0, pageSize: 1 }
            axios.get('/notification', { params: params }).then(r => {
                if (r.data.data.length == 0) {
                    return
                }

                // jika tidak ada notifikasi yg tampil
                if (!this.notif)
                {
                    let n = r.data.data[0]
                    this.notif = true
                    let h = this.$createElement
                    this.$alert('[' + moment(n.created_at).format('DD/MMM/YYYY HH:mm:ss') + '] ' + n.message, 'Notifikasi', {
                        type: 'warning',
                        center: true,
                        roundButton: true,
                        confirmButtonText: 'SAYA TELAH MEMBACA NOTIFIKASI INI',
                        confirmButtonClass: 'bg-red',
                        beforeClose: (action, instance, done) => {
                            this.notif = false
                            done()
                        }
                    }).then(() => {
                        this.notif = false
                        axios.put('/notification/' + n.id, { read: 1 }).then(rr => {
                            console.log(rr.data)
                        }).catch(e => console.log(e))
                    })
                }
            }).catch(e => console.log(e))
        }
    },
    mounted() {
        setInterval(this.getNotification, 5000)
    }
}
</script>

<style lang="css" scoped>
.brand {
    font-size: 22px;
    margin-left: 20px;
}

.brand-box {
    height: 220px;
    background-color: #060446;
    text-align: center;
    color: #fff;
}


.btn-big {
    font-size: 22px;
}

.el-header {
    background-color: #254ec1;
    color: #fff;
    line-height: 60px;
}

.sidebar {
    background-color: #060446;
    border-color: #060446;
    height: calc(100vh - 220px);
    overflow: auto;
}

.sidebar:not(.el-menu--collapse) {
    width: 200px;
}

.el-aside {
    height: 100vh;
    background-color: #060446;
}

.el-main {
    background-color: #FFF;
}

.el-dropdown-link {
    color: #fff;
}
</style>

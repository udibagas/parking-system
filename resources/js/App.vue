<template>
    <div>
        <Login v-if="!$store.state.is_logged_in" />
        <el-container v-else>
            <Profile v-if="$store.state.is_logged_in" :show="showProfile" @close="showProfile = false" />
            <el-aside width="auto">
                <div v-show="!collapse" class="brand-box">
                    <img src="/images/logo.jpeg" style="height:60px;width:60px;margin:25px 0 10px 0;border-radius:5px;" alt="">

                    <div>
                        <!-- <el-avatar shape="square" :size="70" icon="el-icon-user" src="/images/logo.jpeg" fit="contain"></el-avatar>
                        <br>
                        <br> -->
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
                                <span class="el-dropdown-link" style="cursor:pointer">Selamat Datang, {{$store.state.user.name}}!</span>
                                <el-dropdown-menu slot="dropdown">
                                    <el-dropdown-item command="profile"><i class="el-icon-user"></i> Profil Saya</el-dropdown-item>
                                    <el-dropdown-item command="logout"><i class="el-icon-arrow-right"></i> Keluar</el-dropdown-item>
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
            return this.$store.state.navigationList
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
                this.logout()
            }

            if(command === 'profile') {
                this.showProfile = true
            }
        },
        logout() {
            axios.get('/logout').then(r => {
                window.localStorage.removeItem('user')
                window.localStorage.removeItem('token')
                this.$store.state.user = {}
                this.$store.state.token = ''
                this.$store.state.is_logged_in = false
            })
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
                            // console.log(rr.data)
                        }).catch(e => console.log(e))
                    })
                }
            }).catch(e => console.log(e))
        }
    },
    mounted() {
        window.onbeforeunload = (e) => {
            window.localStorage.removeItem('user')
            window.localStorage.removeItem('token')
        }

        this.$store.commit('getNavigationList')
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
    height: 150px;
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
    height: calc(100vh - 150px);
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

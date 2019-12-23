<template>
    <el-container>
        <el-main style="text-align:center">
            <img :src="'/images/' + appLogo" alt="" style="width:70px;margin-top:80px;border-radius:5px;">
            <h2>{{appName}}</h2>
            <el-form id="login-form" style="width:300px;margin: 20px auto 0;text-align:center;">
                <el-divider><h3>LOGIN</h3></el-divider>

                <el-form-item>
                    <el-input v-model="email" placeholder="Email/Username"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input type="password" v-model="password" placeholder="Password"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login" style="width:100%">LOGIN</el-button>
                </el-form-item>

                <!-- <a href="http://www.mitrateknik.co.id">www.MitraTeknik.co.id</a><br> -->
                <el-divider>&copy; {{year}}</el-divider>
            </el-form>
        </el-main>
    </el-container>
</template>

<script>
import moment from 'moment'

export default {
    data() {
        return {
            appName: APP_NAME,
            appLogo: APP_LOGO,
            email: '',
            password: '',
            year: moment().format('YYYY')
        }
    },
    methods: {
        login() {
            if (!this.email || !this.password) {
                return
            }

            let data = {
                email: this.email,
                password: this.password
            }

            axios.post('login', data).then(r => {
                window.localStorage.setItem('user', JSON.stringify(r.data.user))
                window.localStorage.setItem('token', r.data.token)
                window.axios.defaults.headers.common['Authorization'] = 'bearer ' + r.data.token;
                this.$store.state.user = r.data.user
                this.$store.state.token = r.data.token
                this.$store.state.is_logged_in = true
                this.$router.push('home')
            }).catch(e => {
                this.$message({
                    message: e.response.data.message || e.response.message,
                    type: 'error',
                    showClose: true
                })
            })
        }
    },
    mounted() {
        document.getElementById('login-form').onkeypress = (e) => {
            if (e.key == 'Enter') {
                this.login()
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

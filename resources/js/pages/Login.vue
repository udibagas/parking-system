<template>
    <el-dialog center title="" fullscreen :show-close="false" :close-on-click-modal="false" :visible.sync="visible" :close-on-press-escape="false">
        <div style="margin: 40px auto 0;text-align:center;">
            <img src="images/logo.jpeg" alt="" style="width:70px">
            <br>
            <h2>{{appName}}</h2>
        </div>
        <el-form style="width:300px;margin: 30px auto 0;text-align:center;">
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

            <!-- <el-divider></el-divider> -->
            <a href="http://www.mitrateknik.com">www.MitraTeknik.com</a><br>
            &copy; {{year}}
        </el-form>

    </el-dialog>
</template>

<script>
import moment from 'moment'

export default {
    props: ['visible'],
    data() {
        return {
            appName: APP_NAME,
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
                this.email = ''
                this.password = ''
            }).catch(e => {
                this.$message({
                    message: e.response.data.message || e.response.message,
                    type: 'error',
                    showClose: true
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>

</style>

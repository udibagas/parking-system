<template>
  <el-container>
    <el-main style="text-align: center; background: #fff">
      <img src="/images/logo.jpeg" style="width: 70px; margin-top: 80px; border-radius: 5px" />
      <h2>MITRATEKNIK PARKING</h2>
      <el-form @submit.native.prevent="login" style="width: 300px; margin: 20px auto 0; text-align: center">
        <el-divider>
          <h3>LOGIN</h3>
        </el-divider>

        <el-form-item>
          <el-input v-model="email" placeholder="Email/Username"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="password" placeholder="Password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" @click.prevent="login" style="width: 100%">LOGIN</el-button>
        </el-form-item>

        <!-- <a href="http://www.mitrateknik.co.id">www.MitraTeknik.co.id</a><br> -->
        <el-divider>&copy; {{ year }}</el-divider>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  layout: 'login',
  data() {
    return {
      email: '',
      password: '',
      year: this.$moment().format('YYYY'),
    }
  },
  methods: {
    login() {
      this.$auth
        .loginWith('cookie', {
          data: {
            email: this.email,
            password: this.password,
          },
        })
        .then((r) => this.$router.push('/'))
    },
  },
}
</script>

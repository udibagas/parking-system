<template>
  <el-container>
    <el-main style="text-align: center; background: #fff">
      <img
        src="/images/logo.jpeg"
        style="width: 70px; margin-top: 80px; border-radius: 5px"
      />
      <h2>MITRATEKNIK PARKING</h2>
      <el-form
        @submit.native.prevent="doLogin"
        style="width: 300px; margin: 20px auto 0; text-align: center"
      >
        <el-divider>
          <h3>LOGIN</h3>
        </el-divider>

        <el-form-item>
          <el-input
            v-model="email"
            placeholder="Email/Username"
            :prefix-icon="User"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            type="password"
            v-model="password"
            placeholder="Password"
            :prefix-icon="Lock"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" native-type="submit" style="width: 100%">
            LOGIN
          </el-button>
        </el-form-item>

        <!-- <a href="http://www.mitrateknik.co.id">www.mitrateknik.co.id</a><br /> -->
        <el-divider>&copy; {{ year }}</el-divider>
      </el-form>
    </el-main>
  </el-container>
</template>

<script setup>
import { Lock, User } from "@element-plus/icons-vue";

const { login } = useSanctumAuth();

definePageMeta({ layout: "login" });
const email = ref();
const password = ref();
const year = new Date().getFullYear();

const doLogin = async () => {
  try {
    await login({ email: email.value, password: password.value });
  } catch (error) {
    ElMessage({
      message: error.response?._data.message,
      type: "error",
    });
  }
};
</script>

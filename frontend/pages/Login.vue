<template>
	<div class="flex flex-row h-screen">
		<div class="flex-grow bg-blue-100 bg-container">
			<!-- <div
				class="flex flex-row m-6 p-6 bg-blue-500 bg-opacity-50 text-white text-4xl"
			>
				<img
					:src="'/images/' + appLogo"
					alt=""
					style="width: 70px"
					class="rounded mr-6"
				/>

				{{ appName }}
			</div> -->
		</div>
		<div class="text-center p-4 bg-blue-700 text-white">
			<img
				:src="`/storage/images/${appLogo}`"
				alt=""
				style="width: 70px"
				class="rounded m-auto"
			/>

			<div class="text-2xl mt-3 mb-6">
				{{ appName }}
			</div>

			<div class="mt-6">SILAKAN LOGIN</div>
			<el-form
				id="login-form"
				style="width: 300px; margin: 20px auto 0; text-align: center"
			>
				<el-form-item>
					<el-input
						prefix-icon="el-icon-user"
						v-model="email"
						placeholder="Email/Username"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-input
						prefix-icon="el-icon-lock"
						type="password"
						v-model="password"
						placeholder="Password"
					></el-input>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="login" style="width: 100%"
						>LOGIN</el-button
					>
				</el-form-item>

				<!-- <a href="http://www.mitrateknik.co.id">www.MitraTeknik.co.id</a><br> -->
				<small>&copy; {{ year }}</small>
			</el-form>
		</div>
	</div>
</template>

<script>
import moment from "moment";

export default {
	data() {
		return {
			appName: APP_NAME,
			appLogo: APP_LOGO,
			email: "",
			password: "",
			year: moment().format("YYYY"),
		};
	},
	methods: {
		login() {
			if (!this.email || !this.password) {
				return;
			}

			let data = {
				email: this.email,
				password: this.password,
			};

			axios
				.post("login", data)
				.then((r) => {
					window.axios.defaults.headers.common["Authorization"] =
						"bearer " + r.data.token;
					window.sessionStorage.setItem("token", r.data.token);
					window.sessionStorage.setItem("user", JSON.stringify(r.data.user));
					this.$store.state.user = r.data.user;
					this.$store.state.token = r.data.token;
					this.$router.push("home");
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message || e.response.message,
						type: "error",
						showClose: true,
					});
				});
		},
	},
	mounted() {
		document.getElementById("login-form").onkeypress = (e) => {
			if (e.key == "Enter") {
				this.login();
			}
		};
	},
};
</script>

<style lang="css" scoped>
.bg-container {
	background-image: url("/storage/images/bg.jpg");
	background-repeat: no-repeat;
	background-size: cover;
}
</style>

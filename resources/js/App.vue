<template>
	<div>
		<Login v-if="!$store.state.token" />
		<el-container v-else>
			<Profile
				v-if="$store.state.token"
				:show="showProfile"
				@close="showProfile = false"
			/>
			<el-aside width="auto">
				<div v-show="!collapse" class="brand-box">
					<img
						:src="`/storage/images/${appLogo}`"
						style="
							height: 60px;
							width: 60px;
							margin: 25px auto 10px;
							border-radius: 5px;
						"
						alt=""
					/>

					<div>
						<strong>{{ $store.state.user.name }}</strong
						><br />
						<small>{{ $store.state.user.role ? "Admin" : "Operator" }}</small>
					</div>
				</div>
				<el-menu
					:collapse="collapse"
					default-active="1"
					background-color="#060446"
					text-color="#fff"
					class="sidebar"
					active-text-color="#cc0000"
				>
					<el-menu-item
						v-for="(m, i) in menus"
						:index="(++i).toString()"
						:key="i"
						@click="$router.push(m.path)"
					>
						<i :class="m.icon"></i><span slot="title">{{ m.label }}</span>
					</el-menu-item>
				</el-menu>
			</el-aside>
			<el-container>
				<el-header class="flex">
					<div class="flex-grow">
						<el-button
							type="text"
							class="btn-big text-white"
							@click.prevent="collapse = !collapse"
							:icon="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
						></el-button>
						<span class="brand"> {{ appName }} </span>
					</div>
					<div>
						<el-popover
							v-if="notifications.length > 0"
							style="margin-right: 20px"
							placement="top-start"
							width="300"
							trigger="click"
						>
							<el-button
								slot="reference"
								type="danger"
								size="mini"
								round
								icon="el-icon-bell"
								style="color: #fff"
								>{{ notifications.length }}</el-button
							>
							<div
								style="
									height: calc(100vh - 300px);
									overflow: auto;
									padding-right: 10px;
								"
							>
								<el-button
									type="danger"
									style="width: 100%"
									round
									size="mini"
									@click="readAllNotification"
									>Tandai Sudah Dibaca Semua</el-button
								>
								<div v-for="n in notifications" :key="n.id">
									<p style="margin-bottom: 0">
										<strong>{{ n.created_at | readableDateTime }}</strong>
										{{ n.message }}
									</p>
									<el-button
										type="text"
										size="small"
										@click="readNotification(n.id)"
										>Tandai sudah dibaca</el-button
									><br />
								</div>
							</div>
						</el-popover>

						<el-dropdown @command="handleCommand">
							<span class="el-dropdown-link" style="cursor: pointer"
								>Selamat Datang, {{ $store.state.user.name }}!</span
							>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="profile"
									><i class="el-icon-user"></i> Profil Saya</el-dropdown-item
								>
								<el-dropdown-item command="logout"
									><i class="el-icon-arrow-right"></i> Keluar</el-dropdown-item
								>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
				</el-header>
				<el-main
					style="padding: 20px; height: calc(100vh - 60px); overflow: auto"
				>
					<el-collapse-transition>
						<router-view @back="goBack"></router-view>
					</el-collapse-transition>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>

<script>
import Login from "./pages/Login";
import Profile from "./pages/Profile";

export default {
	components: { Login, Profile },
	computed: {
		menus() {
			return this.$store.state.navigationList;
		},
	},
	data() {
		return {
			collapse: false,
			appName: APP_NAME,
			appLogo: APP_LOGO,
			showProfile: false,
			loginForm: !this.$store.state.token,
			notifications: [],
		};
	},
	methods: {
		goBack() {
			window.history.back();
		},
		handleCommand(command) {
			if (command === "logout") {
				this.logout();
			}

			if (command === "profile") {
				this.showProfile = true;
			}
		},
		logout() {
			axios
				.post("/logout", { token: this.$store.state.token })
				.then((r) => {
					this.$message({
						message: "Anda telah keluar",
						type: "success",
						showClose: true,
					});
				})
				.catch((e) => {
					this.$message({
						message: "Token tidak sesuai",
						type: "error",
						showClose: true,
					});
				})
				.finally(() => {
					window.sessionStorage.removeItem("token");
					window.sessionStorage.removeItem("user");
					this.$store.state.user = {};
					this.$store.state.token = null;
				});
		},
		getNotification() {
			if (!this.$store.state.token) {
				return;
			}

			axios
				.get("/notification/unreadNotification")
				.then((r) => {
					// kalau jumlah lebih dari sebelumnya tampilkan record terakhir
					if (r.data.length > this.notifications.length) {
						this.$notify.warning({
							title: "Notifikasi",
							message:
								"[" + r.data[0].created_at + "] " + r.data[0].data.message,
						});
					}
					this.notifications = r.data;
				})
				.catch((e) => console.log(e));
		},
		readNotification(id) {
			const params = { read: 1 };
			axios
				.put("/notification/" + id, { read: 1 })
				.then((r) => console.log(r))
				.catch((e) => console.log(e));
		},
		readAllNotification() {
			axios
				.put("/notification/markAllAsRead")
				.then((r) => (this.notifications = []))
				.catch((e) => console.log(e));
		},
	},
	mounted() {
		this.$store.commit("getNavigationList");
		setInterval(this.getNotification, 5000);
	},
};
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
	height: calc(100vh - 175px);
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
	background-color: #fff;
}

.el-dropdown-link {
	color: #fff;
}
</style>

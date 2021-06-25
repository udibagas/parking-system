<template>
	<el-container>
		<Profile :show="showProfile" @close="showProfile = false" />
		<el-aside width="auto">
			<div v-show="!collapse" class="brand-box">
				<img
					src="/images/logo.jpeg"
					style="
						height: 60px;
						width: 60px;
						margin: 25px 0 10px 0;
						border-radius: 5px;
					"
					alt
				/>

				<div>
					<strong>{{ $auth.user.name }}</strong>
					<br />
					<small>{{ $auth.user.role ? 'Admin' : 'Operator' }}</small>
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
					v-for="(m, i) in navigationList"
					:index="(++i).toString()"
					:key="i"
					@click="$router.push(m.path)"
				>
					<i :class="m.icon"></i>
					<span slot="title">{{ m.label }}</span>
				</el-menu-item>
			</el-menu>
		</el-aside>
		<el-container>
			<el-header>
				<el-row>
					<el-col :span="12">
						<el-button
							type="text"
							class="btn-big text-white"
							@click.prevent="collapse = !collapse"
							:icon="collapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
						></el-button>
						<span class="brand">RSVP PARKING SYSTEM</span>
					</el-col>
					<el-col :span="12" class="text-right">
						<el-dropdown @command="handleCommand">
							<span class="el-dropdown-link" style="cursor: pointer"
								>Selamat Datang, {{ $auth.user.name }}!</span
							>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="profile">
									<i class="el-icon-user"></i> Profil Saya
								</el-dropdown-item>
								<el-dropdown-item command="logout">
									<i class="el-icon-arrow-right"></i> Keluar
								</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</el-col>
				</el-row>
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
</template>

<script>
import { mapState } from 'vuex'

export default {
	middleware: ['auth'],

	computed: {
		...mapState(['navigationList']),
	},

	data() {
		return {
			collapse: false,
			showProfile: false,
		}
	},

	methods: {
		goBack() {
			window.history.back()
		},

		handleCommand(command) {
			if (command === 'logout') {
				this.$confirm('Anda yakin ingin keluar?', 'Konfirmasi', {
					type: 'warning',
				}).then(() => this.$auth.logout().then(this.$router.push('/login')))
			}

			if (command === 'profile') {
				this.showProfile = true
			}
		},
	},

	mounted() {
		this.$store.commit('getNavigationList')
	},
}
</script>

<style lang="css" scoped>
* {
	margin: 0;
	padding: 0;
}

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
	background-color: #fff;
}

.el-dropdown-link {
	color: #fff;
}
</style>

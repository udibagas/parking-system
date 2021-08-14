<template>
	<el-container>
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
				router
				:collapse="collapse"
				:default-active="$route.path"
				background-color="#060446"
				text-color="#fff"
				class="sidebar"
				active-text-color="#cc0000"
			>
				<el-menu-item v-for="(m, i) in navigationList" :index="m.path" :key="i">
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
							<span class="el-dropdown-link text-white" style="cursor: pointer"
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
				<router-view @back="goBack"></router-view>
				<Profile :show="showProfile" @close="showProfile = false" />
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

	created() {
		this.$store.dispatch('getNavigationList')
		this.$store.dispatch('getSetting')
		this.$store.dispatch('getGateInList')
		this.$store.dispatch('getGateOutList')
		this.$store.dispatch('getJenisKendaraanList')
	},
}
</script>

<style lang="css">
html,
body {
	margin: 0;
	padding: 0;
	font-family: Arial, Helvetica, sans-serif;
}

.el-icon-more {
	transform: rotate(90deg);
	-webkit-transform: rotate(90deg);
	-moz-transform: rotate(90deg);
	-ms-transform: rotate(90deg);
	-o-transform: rotate(90deg);
}

.el-table {
	width: 100%;
	border-top: 1px solid #eee;
}

.no-padding-dialog > .el-dialog__body {
	padding: 0px;
}

.pointer {
	cursor: pointer;
}

.text-right {
	text-align: right;
}

.text-center {
	text-align: center;
}

.text-white,
.text-white:hover,
.text-white:active,
.text-white:focus {
	color: #fff !important;
}

.bg-blue {
	background-color: blue !important;
}

.bg-indigo {
	background-color: indigo !important;
}

.bg-purple {
	background-color: purple !important;
}

.bg-pink {
	background-color: pink !important;
}
.bg-red {
	background-color: red !important;
}

.bg-orange {
	background-color: orange !important;
}

.bg-yellow {
	background-color: yellow !important;
}

.bg-green {
	background-color: green !important;
}

.bg-teal {
	background-color: teal !important;
}

.bg-cyan {
	background-color: cyan !important;
}

.el-table th,
.el-table thead.is-group th {
	padding: 4px 0;
}

.text-red,
.text-danger {
	color: red;
}

.text-green,
.text-success {
	color: green;
}

table {
	border-spacing: 0px;
	border-collapse: separate;
}

.table {
	width: 100%;
	border-top: 2px solid #ddd;
}

.table th,
.table td {
	padding: 10px;
	border-bottom: 1px solid #ddd;
}

.el-table .inactive-row {
	background: #ffeff0;
}

.el-table .cell,
.el-dialog__body {
	word-break: normal;
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
	background-color: #efefef;
}

.flex {
	display: flex;
}

.flex-row {
	flex-direction: row;
}

.flex-col {
	flex-direction: column;
}

.mb-1 {
	margin-bottom: 5px;
}

.mb-3 {
	margin-bottom: 15px;
}

.ml-5 {
	margin-left: 25px;
}

.p-2 {
	padding: 2px;
}

.text-xl {
	font-size: 3em;
}

.border {
	border: 1px solid #ddd;
}
</style>

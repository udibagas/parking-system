<template>
	<el-dialog
		:visible.sync="show"
		center
		:close-on-click-modal="false"
		:show-close="false"
	>
		<div class="text-center" style="font-size: 50px; color: orange">
			<i class="el-icon-warning-outline"></i>
		</div>

		<div class="text-center" style="font-size: 24px; margin-top: 20px">
			{{ notification.message }}
		</div>

		<div slot="footer">
			<el-button
				type="primary"
				icon="el-icon-circle-close"
				@click="show = false"
				>TUTUP</el-button
			>
		</div>
	</el-dialog>
</template>

<script>
export default {
	data() {
		return {
			show: false,
			notification: {},
			echo: null,
		}
	},

	mounted() {
		// TODO: ambil setingan dari database
		this.echo = this.$echo({
			key: 'pusher_app_key',
			host: '127.0.0.1',
			port: 6001,
		})

		this.echo.private('notification').notification((notification) => {
			this.notification = notification
			this.show = true
		})
	},

	destroyed() {
		this.echo.leave('log')
	},
}
</script>

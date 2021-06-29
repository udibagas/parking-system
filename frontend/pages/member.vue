<template>
	<el-card :body-style="{ padding: '0px' }">
		<el-page-header slot="header" @back="$emit('back')" content="MEMBER">
		</el-page-header>

		<el-tabs type="border-card">
			<el-tab-pane lazy label="Member">
				<ParkingMember @print="print" />
			</el-tab-pane>

			<el-tab-pane lazy label="Group Member">
				<GroupMember @print="print" />
			</el-tab-pane>

			<el-tab-pane lazy label="Pembayaran">
				<MemberRenewal @print="print" />
			</el-tab-pane>

			<el-tab-pane
				v-if="$auth.user.role == 1"
				lazy
				label="Laporan Pendapatan Harian"
			>
				<MembershipReportDaily @print="print" />
			</el-tab-pane>

			<el-tab-pane
				v-if="$auth.user.role == 1"
				lazy
				label="Summary Laporan Pendapatan"
			>
				<MembershipReport @print="print" />
			</el-tab-pane>
		</el-tabs>
	</el-card>
</template>

<script>
import { mapState } from 'vuex'
export default {
	data() {
		return {
			ws: null,
		}
	},

	computed: {
		...mapState(['pos']),
	},

	methods: {
		async connectPos() {
			await this.$store.dispatch('getPos')
			this.ws = new WebSocket(`ws://${this.pos.ip_address}:5678/`)

			this.ws.onerror = (event) => {
				this.$message({
					message: 'KONEKSI KE POS GAGAL',
					type: 'error',
				})
			}

			this.ws.onopen = (event) => {
				console.log('POS TEKNONEKSI')
			}

			this.ws.onmessage = (event) => {
				let data = JSON.parse(event.data)
				this.$message({
					message: data.message,
					type: data.status ? 'success' : 'error',
				})
			}
		},

		print(text) {
			this.ws.send(['print_report', text].join(';'))
		},
	},

	created() {
		this.connectPos()
	},

	destroyed() {
		this.ws.close()
	},
}
</script>

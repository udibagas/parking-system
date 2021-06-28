<template>
	<el-card :body-style="{ padding: '0px' }">
		<el-row slot="header">
			<el-col :span="8">
				<el-page-header
					@back="$emit('back')"
					content="LAPORAN"
				></el-page-header>
			</el-col>
			<el-col :span="16" style="text-align: right">
				<el-form inline>
					<el-form-item style="margin-bottom: 0">
						<el-date-picker
							style="margin-top: 5px"
							size="small"
							@change="requestData"
							v-model="dateRange"
							format="dd/MMM/yyyy"
							value-format="yyyy-MM-dd"
							type="daterange"
							range-separator="To"
							start-placeholder="Start date"
							end-placeholder="End date"
						></el-date-picker>
					</el-form-item>

					<el-form-item style="margin-bottom: 0">
						<el-dropdown
							size="small"
							split-button
							type="primary"
							@command="handlePrint"
						>
							PRINT LAPORAN
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item command="struk">STRUK</el-dropdown-item>
								<el-dropdown-item command="a4">A4</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>

		<el-tabs type="border-card">
			<el-tab-pane lazy label="RANGKUMAN">
				<el-row :gutter="10">
					<el-col :span="12">
						<!-- total tarif -->
						<el-card class="summary-container">
							<div slot="header">
								<span>Pendapatan</span>
							</div>
							<el-row v-for="(t, id) in income" :key="id">
								<el-col :span="12" class="col-label">{{
									t.vehicle_type
								}}</el-col>
								<el-col :span="12" class="col-value"
									>: Rp. {{ $decimal(t.total) }}</el-col
								>
							</el-row>
						</el-card>
					</el-col>
					<el-col :span="12">
						<!-- jumlah transaksi -->
						<el-card class="summary-container">
							<div slot="header">
								<span>Transaksi berdasarkan jenis kendaraan</span>
							</div>
							<el-row
								v-for="(t, id) in transaction.vehicle_type"
								:key="id"
								:gutter="10"
							>
								<el-col :span="12" class="col-label">{{ t.group }}</el-col>
								<el-col :span="12" class="col-value"
									>: {{ $decimal(t.total) }}</el-col
								>
							</el-row>
						</el-card>
					</el-col>
				</el-row>
				<br />
				<el-row :gutter="10">
					<el-col :span="12">
						<!-- jumlah transaksi berdasarkan membership -->
						<el-card class="summary-container">
							<div slot="header">
								<span>Transaksi berdasarkan membership</span>
							</div>
							<el-row
								v-for="(t, id) in transaction.is_member"
								:key="id"
								:gutter="10"
							>
								<el-col :span="12" class="col-label">{{ t.group }}</el-col>
								<el-col :span="12" class="col-value"
									>: {{ $decimal(t.total) }}</el-col
								>
							</el-row>
						</el-card>
					</el-col>
					<el-col :span="12">
						<!-- jumlah transaksi berdasarkan drive thru -->
						<el-card class="summary-container">
							<div slot="header">
								<span>Transaksi berdasarkan jenis</span>
							</div>
							<el-row
								v-for="(t, id) in transaction.drive_thru"
								:key="id"
								:gutter="10"
							>
								<el-col :span="12" class="col-label">{{ t.group }}</el-col>
								<el-col :span="12" class="col-value"
									>: {{ $decimal(t.total) }}</el-col
								>
							</el-row>
						</el-card>
					</el-col>
				</el-row>
			</el-tab-pane>
			<el-tab-pane lazy label="PENDAPATAN">
				<div
					style="height: calc(100vh - 300px); overflow: auto"
					v-html="report"
				></div>
			</el-tab-pane>
			<el-tab-pane lazy label="LOG USER">
				<UserLog :range="dateRange" />
			</el-tab-pane>
		</el-tabs>
	</el-card>
</template>

<script>
export default {
	data() {
		return {
			transaction: {
				drive_thru: [],
				vehicle_type: [],
				is_member: [],
			},
			income: [],
			dateRange: [
				this.$moment().format('YYYY-MM-01'),
				this.$moment().format('YYYY-MM-DD'),
			],
			report: null,
		}
	},

	methods: {
		handlePrint(command) {
			if (command == 'a4') {
				window.open(
					this.$axios.defaults.baseURL +
						'/api/report?action=print&dateRange[]=' +
						this.dateRange[0] +
						'&dateRange[]=' +
						this.dateRange[1],
					'_blank'
				)
			}

			if (command == 'struk') {
				const params = {
					action: 'print-struk',
					dateRange: this.dateRange,
				}

				this.$axios
					.$get('/api/report', { params })
					.then((r) => {
						this.$message({
							message: r.message,
							showClose: true,
							type: 'success',
						})
					})
					.catch((e) => {
						this.$message({
							message: e.response.data.message,
							showClose: true,
							type: 'error',
						})
					})
			}
		},

		getTransaction(group) {
			const params = { dateRange: this.dateRange, group }
			this.$axios.get('/api/getTransaction', { params }).then((r) => {
				this.transaction[group] = r.data.map((d) => {
					if (group == 'is_member') {
						d.group = d.is_member ? 'MEMBER' : 'NON-MEMBER'
					}

					if (group == 'drive_thru') {
						d.group = d.drive_thru ? 'DRIVE THRU' : 'REGULER'
					}

					if (group == 'vehicle_type') {
						d.group = d.vehicle_type
					}

					return d
				})

				let total = r.data
					.map((d) => d.total)
					.reduce((sum, total) => sum + parseInt(total), 0)
				this.transaction[group].push({ group: 'TOTAL', total })
			})
		},

		getIncome() {
			this.$axios
				.$get('/api/getIncome', { params: { dateRange: this.dateRange } })
				.then((r) => {
					this.income = r
					let total = r
						.map((d) => d.total)
						.reduce((sum, total) => sum + parseInt(total), 0)
					this.income.push({ vehicle_type: 'TOTAL', total })
				})
		},

		getReport() {
			this.$axios
				.$get('/api/report', { params: { dateRange: this.dateRange } })
				.then((r) => (this.report = r))
		},

		requestData() {
			this.getTransaction('vehicle_type')
			this.getTransaction('drive_thru')
			this.getTransaction('is_member')
			this.getIncome()
			this.getReport()
		},
	},
	mounted() {
		this.requestData()
	},
}
</script>

<style scoped>
.summary-container {
	height: 200px;
}

.summary-info {
	font-size: 30px;
}

.col-value,
.col-label {
	font-size: 16px;
}
</style>

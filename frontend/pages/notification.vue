<template>
	<el-card>
		<el-tabs>
			<el-tab-pane label="NOTIFIKASI">
				<el-form inline class="text-right" @submit.native.prevent>
					<el-form-item>
						<el-button
							size="small"
							@click="clearNotification"
							type="danger"
							icon="el-icon-delete"
							>HAPUS NOTIFIKASI</el-button
						>
					</el-form-item>
					<el-form-item>
						<el-date-picker
							size="small"
							@change="requestData"
							v-model="filters.dateRange"
							format="dd/MMM/yyyy"
							value-format="yyyy-MM-dd"
							type="daterange"
							range-separator="-"
							start-placeholder="Dari tgl"
							end-placeholder="Sampai tgl"
							style="margin-top: 5px; width: 250px"
						>
						</el-date-picker>
					</el-form-item>

					<el-form-item>
						<el-input
							size="small"
							v-model="keyword"
							placeholder="Cari"
							prefix-icon="el-icon-search"
							clearable
							@change="searchData"
						>
						</el-input>
					</el-form-item>
				</el-form>

				<el-table
					stripe
					:data="tableData.data"
					height="calc(100vh - 315px)"
					v-loading="loading"
					@sort-change="sortChange"
				>
					<el-table-column
						type="index"
						:index="tableData.from"
						label="#"
					></el-table-column>

					<el-table-column
						prop="created_at"
						label="Time"
						sortable="custom"
						width="150px"
					>
						<template slot-scope="scope">
							{{ $moment(scope.row.created_at).format('DD-MM-YYYY HH:mm:ss') }}
						</template>
					</el-table-column>
					<el-table-column label="Message" min-width="150px">
						<template slot-scope="scope">
							{{ JSON.parse(scope.row.data).message }}
						</template>
					</el-table-column>
					<el-table-column width="70px" align="center" header-align="center">
						<template slot="header">
							<el-button
								type="text"
								@click="refreshData"
								icon="el-icon-refresh"
							>
							</el-button>
						</template>
						<template slot-scope="scope">
							<el-button
								size="small"
								type="text"
								plain
								icon="el-icon-delete"
								@click="deleteData(scope.row.id)"
							></el-button>
						</template>
					</el-table-column>
				</el-table>

				<br />

				<el-pagination
					class="text-right"
					background
					@current-change="currentChange"
					@size-change="sizeChange"
					layout="total, sizes, prev, pager, next"
					:page-size="pageSize"
					:page-sizes="[10, 25, 50, 100]"
					:total="tableData.total"
				></el-pagination>
			</el-tab-pane>

			<el-tab-pane lazy label="SNAPSHOT">
				<NotificationSnapshot />
			</el-tab-pane>

			<el-tab-pane lazy label="ABSENSI OPERATOR">
				<AbsensiOperator :date="filters.dateRange" />
			</el-tab-pane>

			<el-tab-pane lazy label="LOG USER">
				<NotificationUserLog :range="filters.dateRange" />
			</el-tab-pane>

			<el-tab-pane lazy label="LOG GATE MASUK">
				<NotificationControllerLog url="/api/controller-log" />
			</el-tab-pane>

			<el-tab-pane lazy label="LOG GATE KELUAR">
				<NotificationControllerLog url="/api/uhf-log" />
			</el-tab-pane>
		</el-tabs>
	</el-card>
</template>

<script>
import crud from '@/mixins/crud'

export default {
	mixins: [crud],

	data() {
		return {
			url: '/api/notification',
		}
	},
	methods: {
		clearNotification() {
			this.$confirm('Anda yakin akan menghapus semua notifikasi?', 'Warning', {
				type: 'warning',
			})
				.then(() => {
					this.$axios.$delete(`${this.url}/clearNotification`).then((r) => {
						this.requestData()
						this.$message({
							message: r.message,
							type: 'success',
						})
					})
				})
				.catch(() => console.log(e))
		},
	},
}
</script>

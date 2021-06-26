<template>
	<div>
		<el-form inline class="text-right" @submit.native.prevent>
			<el-form-item>
				<el-button
					size="small"
					@click="clearLog"
					type="danger"
					icon="el-icon-delete"
					>HAPUS LOG</el-button
				>
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
			:data="tableData.data"
			stripe
			@row-dblclick="
				(row, column, event) => {
					snapshot = row.snapshot
					showSnapshot = true
				}
			"
			:default-sort="{ prop: sort, order: order }"
			v-loading="loading"
			@sort-change="sortChange"
		>
			<el-table-column
				prop="created_at"
				label="Tanggal"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>
			<el-table-column
				prop="user"
				label="User"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>
			<el-table-column
				prop="action"
				label="Aksi"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>
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
	</div>
</template>

<script>
import crud from '~/mixins/crud'

export default {
	mixins: [crud],
	props: ['range'],

	watch: {
		range(v) {
			this.requestData()
		},
	},

	data() {
		return {
			url: '/api/userLog',
		}
	},

	methods: {
		clearLog() {
			this.$confirm('Anda yakin akan menghapus semua log?', 'Peringatan', {
				type: 'warning',
			})
				.then(() => {
					this.$axios
						.$delete('/api/userLog')
						.then((r) => {
							this.requestData()
							this.$message({
								message: r.message,
								type: 'success',
								showClose: true,
							})
						})
						.catch((e) => {
							this.$message({
								message: e.response.data.message,
								type: 'error',
								showClose: true,
							})
						})
				})
				.catch(() => console.log(e))
		},
	},
}
</script>

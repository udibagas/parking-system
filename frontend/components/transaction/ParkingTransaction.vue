<template>
	<div>
		<el-form inline class="text-right" @submit.native.prevent>
			<el-form-item>
				<el-button
					size="small"
					type="primary"
					icon="el-icon-plus"
					@click="
						() => {
							formModel = {}
							formErrors = {}
							showForm = true
						}
					"
					>TRANSAKSI MANUAL</el-button
				>
			</el-form-item>
			<el-form-item>
				<el-date-picker
					style="margin-top: 5px"
					size="small"
					@change="requestData"
					v-model="filters.dateRange"
					format="dd-MMM-yyyy HH:mm:ss"
					value-format="yyyy-MM-dd HH:mm:ss"
					type="datetimerange"
					range-separator="-"
					start-placeholder="Dari"
					end-placeholder="Sampai"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item v-if="$auth.user.role == 1">
				<el-tooltip
					class="item"
					effect="dark"
					content="Set kendaraan sudah keluar untuk waktu terpilih"
					placement="bottom"
				>
					<el-button
						size="small"
						type="danger"
						icon="el-icon-finished"
						@click="setSudahKeluarSemua"
					></el-button>
				</el-tooltip>
			</el-form-item>
			<el-form-item>
				<el-input
					size="small"
					v-model="keyword"
					placeholder="Cari"
					prefix-icon="el-icon-search"
					:clearable="true"
					@change="searchData"
					style="width: 150px"
				>
				</el-input>
			</el-form-item>
		</el-form>

		<el-table
			:data="tableData.data"
			stripe
			@row-dblclick="
				(row, column, event) => {
					trx = row
					showTrxDetail = true
				}
			"
			@filter-change="filterChange"
			height="calc(100vh - 310px)"
			v-loading="loading"
			@sort-change="sortChange"
		>
			<el-table-column
				label="No. Tiket"
				sortable="custom"
				:filters="
					jenisKendaraanList.map((v) => ({ value: v.nama, text: v.nama }))
				"
				column-key="jenis_kendaraan"
				min-width="150"
				show-overflow-tooltip
			>
				<template slot-scope="{ row }">
					<strong>{{ row.nomor_barcode }}</strong
					><br />
					{{ row.jenis_kendaraan }}
					{{ row.plat_nomor ? `- ${row.plat_nomor}` : '' }}
				</template>
			</el-table-column>

			<el-table-column
				prop="time_in"
				label="Masuk"
				sortable="custom"
				show-overflow-tooltip
				min-width="140px"
				column-key="gate_in_id"
				:filters="gateInList.map((g) => ({ value: g.id, text: g.nama }))"
			>
				<template slot-scope="{ row }">
					{{ $moment(row.time_in).format('DD/MMM/YY HH:mm') }} <br />
					{{ row.gate_in.nama }}
				</template>
			</el-table-column>

			<el-table-column
				prop="time_out"
				label="Keluar"
				sortable="custom"
				show-overflow-tooltip
				min-width="140px"
				column-key="gate_out_id"
				:filters="gateOutList.map((g) => ({ value: g.id, text: g.nama }))"
			>
				<template slot-scope="{ row }">
					{{
						row.time_out ? $moment(row.time_out).format('DD/MMM/YY HH:mm') : ''
					}}
					<br />
					{{ row.gate_out ? row.gate_out.nama : '-' }}
				</template>
			</el-table-column>

			<el-table-column
				label="Durasi"
				show-overflow-tooltip
				prop="parking_transactions.tarif"
				sortable="custom"
				min-width="100px"
			>
				<template slot-scope="{ row }">
					{{ row.durasi }}
					<div v-if="$auth.user.role == 1" style="font-weight: bold">
						Rp. {{ $decimal(row.tarif) }}
					</div>
				</template>
			</el-table-column>

			<el-table-column
				v-if="$auth.user.role == 1"
				prop="denda"
				label="Denda"
				align="right"
				column-key="denda"
				:filters="[
					{ value: 'Y', text: 'YA' },
					{ value: 'T', text: 'TIDAK' },
				]"
				:filter-multiple="false"
				header-align="right"
				min-width="100px"
			>
				<template slot-scope="scope">
					Rp. {{ $decimal(scope.row.denda) }}
				</template>
			</el-table-column>

			<el-table-column
				label="Member"
				sortable="custom"
				show-overflow-tooltip
				min-width="120"
			>
				<template slot-scope="{ row }">
					<strong> {{ row.member ? row.member.nama : '' }} </strong> <br />
					{{ row.nomor_kartu }}
				</template>
			</el-table-column>

			<el-table-column
				prop="operator"
				label="Operator"
				show-overflow-tooltip
				min-width="90"
			></el-table-column>

			<el-table-column
				label="Shift"
				prop="shift.nama"
				column-key="shift_id"
				min-width="80"
				:filters="shiftList.map((s) => ({ value: s.id, text: s.nama }))"
			>
			</el-table-column>

			<el-table-column
				label="Edit"
				align="center"
				header-align="center"
				column-key="edit"
				:filters="[
					{ value: 'Y', text: 'YA' },
					{ value: 'T', text: 'TIDAK' },
				]"
				:filter-multiple="false"
				min-width="100px"
			>
				<template slot-scope="{ row }">
					{{ row.edit ? 'YA' : 'TIDAK' }} <br />
					{{ row.edit_by }}
				</template>
			</el-table-column>

			<el-table-column
				label="Manual"
				align="center"
				header-align="center"
				column-key="manual"
				:filters="[
					{ value: 'Y', text: 'YA' },
					{ value: 'T', text: 'TIDAK' },
				]"
				:filter-multiple="false"
				min-width="100px"
			>
				<template slot-scope="scope">
					{{ scope.row.manual ? 'YA' : 'TIDAK' }}
				</template>
			</el-table-column>

			<el-table-column
				fixed="right"
				width="40px"
				align="center"
				header-align="center"
			>
				<template slot="header">
					<el-button type="text" @click="refreshData" icon="el-icon-refresh">
					</el-button>
				</template>
				<template slot-scope="scope">
					<el-dropdown>
						<span class="el-dropdown-link">
							<i class="el-icon-more"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item
								icon="el-icon-zoom-in"
								@click.native.prevent="
									() => {
										trx = scope.row
										showTrxDetail = true
									}
								"
								>Lihat Detail</el-dropdown-item
							>
							<el-dropdown-item
								icon="el-icon-check"
								v-if="!scope.row.time_out && $auth.user.role == 1"
								@click.native.prevent="setSudahKeluar(scope.row.id)"
								>Set Sudah Keluar</el-dropdown-item
							>

							<el-dropdown-item
								icon="el-icon-edit"
								v-if="
									!scope.row.is_member && !scope.row.edit && !scope.row.manual
								"
								@click.native.prevent="
									() => {
										formModel = { ...scope.row }
										formErrors = {}
										showForm = true
									}
								"
							>
								Edit
							</el-dropdown-item>

							<el-dropdown-item
								icon="el-icon-printer"
								v-if="!scope.row.is_member && !!scope.row.time_out"
								@click.native.prevent="printTicket(scope.row.id)"
								>Print Tiket Keluar</el-dropdown-item
							>
						</el-dropdown-menu>
					</el-dropdown>
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

		<TransactionDetailTransaksi
			v-if="trx"
			:trx="trx"
			:show="showTrxDetail"
			@close="showTrxDetail = false"
		/>

		<TransactionFormTransaksiManual
			v-if="showForm"
			:show="showForm"
			:model="formModel"
			@close="showForm = false"
			@reload="requestData"
		/>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import crud from '@/mixins/crud'

export default {
	mixins: [crud],
	computed: {
		...mapState([
			'jenisKendaraanList',
			'gateInList',
			'gateOutList',
			'user',
			'shiftList',
		]),
	},

	created() {
		this.$store.dispatch('getShiftList')

		// this.filters.dateRange = [
		// 	this.$moment().format('YYYY-MM-DD 00:00:00'),
		// 	this.$moment().format('YYYY-MM-DD HH:mm:ss'),
		// ]
	},

	data() {
		return {
			url: '/api/parkingTransaction',
			trx: null,
			showTrxDetail: false,
			date: this.$moment().format('YYYY-MM-DD'),
			formModel: {},
			formErrors: {},
			showForm: false,
			filters: { dateRange: null },
		}
	},

	methods: {
		setSudahKeluar(id) {
			this.$confirm('Anda yakin?', 'Confirm', { type: 'warning' })
				.then(() => {
					this.$axios
						.$put(`/api/parkingTransaction/setSudahKeluar/${id}`)
						.then((r) => {
							this.$message({
								message: r.message,
								type: 'success',
							})
							this.requestData()
						})
				})
				.catch(() => console.log(e))
		},

		setSudahKeluarSemua() {
			this.$confirm('Anda yakin?', 'Confirm', { type: 'warning' })
				.then(() => {
					this.$axios
						.$put('/api/parkingTransaction/setSudahKeluarSemua', {
							dateRange: this.filters.dateRange,
						})
						.then((r) => {
							this.$message({
								message: r.message,
								type: 'success',
							})
							this.requestData()
						})
				})
				.catch((e) => console.log(e))
		},

		printTicket(id) {
			this.$axios
				.post(`/api/parkingTransaction/printTicketOut/${id}`)
				.then((r) => {
					this.$message({
						message: r.message,
						type: 'success',
					})
				})
		},
	},
}
</script>

<template>
	<div>
		<el-form
			inline
			class="text-right"
			@submit.native.prevent="
				() => {
					return
				}
			"
		>
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
					size="small"
					@change="requestData"
					v-model="dateRange"
					format="dd-MMM-yyyy HH:mm:ss"
					value-format="yyyy-MM-dd HH:mm:ss"
					type="datetimerange"
					range-separator="-"
					start-placeholder="Start date"
					end-placeholder="End date"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item v-if="$auth.user.role == 1">
				<el-button
					size="small"
					type="primary"
					icon="el-icon-finished"
					@click="setSudahKeluarSemua"
					>SET SUDAH KELUAR SEMUA</el-button
				>
			</el-form-item>
			<el-form-item style="margin-right: 0">
				<el-input
					size="small"
					v-model="keyword"
					placeholder="Cari"
					prefix-icon="el-icon-search"
					:clearable="true"
					@change="
						(v) => {
							keyword = v
							requestData()
						}
					"
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
			@filter-change="
				(f) => {
					let c = Object.keys(f)[0]
					filters[c] = Object.values(f[c])
					page = 1
					requestData()
				}
			"
			:default-sort="{ prop: sort, order: order }"
			height="calc(100vh - 260px)"
			v-loading="loading"
			@sort-change="sortChange"
		>
			<el-table-column
				prop="nomor_barcode"
				label="No. Tiket"
				sortable="custom"
				show-overflow-tooltip
				min-width="100px"
			></el-table-column>

			<el-table-column
				label="Shift"
				prop="shift.nama"
				column-key="shift_id"
				min-width="80px"
				:filters="
					shiftList.map((s) => {
						return { value: s.id, text: s.nama }
					})
				"
			>
			</el-table-column>

			<el-table-column
				prop="jenis_kendaraan"
				label="Jenis Kendaraan"
				sortable="custom"
				show-overflow-tooltip
				:filters="
					jenisKendaraanList.map((v) => {
						return { value: v.nama, text: v.nama }
					})
				"
				column-key="jenis_kendaraan"
				min-width="160px"
			>
			</el-table-column>

			<el-table-column
				prop="time_in"
				label="Waktu Masuk"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>
			<el-table-column
				prop="time_out"
				label="Waktu Keluar"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>
			<el-table-column
				prop="durasi"
				label="Durasi"
				show-overflow-tooltip
				min-width="100px"
			></el-table-column>

			<el-table-column
				prop="gate_in.nama"
				label="Gate Masuk"
				show-overflow-tooltip
				min-width="150px"
				column-key="gate_in_id"
				:filters="
					gateInList.map((g) => {
						return { value: g.id, text: g.nama }
					})
				"
			>
			</el-table-column>

			<el-table-column
				prop="gate_out.nama"
				label="Gate Keluar"
				show-overflow-tooltip
				min-width="150px"
				column-key="gate_out_id"
				:filters="
					gateOutList.map((g) => {
						return { value: g.id, text: g.nama }
					})
				"
			>
			</el-table-column>

			<el-table-column
				v-if="$auth.user.role == 1"
				prop="tarif"
				label="Tarif"
				sortable="custom"
				align="right"
				header-align="right"
				min-width="100px"
			>
				<template slot-scope="scope">
					Rp. {{ $decimal(scope.row.tarif) }}
				</template>
			</el-table-column>

			<el-table-column
				v-if="$auth.user.role == 1"
				prop="denda"
				label="Denda"
				sortable="custom"
				align="right"
				column-key="denda"
				:filters="[
					{ value: 'Y', text: 'YA' },
					{ value: 'T', text: 'TIDAK' },
				]"
				:filter-multiple="false"
				header-align="right"
				min-width="120px"
			>
				<template slot-scope="scope">
					Rp. {{ $decimal(scope.row.denda) }}
				</template>
			</el-table-column>

			<el-table-column
				prop="plat_nomor"
				label="Plat Nomor"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>
			<!-- <el-table-column prop="is_member" label="Member" sortable="custom" show-overflow-tooltip min-width="120px">
                <template slot-scope="scope">
                    {{scope.row.is_member ? 'Ya' : 'Tidak'}}
                </template>
            </el-table-column> -->
			<el-table-column
				prop="member"
				label="Nama Member"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>
			<el-table-column
				prop="nomor_kartu"
				label="Nomor Kartu"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>

			<el-table-column
				prop="operator"
				label="Operator"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>

			<el-table-column
				label="Edit"
				sortable="custom"
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
				<template slot-scope="scope">
					{{ scope.row.edit ? 'YA' : 'TIDAK' }}
				</template>
			</el-table-column>

			<el-table-column
				label="Manual"
				sortable="custom"
				align="center"
				header-align="center"
				column-key="manual"
				:filters="[
					{ value: 'Y', text: 'YA' },
					{ value: 'T', text: 'TIDAK' },
				]"
				:filter-multiple="false"
				min-width="120px"
			>
				<template slot-scope="scope">
					{{ scope.row.manual ? 'YA' : 'TIDAK' }}
				</template>
			</el-table-column>

			<el-table-column
				prop="edit_by"
				label="Diedit Oleh"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>

			<el-table-column
				fixed="right"
				width="40px"
				align="center"
				header-align="center"
			>
				<template slot="header">
					<el-button
						type="text"
						@click="
							() => {
								page = 1
								keyword = ''
								requestData()
							}
						"
						icon="el-icon-refresh"
					>
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
										formModel = scope.row
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
								>Print Ticket Keluar</el-dropdown-item
							>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>

		<el-pagination
			class="mt-3"
			background
			@current-change="
				(p) => {
					page = p
					requestData()
				}
			"
			@size-change="
				(s) => {
					pageSize = s
					requestData()
				}
			"
			layout="prev, pager, next, sizes, total"
			:page-size="pageSize"
			:page-sizes="[10, 25, 50, 100]"
			:total="tableData.total"
		>
		</el-pagination>

		<DetailTransaksi
			v-if="trx"
			:trx="trx"
			:show="showTrxDetail"
			@close="showTrxDetail = false"
		/>

		<FormTransaksiManual
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

	data() {
		return {
			url: '/api/parkingTransaction',
			sort: 'updated_at',
			order: 'descending',
			trx: null,
			showTrxDetail: false,
			date: this.$moment().format('YYYY-MM-DD'),
			dateRange: [
				this.$moment().format('YYYY-MM-DD 00:00:00'),
				this.$moment().format('YYYY-MM-DD HH:mm:ss'),
			],
			formModel: {},
			formErrors: {},
			showForm: false,
		}
	},

	methods: {
		setSudahKeluar(id) {
			this.$confirm('Anda yakin?', 'Confirm', { type: 'warning' })
				.then(() => {
					axios
						.put('parkingTransaction/setSudahKeluar/' + id)
						.then((r) => {
							this.$message({
								message: r.data.message,
								type: 'success',
							})
							this.requestData()
						})
						.catch((e) => {
							this.$message({
								message: r.response.data.message,
								type: 'error',
							})
						})
				})
				.catch(() => console.log(e))
		},

		setSudahKeluarSemua() {
			this.$confirm('Anda yakin?', 'Confirm', { type: 'warning' })
				.then(() => {
					axios
						.put('parkingTransaction/setSudahKeluarSemua', {
							dateRange: this.dateRange,
						})
						.then((r) => {
							this.$message({
								message: r.data.message,
								type: 'success',
							})
							this.requestData()
						})
						.catch((e) => {
							this.$message({
								message: e.response.data.message,
								type: 'error',
							})
						})
				})
				.catch(() => console.log(e))
		},

		printTicket(id) {
			axios
				.post(`/parkingTransaction/printTicketOut/${id}`)
				.then((r) => {
					this.$message({
						message: r.data.message,
						type: 'success',
					})
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: 'error',
					})
				})
		},
	},

	mounted() {
		this.requestData()
		this.$store.commit('getGateInList')
		this.$store.commit('getGateOutList')
		this.$store.commit('getJenisKendaraanList')
		this.$store.commit('getShiftList')
	},
}
</script>

<style scoped>
.block {
	background-color: #eee;
	height: calc(50vh - 120px);
}

.td-label {
	width: 200px;
	font-weight: bold;
	background-color: #ddd;
	padding: 5px 10px;
}

.td-value {
	background-color: #eee;
	padding: 5px 10px;
}

.col-value,
.col-label {
	font-size: 16px;
	color: #fff;
}

.summary-container {
	height: 150px;
}

.summary-info {
	font-size: 30px;
}

.text-center {
	text-align: center;
}
</style>

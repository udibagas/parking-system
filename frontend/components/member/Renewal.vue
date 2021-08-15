<template>
	<div>
		<el-form inline class="text-right" @submit.native.prevent>
			<el-form-item>
				<el-button
					icon="el-icon-plus"
					size="small"
					@click="openForm({})"
					type="primary"
				>
					INPUT PEMBAYARAN KEANGGOTAAN
				</el-button>
			</el-form-item>

			<el-form-item>
				<el-date-picker
					style="margin-top: 5px; width: 250px"
					size="small"
					@change="requestData"
					v-model="filters.dateRange"
					format="dd/MMM/yyyy"
					value-format="yyyy-MM-dd"
					type="daterange"
					range-separator="-"
					start-placeholder="Dari tgl"
					end-placeholder="Sampai tgl"
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
					style="width: 150px"
				>
				</el-input>
			</el-form-item>
		</el-form>

		<el-table
			:data="tableData.data"
			stripe
			:default-sort="{ prop: sort, order: order }"
			height="calc(100vh - 310px)"
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
				label="Tanggal Trx"
				sortable="custom"
				min-width="180"
			>
				<template slot-scope="scope">
					{{ $moment(scope.row.created_at).format('DD-MMM-YYYY HH:mm:ss') }}
				</template>
			</el-table-column>

			<el-table-column
				prop="nama_member"
				label="Nama"
				sortable="custom"
				show-overflow-tooltip
				min-width="120"
			>
			</el-table-column>

			<el-table-column
				prop="nomor_kartu"
				label="Nomor Kartu"
				sortable="custom"
				min-width="130"
			></el-table-column>

			<el-table-column
				prop="dari_tanggal"
				label="Dari Tanggal"
				width="150px"
				sortable="custom"
				align="center"
				header-align="center"
			>
				<template slot-scope="scope">
					{{ $moment(scope.row.dari_tanggal).format('DD-MMM-YYYY') }}
				</template>
			</el-table-column>

			<el-table-column
				prop="sampai_tanggal"
				label="Sampai Tanggal"
				width="160px"
				sortable="custom"
				align="center"
				header-align="center"
			>
				<template slot-scope="scope">
					{{ $moment(scope.row.sampai_tanggal).format('DD-MMM-YYYY') }}
				</template>
			</el-table-column>

			<el-table-column
				prop="jumlah"
				label="Jumlah"
				sortable="custom"
				align="right"
				header-align="right"
				min-width="120"
			>
				<template slot-scope="scope">
					Rp. {{ $decimal(scope.row.jumlah) }}
				</template>
			</el-table-column>

			<el-table-column
				prop="operator"
				label="Operator"
				sortable="custom"
				min-width="120"
			></el-table-column>

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
								icon="el-icon-printer"
								@click.native.prevent="
									() => {
										selectedData = scope.row
										showPrintDialog = true
									}
								"
								>Print Slip</el-dropdown-item
							>
							<el-dropdown-item
								v-if="$auth.user.role == 1"
								icon="el-icon-edit-outline"
								@click.native.prevent="openForm(scope.row)"
								>Edit</el-dropdown-item
							>
							<el-dropdown-item
								v-if="$auth.user.role == 1"
								icon="el-icon-delete"
								@click.native.prevent="deleteData(scope.row.id)"
								>Hapus</el-dropdown-item
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

		<el-dialog
			:visible.sync="showForm"
			:title="
				!!formModel.id
					? 'EDIT PEMBAYARAN KEANGGOTAAN'
					: 'INPUT PEMBAYARAN KEANGGOTAAN'
			"
			v-loading="loading"
			:close-on-click-modal="false"
		>
			<el-form label-width="180px" label-position="left">
				<el-form-item
					label="Member"
					:class="formErrors.member_id ? 'is-error' : ''"
				>
					<el-select
						filterable
						default-first-option
						clearable
						v-model="formModel.member_id"
						placeholder="Member"
						style="width: 100%"
					>
						<el-option
							v-for="(m, i) in memberList.filter((m) => m.berbayar)"
							:value="m.id"
							:label="m.nomor_kartu + ' - ' + m.nama"
							:key="i"
						></el-option>
					</el-select>
					<div class="el-form-item__error" v-if="formErrors.member_id">
						{{ formErrors.member_id[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Siklus Pembayaran"
					:class="formErrors.siklus_pembayaran ? 'is-error' : ''"
				>
					<el-input
						type="number"
						v-model="formModel.siklus_pembayaran"
						style="width: 30%"
					></el-input>
					<el-select
						placeholder="Pilih"
						v-model="formModel.siklus_pembayaran_unit"
						style="width: 66%; float: right; clear: right"
					>
						<el-option
							v-for="(s, i) in $store.state.siklus"
							:value="s.value"
							:label="s.label"
							:key="i"
						></el-option>
					</el-select>
					<div class="el-form-item__error" v-if="formErrors.siklus_pembayaran">
						{{ formErrors.siklus_pembayaran[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Dari Tanggal"
					:class="formErrors.dari_tanggal ? 'is-error' : ''"
				>
					<el-date-picker
						format="dd-MMM-yyyy"
						value-format="yyyy-MM-dd"
						placeholder="Dari Tanggal"
						v-model="formModel.dari_tanggal"
						style="width: 100%"
					></el-date-picker>
					<div class="el-form-item__error" v-if="formErrors.dari_tanggal">
						{{ formErrors.dari_tanggal[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Sampai Tanggal"
					:class="formErrors.sampai_tanggal ? 'is-error' : ''"
				>
					<el-date-picker
						disabled
						format="dd-MMM-yyyy"
						value-format="yyyy-MM-dd"
						placeholder="Sampai Tanggal"
						v-model="sampai_tanggal"
						style="width: 100%"
					></el-date-picker>
					<div class="el-form-item__error" v-if="formErrors.sampai_tanggal">
						{{ formErrors.sampai_tanggal[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Jumlah"
					:class="formErrors.jumlah ? 'is-error' : ''"
				>
					<el-input
						type="number"
						placeholder="Jumlah"
						v-model="formModel.jumlah"
					></el-input>
					<div class="el-form-item__error" v-if="formErrors.jumlah">
						{{ formErrors.jumlah[0] }}
					</div>
				</el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
				<el-button icon="el-icon-error" @click="closeForm"> BATAL </el-button>
				<el-button icon="el-icon-success" type="primary" @click="submit">
					SIMPAN
				</el-button>
			</span>
		</el-dialog>

		<PrintDialog
			:show="showPrintDialog"
			@print="(printer_id) => printSlip(printer_id)"
			@close="showPrintDialog = false"
		/>
	</div>
</template>

<script>
import crud from '@/mixins/crud'
import { mapState } from 'vuex'

export default {
	mixins: [crud],

	data() {
		return {
			url: '/api/memberRenewal',
			sort: 'created_at',
			order: 'descending',
			showPrintDialog: false,
			selectedData: {},
		}
	},

	computed: {
		sampai_tanggal() {
			try {
				return this.$moment(this.formModel.dari_tanggal, 'YYYY-MM-DD')
					.add(
						this.formModel.siklus_pembayaran,
						this.formModel.siklus_pembayaran_unit
					)
					.format('YYYY-MM-DD')
			} catch (error) {
				return ''
			}
		},
		...mapState(['memberList']),
	},

	methods: {
		submit() {
			this.formModel.sampai_tanggal = this.sampai_tanggal
			this.save()
		},

		printSlip(printer_id) {
			this.$axios
				.$post(`${this.url}/printSlip/${this.selectedData.id}`, {
					printer_id,
				})
				.then((r) => {
					this.$message({
						message: r.message,
						type: 'success',
					})
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: 'error',
					})
				})
				.finally(() => {
					this.showPrintDialog = false
				})
		},
	},
}
</script>

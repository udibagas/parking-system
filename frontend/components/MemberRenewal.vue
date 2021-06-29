<template>
	<div>
		<el-form inline class="text-right" @submit.native.prevent>
			<el-form-item>
				<el-button size="small" @click="openForm({})" type="primary"
					><i class="el-icon-plus"></i> INPUT PEMBAYARAN KEANGGOTAAN</el-button
				>
			</el-form-item>

			<el-form-item>
				<el-date-picker
					style="margin-top: 5px"
					size="small"
					@change="requestData"
					v-model="filters.dateRange"
					format="dd/MMM/yyyy"
					value-format="yyyy-MM-dd"
					type="daterange"
					range-separator="-"
					start-placeholder="Dari tanggal"
					end-placeholder="Sampai tanggal"
				>
				</el-date-picker>
			</el-form-item>

			<el-form-item>
				<el-input
					size="small"
					v-model="keyword"
					placeholder="Search"
					prefix-icon="el-icon-search"
					clearable
					@change="searchData"
				>
				</el-input>
			</el-form-item>
		</el-form>

		<el-table
			height="calc(100vh - 350px)"
			:data="tableData.data"
			stripe
			:default-sort="{ prop: sort, order: order }"
			v-loading="loading"
			@sort-change="sortChange"
		>
			<el-table-column
				type="index"
				label="#"
				:index="tableData.from"
			></el-table-column>

			<el-table-column prop="created_at" label="Tanggal Trx" sortable="custom">
				<template slot-scope="scope">
					{{ $moment(scope.row.created_at).format('DD-MMM-YYYY') }}
				</template>
			</el-table-column>

			<el-table-column
				prop="member_name"
				label="Nama"
				sortable="custom"
				show-overflow-tooltip
			>
			</el-table-column>
			<el-table-column
				prop="card_number"
				label="Nomor Kartu"
				sortable="custom"
				width="150"
			></el-table-column>
			<el-table-column
				prop="from_date"
				label="Dari Tanggal"
				width="150px"
				sortable="custom"
				align="center"
				header-align="center"
			>
				<template slot-scope="scope">
					{{ $moment(scope.row.from_date).format('DD-MMM-YYYY') }}
				</template>
			</el-table-column>
			<el-table-column
				prop="to_date"
				label="Sampai Tanggal"
				width="160px"
				sortable="custom"
				align="center"
				header-align="center"
			>
				<template slot-scope="scope">
					{{ $moment(scope.row.to_date).format('DD-MMM-YYYY') }}
				</template>
			</el-table-column>
			<el-table-column
				prop="amount"
				label="Jumlah"
				sortable="custom"
				align="right"
				header-align="right"
			>
				<template slot-scope="scope">
					Rp. {{ $decimal(scope.row.amount) }}
				</template>
			</el-table-column>
			<el-table-column
				prop="operator"
				label="Operator"
				sortable="custom"
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
								@click.native.prevent="printSlip(scope.row.id)"
								>Print Slip</el-dropdown-item
							>
							<el-dropdown-item
								icon="el-icon-edit-outline"
								@click.native.prevent="openForm(scope.row)"
								>Edit</el-dropdown-item
							>
							<el-dropdown-item
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
		>
		</el-pagination>

		<el-dialog
			:visible.sync="showForm"
			:title="
				!!formModel.id
					? 'EDIT PEMBAYARAN KEANGGOTAAN'
					: 'INPUT PEMBAYARAN KEANGGOTAAN'
			"
			width="500px"
			v-loading="loading"
			:close-on-click-modal="false"
		>
			<el-alert
				type="error"
				title="ERROR"
				:description="error.message"
				v-show="error.message"
				style="margin-bottom: 15px"
			>
			</el-alert>

			<el-form label-width="180px" label-position="left">
				<el-form-item
					label="Member"
					:class="formErrors.parking_member_id ? 'is-error' : ''"
				>
					<el-select
						filterable
						default-first-option
						clearable
						v-model="formModel.parking_member_id"
						placeholder="Member"
						style="width: 100%"
					>
						<el-option
							v-for="(m, i) in $store.state.memberList.filter((m) => m.paid)"
							:value="m.id"
							:label="m.card_number + ' - ' + m.name"
							:key="i"
						></el-option>
					</el-select>
					<div class="el-form-item__error" v-if="formErrors.parking_member_id">
						{{ formErrors.parking_member_id[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Siklus Pembayaran"
					:class="formErrors.billing_cycle ? 'is-error' : ''"
				>
					<el-input
						type="number"
						v-model="formModel.billing_cycle"
						style="width: 30%"
					></el-input>
					<el-select
						placeholder="Pilih"
						v-model="formModel.billing_cycle_unit"
						style="width: 66%; float: right; clear: right"
					>
						<el-option
							v-for="(s, i) in $store.state.siklus"
							:value="s.value"
							:label="s.label"
							:key="i"
						></el-option>
					</el-select>
					<div class="el-form-item__error" v-if="formErrors.billing_cycle">
						{{ formErrors.billing_cycle[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Dari Tanggal"
					:class="formErrors.from_date ? 'is-error' : ''"
				>
					<el-date-picker
						format="dd-MMM-yyyy"
						value-format="yyyy-MM-dd"
						placeholder="Dari Tanggal"
						v-model="formModel.from_date"
						style="width: 100%"
					></el-date-picker>
					<div class="el-form-item__error" v-if="formErrors.from_date">
						{{ formErrors.from_date[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Sampai Tanggal"
					:class="formErrors.to_date ? 'is-error' : ''"
				>
					<el-date-picker
						disabled
						format="dd-MMM-yyyy"
						value-format="yyyy-MM-dd"
						placeholder="Sampai Tanggal"
						v-model="to_date"
						style="width: 100%"
					></el-date-picker>
					<div class="el-form-item__error" v-if="formErrors.to_date">
						{{ formErrors.to_date[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Jumlah"
					:class="formErrors.amount ? 'is-error' : ''"
				>
					<el-input
						type="number"
						placeholder="Jumlah"
						v-model="formModel.amount"
					></el-input>
					<div class="el-form-item__error" v-if="formErrors.amount">
						{{ formErrors.amount[0] }}
					</div>
				</el-form-item>
			</el-form>
			<span slot="footer">
				<el-button icon="el-icon-error" @click="showForm = false">
					BATAL
				</el-button>
				<el-button icon="el-icon-success" type="primary" @click="submit">
					SIMPAN
				</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import crud from '~/mixins/crud'

export default {
	mixins: [crud],

	data() {
		return {
			url: '/api/memberRenewal',
			sort: 'created_at',
			order: 'descending',
			loading: false,
			ws: null,
		}
	},

	computed: {
		to_date() {
			try {
				return this.$moment(this.formModel.from_date, 'YYYY-MM-DD')
					.add(this.formModel.billing_cycle, this.formModel.billing_cycle_unit)
					.format('YYYY-MM-DD')
			} catch (error) {
				return ''
			}
		},
		...mapState(['pos']),
	},

	methods: {
		submit() {
			this.formModel.to_date = this.to_date
			this.save()
		},

		printSlip(id) {
			this.$axios
				.$post(`/api/memberRenewal/printSlip/${id}`)
				.then((r) => {
					this.$emit('print', r)
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: 'error',
						showClose: true,
					})
				})
		},
	},
}
</script>

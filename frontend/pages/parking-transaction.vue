<template>
	<el-card :body-style="{ padding: '0 0 15px 0' }">
		<el-row slot="header">
			<el-col :span="6">
				<el-page-header
					@back="$emit('back')"
					content="TRANSAKSI"
				></el-page-header>
			</el-col>
			<el-col :span="18">
				<el-form inline class="text-right" @submit.native.prevent>
					<el-form-item style="margin-bottom: 0">
						<el-date-picker
							style="margin-top: 4px"
							size="small"
							@change="requestData"
							v-model="dateRange"
							format="dd-MMM-yyyy HH:mm:ss"
							value-format="yyyy-MM-dd HH:mm:ss"
							type="datetimerange"
							range-separator="-"
							start-placeholder="Start date"
							end-placeholder="End date"
						></el-date-picker>
					</el-form-item>
					<el-form-item style="margin-bottom: 0">
						<el-input
							size="small"
							v-model="keyword"
							placeholder="Cari"
							prefix-icon="el-icon-search"
							:clearable="true"
							@change="searchData"
						></el-input>
					</el-form-item>
					<el-form-item style="margin-bottom: 0">
						<el-button
							icon="el-icon-refresh"
							type="primary"
							size="small"
							@click="refreshData"
						></el-button>
					</el-form-item>
				</el-form>
			</el-col>
		</el-row>

		<el-table
			height="calc(100vh - 245px)"
			:data="tableData.data"
			stripe
			@row-dblclick="
				(row, column, event) => {
					trx = row
					showTrxDetail = true
				}
			"
			@filter-change="filterChange"
			:default-sort="{ prop: sort, order: order }"
			v-loading="loading"
			@sort-change="sortChange"
		>
			<el-table-column type="index" label="#"></el-table-column>
			<el-table-column label="Pos" prop="pos" min-width="120"></el-table-column>
			<el-table-column
				prop="barcode_number"
				label="No. Tiket"
				sortable="custom"
				show-overflow-tooltip
				min-width="120px"
			></el-table-column>

			<el-table-column
				prop="vehicle_type"
				label="Jns Kendaraan"
				sortable="custom"
				show-overflow-tooltip
				:filters="vehicleTypeList.map((v) => ({ value: v.name, text: v.name }))"
				column-key="vehicle_type"
				min-width="170px"
			></el-table-column>

			<el-table-column
				prop="plate_number"
				label="Plat Nomor"
				sortable="custom"
				show-overflow-tooltip
				min-width="120px"
			></el-table-column>

			<el-table-column
				prop="drive_thru"
				label="Drive Thru"
				min-width="120px"
				align="center"
				header-align="center"
				column-key="drive_thru"
				:filters="[
					{ text: 'TIDAK', value: 0 },
					{ text: 'YA', value: 1 },
				]"
			>
				<template slot-scope="scope">{{
					scope.row.drive_thru ? 'Ya' : 'Tidak'
				}}</template>
			</el-table-column>

			<el-table-column
				v-if="$auth.user.role == 1"
				prop="fare"
				label="Tarif"
				sortable="custom"
				align="right"
				header-align="right"
				min-width="120px"
			>
				<template slot-scope="scope"
					>Rp. {{ $decimal(scope.row.fare) }}</template
				>
			</el-table-column>

			<el-table-column
				prop="member"
				label="Nama Member"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>
			<el-table-column
				prop="card_number"
				label="Nomor Kartu"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>

			<el-table-column
				prop="time_in"
				label="Waktu Masuk"
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
			center
			top="60px"
			width="70%"
			v-if="trx"
			:visible.sync="showTrxDetail"
			:title="'DETAIL TRANSAKSI ' + trx.barcode_number"
		>
			<table style="width: 100%">
				<tbody>
					<tr>
						<td class="td-label">Nomor Barcode</td>
						<td class="td-value">{{ trx.barcode_number }}</td>
					</tr>
					<tr>
						<td class="td-label">Pos</td>
						<td class="td-value">{{ trx.pos }}</td>
					</tr>
					<tr>
						<td class="td-label">Jenis Kendaraan</td>
						<td class="td-value">{{ trx.vehicle_type }}</td>
					</tr>
					<tr>
						<td class="td-label">Plat Nomor</td>
						<td class="td-value">{{ trx.plate_number }}</td>
					</tr>
					<tr>
						<td class="td-label">Member</td>
						<td class="td-value">{{ trx.is_member ? 'Ya' : 'Tidak' }}</td>
					</tr>
					<tr>
						<td class="td-label">Drive Thru</td>
						<td class="td-value">{{ trx.drive_thru ? 'Ya' : 'Tidak' }}</td>
					</tr>
					<tr>
						<td class="td-label">Nomor Kartu</td>
						<td class="td-value">{{ trx.card_number }}</td>
					</tr>
					<tr>
						<td class="td-label">Waktu Masuk</td>
						<td class="td-value">{{ trx.time_in }}</td>
					</tr>
					<tr v-if="$auth.user.role == 1">
						<td class="td-label">Tarif</td>
						<td class="td-value">Rp {{ $decimal(trx.fare) }}</td>
					</tr>
					<tr>
						<td class="td-label">Operator</td>
						<td class="td-value">{{ trx.operator }}</td>
					</tr>
				</tbody>
			</table>

			<br />

			<el-image
				:src="trx.snapshot_url"
				style="width: 100%; height: 100%"
				fit="cover"
			>
				<div slot="error" class="el-image__error">
					<i class="el-icon-picture-outline"></i>
				</div>
			</el-image>
		</el-dialog>
	</el-card>
</template>

<script>
import { mapState } from 'vuex'
import crud from '~/mixins/crud'

export default {
	mixins: [crud],

	computed: {
		...mapState(['vehicleTypeList']),
	},

	data() {
		return {
			url: '/api/parkingTransaction',
			sort: 'updated_at',
			order: 'descending',
			trx: null,
			showTrxDetail: false,
			dateRange: [
				this.$moment().format('YYYY-MM-DD 00:00:00'),
				this.$moment().format('YYYY-MM-DD HH:mm:ss'),
			],
		}
	},
}
</script>

<style scoped>
.block {
	background-color: #eee;
	height: calc(100vh - 120px);
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

<template>
	<div>
		<el-form inline class="text-right" @submit.native.prevent>
			<el-form-item v-if="$auth.user.role == 1">
				<el-button
					size="small"
					@click="openForm({ vehicles: [], register_date: now, fare: 0 })"
					type="primary"
					icon="el-icon-plus"
					>TAMBAH MEMBER</el-button
				>
			</el-form-item>
			<el-form-item>
				<el-input
					size="small"
					v-model="keyword"
					placeholder="Cari"
					prefix-icon="el-icon-search"
					:clearable="true"
					@change="searchData"
				></el-input>
			</el-form-item>
			<el-form-item>
				<el-button-group>
					<el-button
						icon="el-icon-download"
						size="small"
						type="primary"
						@click="download"
					></el-button>
					<el-button
						icon="el-icon-printer"
						size="small"
						type="primary"
						@click="print"
					></el-button>
				</el-button-group>
			</el-form-item>
		</el-form>

		<el-table
			height="calc(100vh - 350px)"
			:data="tableData.data"
			stripe
			@row-dblclick="
				(row, column, event) => {
					selectedData = row
					showDetail = true
				}
			"
			:default-sort="{ prop: sort, order: order }"
			@filter-change="filterChange"
			v-loading="loading"
			@sort-change="sortChange"
		>
			<el-table-column
				type="index"
				label="#"
				:index="tableData.from"
			></el-table-column>

			<el-table-column
				prop="name"
				label="Nama"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>

			<el-table-column
				:filters="[
					{ value: 'y', text: 'BERBAYAR' },
					{ value: 'n', text: 'GRATIS' },
				]"
				:filter-multiple="false"
				column-key="paid"
				prop="paid"
				label="Jenis"
				sortable="custom"
				min-width="100px"
				align="center"
				header-align="center"
			>
				<template slot-scope="scope">{{
					scope.row.paid ? 'BERBAYAR' : 'GRATIS'
				}}</template>
			</el-table-column>

			<el-table-column
				:filters="groupMemberList.map((g) => ({ value: g.id, text: g.name }))"
				column-key="group_member_id"
				prop="group.name"
				label="Group"
				sortable="custom"
				show-overflow-tooltip
				min-width="120px"
			></el-table-column>

			<el-table-column
				prop="card_number"
				label="Nomor Kartu"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>
			<el-table-column
				label="Plat Nomor"
				show-overflow-tooltip
				min-width="150px"
			>
				<template slot-scope="scope">{{
					scope.row.vehicles.map((v) => v.plate_number).join(', ')
				}}</template>
			</el-table-column>
			<el-table-column
				prop="register_date"
				label="Tgl Daftar"
				sortable="custom"
				min-width="120px"
				align="center"
				header-align="center"
			>
				<template slot-scope="scope">
					{{ $moment(scope.row.register_date).format('DD-MMM-YYYY') }}
				</template>
			</el-table-column>
			<el-table-column
				prop="expiry_date"
				label="Tgl Kedaluarsa"
				sortable="custom"
				min-width="150px"
				align="center"
				header-align="center"
			>
				<template slot-scope="scope">
					{{ $moment(scope.row.expiry_date).format('DD-MMM-YYYY') }}
				</template>
			</el-table-column>
			<el-table-column
				prop="fare"
				label="Tarif"
				sortable="custom"
				min-width="100px"
				header-align="right"
				align="right"
			>
				<template slot-scope="scope"
					>Rp. {{ $decimal(scope.row.fare) }}</template
				>
			</el-table-column>
			<el-table-column
				prop="billing_cycle"
				label="Siklus Bayar"
				sortable="custom"
				min-width="130px"
			>
				<template slot-scope="scope"
					>{{ scope.row.billing_cycle }}
					{{
						$store.state.siklus.find(
							(s) => s.value == scope.row.billing_cycle_unit
						).label
					}}</template
				>
			</el-table-column>
			<el-table-column
				prop="phone"
				label="Nomor HP"
				sortable="custom"
				show-overflow-tooltip
				min-width="130px"
			></el-table-column>
			<el-table-column
				prop="last_transaction"
				label="Trx Terkakhir"
				sortable="custom"
				min-width="150px"
			>
				<template slot-scope="scope">
					{{ $moment(scope.row.last_transaction).format('DD-MMM-YYYY') }}
				</template>
			</el-table-column>
			<el-table-column
				:filters="[
					{ value: 'y', text: 'Ya' },
					{ value: 'n', text: 'Tidak' },
				]"
				:filter-multiple="false"
				column-key="expired"
				fixed="right"
				prop="expired"
				label="Expired"
				sortable="custom"
				min-width="120px"
				header-align="center"
				align="center"
			>
				<template slot-scope="scope">
					<el-tag
						size="small"
						effect="dark"
						style="width: 100%"
						:type="scope.row.expired ? 'danger' : 'success'"
						>{{ scope.row.expired ? 'Ya' : 'Tidak' }}</el-tag
					>
				</template>
			</el-table-column>
			<el-table-column
				:filters="[
					{ value: 1, text: 'Aktif' },
					{ value: 0, text: 'Nonaktif' },
				]"
				column-key="is_active"
				fixed="right"
				prop="is_active"
				label="Status"
				sortable="custom"
				min-width="120px"
				header-align="center"
				align="center"
			>
				<template slot-scope="scope">
					<el-tag
						size="small"
						effect="dark"
						style="width: 100%"
						:type="scope.row.is_active ? 'success' : 'info'"
						>{{ scope.row.is_active ? 'Aktif' : 'Nonaktif' }}</el-tag
					>
				</template>
			</el-table-column>
			<el-table-column
				fixed="right"
				width="40px"
				align="center"
				header-align="center"
				v-if="$auth.user.role == 1"
			>
				<template slot="header">
					<el-button
						type="text"
						@click="refreshData"
						icon="el-icon-refresh"
					></el-button>
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
										selectedData = scope.row
										showDetail = true
									}
								"
								>Lihat Detail</el-dropdown-item
							>
							<el-dropdown-item
								icon="el-icon-edit-outline"
								@click.native.prevent="openForm(scope.row)"
							>
								Edit
							</el-dropdown-item>
							<el-dropdown-item
								icon="el-icon-delete"
								@click.native.prevent="deleteData(scope.row.id)"
							>
								Hapus
							</el-dropdown-item>
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
			v-if="!!selectedData"
			center
			fullscreen
			title="INFORMASI MEMBER"
			:visible.sync="showDetail"
		>
			<ParkingMemberDetail :member="selectedData" />
		</el-dialog>

		<el-dialog
			fullscreen
			center
			:visible.sync="showForm"
			:title="!!formModel.id ? 'EDIT MEMBER' : 'TAMBAH MEMBER'"
			v-loading="loading"
			:close-on-click-modal="false"
		>
			<el-alert
				type="error"
				title="ERROR"
				:description="error.message + '\n' + error.file + ':' + error.line"
				v-show="error.message"
				style="margin-bottom: 15px"
			></el-alert>

			<el-form label-width="150px" label-position="left">
				<el-row :gutter="30">
					<el-col :span="8">
						<el-form-item
							label="Group"
							:class="formErrors.group_member_id ? 'is-error' : ''"
						>
							<el-select
								v-model="formModel.group_member_id"
								placeholder="Group"
								style="width: 100%"
							>
								<el-option
									v-for="t in groupMemberList"
									:value="t.id"
									:label="t.name"
									:key="t.id"
								></el-option>
							</el-select>
							<div
								class="el-form-item__error"
								v-if="formErrors.group_member_id"
							>
								{{ formErrors.group_member_id[0] }}
							</div>
						</el-form-item>

						<el-form-item
							label="Nama"
							:class="formErrors.name ? 'is-error' : ''"
						>
							<el-input placeholder="Nama" v-model="formModel.name"></el-input>
							<div class="el-form-item__error" v-if="formErrors.name">
								{{ formErrors.name[0] }}
							</div>
						</el-form-item>

						<el-form-item
							label="Nomor HP"
							:class="formErrors.phone ? 'is-error' : ''"
						>
							<el-input
								placeholder="Nomor HP"
								v-model="formModel.phone"
							></el-input>
							<div class="el-form-item__error" v-if="formErrors.phone">
								{{ formErrors.phone[0] }}
							</div>
						</el-form-item>

						<el-form-item
							label="Nomor Kartu"
							:class="formErrors.card_number ? 'is-error' : ''"
						>
							<el-input
								placeholder="Nomor Kartu"
								v-model="formModel.card_number"
							></el-input>
							<div class="el-form-item__error" v-if="formErrors.card_number">
								{{ formErrors.card_number[0] }}
							</div>
						</el-form-item>
					</el-col>
					<el-col :span="8">
						<el-form-item
							label="Tanggal Daftar"
							:class="formErrors.register_date ? 'is-error' : ''"
						>
							<el-date-picker
								format="dd-MMM-yyyy"
								value-format="yyyy-MM-dd"
								placeholder="Tanggal Daftar"
								v-model="formModel.register_date"
								style="width: 100%"
							></el-date-picker>
							<div class="el-form-item__error" v-if="formErrors.register_date">
								{{ formErrors.register_date[0] }}
							</div>
						</el-form-item>

						<el-form-item
							label="Jenis"
							:class="formErrors.paid ? 'is-error' : ''"
						>
							<el-select
								v-model="formModel.paid"
								placeholder="Jenis"
								style="width: 100%"
							>
								<el-option
									v-for="(t, i) in ['Gratis', 'Berbayar']"
									:value="i"
									:label="t"
									:key="i"
								></el-option>
							</el-select>
							<div class="el-form-item__error" v-if="formErrors.paid">
								{{ formErrors.paid[0] }}
							</div>
						</el-form-item>

						<el-form-item
							label="Tarif (Rp)"
							:class="formErrors.fare ? 'is-error' : ''"
						>
							<el-input
								:disabled="!formModel.paid"
								type="number"
								placeholder="Tarif (Rp)"
								v-model="formModel.fare"
							></el-input>
							<div class="el-form-item__error" v-if="formErrors.fare">
								{{ formErrors.fare[0] }}
							</div>
						</el-form-item>
					</el-col>
					<el-col :span="8">
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
							label="Tanggal Kedaluarsa"
							:class="formErrors.expiry_date ? 'is-error' : ''"
						>
							<el-date-picker
								disabled
								format="dd-MMM-yyyy"
								value-format="yyyy-MM-dd"
								placeholder="Tanggal Kedaluarsa"
								v-model="expiry_date"
								style="width: 100%"
							></el-date-picker>
							<div class="el-form-item__error" v-if="formErrors.expiry_date">
								{{ formErrors.expiry_date[0] }}
							</div>
						</el-form-item>

						<el-form-item label="Status">
							<el-select
								v-model="formModel.is_active"
								placeholder="Status"
								style="width: 100%"
							>
								<el-option
									v-for="(t, i) in ['Nonaktif', 'Aktif']"
									:value="i"
									:label="t"
									:key="i"
								></el-option>
							</el-select>
							<div class="el-form-item__error" v-if="formErrors.is_active">
								{{ formErrors.is_active[0] }}
							</div>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>

			<el-table :data="formModel.vehicles" height="calc(100vh - 433px)">
				<el-table-column label="Jenis Kendaraan">
					<template slot-scope="scope">
						<el-select
							size="small"
							v-model="scope.row.vehicle_type"
							placeholder="Jenis Kendaraan"
							style="width: 100%"
						>
							<el-option
								v-for="(t, i) in ['MOBIL', 'MOTOR']"
								:value="t"
								:label="t"
								:key="i"
							></el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column label="Plat Nomor">
					<template slot-scope="scope">
						<el-input
							v-model="scope.row.plate_number"
							placeholder="Plat Nomor"
							size="small"
						></el-input>
					</template>
				</el-table-column>
				<el-table-column label="Merk">
					<template slot-scope="scope">
						<el-input
							v-model="scope.row.merk"
							placeholder="Merk"
							size="small"
						></el-input>
					</template>
				</el-table-column>
				<el-table-column label="Type">
					<template slot-scope="scope">
						<el-input
							v-model="scope.row.type"
							placeholder="Type"
							size="small"
						></el-input>
					</template>
				</el-table-column>
				<el-table-column label="Tahun">
					<template slot-scope="scope">
						<el-input
							type="number"
							v-model="scope.row.tahun"
							placeholder="Tahun"
							size="small"
						></el-input>
					</template>
				</el-table-column>
				<el-table-column label="Warna">
					<template slot-scope="scope">
						<el-input
							v-model="scope.row.warna"
							placeholder="Warna"
							size="small"
						></el-input>
					</template>
				</el-table-column>
				<el-table-column width="70px" align="right" header-align="right">
					<template
						slot="header"
						v-if="
							formModel.vehicles &&
							formModel.vehicles.length < setting.jml_kendaraan_per_kartu
						"
					>
						<el-button
							icon="el-icon-plus"
							@click="addVehicle"
							size="small"
							type="primary"
						></el-button>
					</template>
					<template slot-scope="scope">
						<el-button
							@click="deleteVehicle(scope.$index)"
							icon="el-icon-delete"
							size="small"
							type="danger"
							plain
						></el-button>
					</template>
				</el-table-column>
			</el-table>

			<span slot="footer">
				<el-button icon="el-icon-error" @click="showForm = false">
					BATAL
				</el-button>
				<el-button type="primary" icon="el-icon-success" @click="submit">
					SIMPAN
				</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import exportFromJSON from 'export-from-json'
import { mapState } from 'vuex'
import crud from '~/mixins/crud'

export default {
	mixins: [crud],

	watch: {
		'formModel.paid'(v) {
			if (!v) {
				this.formModel.fare = 0
			}
		},
	},

	computed: {
		expiry_date() {
			try {
				return this.$moment(this.formModel.register_date, 'YYYY-MM-DD')
					.add(this.formModel.billing_cycle, this.formModel.billing_cycle_unit)
					.format('YYYY-MM-DD')
			} catch (error) {
				return ''
			}
		},
		...mapState(['setting', 'groupMemberList']),
	},

	data() {
		return {
			selectedData: {},
			showDetail: false,
			now: this.$moment().format('YYYY-MM-DD'),
			url: '/api/parkingMember',
		}
	},

	methods: {
		print() {
			const params = {
				sort: this.sort,
				order: this.order,
				action: 'print',
				...this.filters,
			}

			const querystring = new URLSearchParams(params).toString()
			window.open(
				`${this.$axios.defaults.baseURL}/api/parkingMember?${querystring}`,
				'_blank'
			)
		},

		download() {
			const params = {
				sort: this.sort,
				order: this.order,
				...this.filters,
			}

			this.$axios
				.$get('/api/parkingMember', { params })
				.then((r) => {
					const data = r.data.map((d) => {
						return {
							Nama: d.name,
							Jenis: d.paid ? 'BERBAYAR' : 'GRATIS',
							Group: d.group.name,
							'Nomor Kartu': d.card_number,
							'Plat Nomor': d.vehicles.map((v) => v.plate_number).join(', '),
							'Tanggal Daftar': d.register_date,
							'Tanggal Kedaluarsa': d.expiry_date,
							Tarif: d.fare,
							'Siklus Bayar':
								d.billing_cycle +
								' ' +
								this.$store.state.siklus.find(
									(s) => s.value == d.billing_cycle_unit
								).label,
							'Nomor HP': d.phone_number,
							'Transaksi Terakhir': d.last_transaction || '',
							'Status Kartu': d.expired ? 'KEDALUARSA' : 'BERLAKU',
							'Status Anggota': d.is_active ? 'AKTIF' : 'NONAKTIF',
						}
					})

					exportFromJSON({ data, fileName: 'member-parkir', exportType: 'xls' })
				})
				.catch((e) => console.log(e))
				.finally(() => (this.loading = false))
		},

		submit() {
			this.formModel.expiry_date = this.expiry_date
			this.save()
		},

		afterSave() {
			this.$store.dispatch('getMemberList')
		},

		addVehicle() {
			if (
				this.formModel.vehicles.length < this.setting.jml_kendaraan_per_kartu ||
				this.setting.jml_kendaraan_per_kartu == 0
			) {
				this.formModel.vehicles.push({
					plate_number: '',
					vehicle_type: '',
					type: '',
					merk: '',
					tahun: '',
					warna: '',
				})
			} else {
				this.$message({
					message:
						'Jumlah maksimal kendaraan per kartu adalah ' +
						this.setting.jml_kendaraan_per_kartu,
					type: 'error',
					showClose: true,
				})
			}
		},

		deleteVehicle(index) {
			this.formModel.vehicles.splice(index, 1)
		},
	},
}
</script>


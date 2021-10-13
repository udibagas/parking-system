<template>
	<div>
		<el-form inline class="text-right" @submit.native.prevent>
			<el-form-item>
				<el-button
					size="small"
					@click="openForm({ vehicles: [], register_date: now, tarif: 0 })"
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
				>
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button-group>
					<el-button
						icon="el-icon-download"
						size="small"
						type="primary"
						@click="exportData('member-parkir')"
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
			:data="tableData.data"
			stripe
			@row-dblclick="
				(row, column, event) => {
					selectedData = row
					showDetail = true
				}
			"
			height="calc(100vh - 310px)"
			@filter-change="filterChange"
			v-loading="loading"
			@sort-change="sortChange"
		>
			<el-table-column
				type="index"
				:index="tableData.from"
				label="#"
			></el-table-column>
			<el-table-column
				:filters="[
					{ value: 1, text: 'Aktif' },
					{ value: 0, text: 'Nonaktif' },
				]"
				column-key="status"
				prop="status"
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
						:type="scope.row.status ? 'success' : 'info'"
						>{{ scope.row.status ? 'Aktif' : 'Nonaktif' }}</el-tag
					>
				</template>
			</el-table-column>
			<el-table-column
				prop="nama"
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
				column-key="berbayar"
				prop="berbayar"
				label="Jenis"
				sortable="custom"
				min-width="100px"
				align="center"
				header-align="center"
			>
				<template slot-scope="scope">
					{{ scope.row.berbayar ? 'BERBAYAR' : 'GRATIS' }}
				</template>
			</el-table-column>

			<el-table-column
				:filters="
					this.groupMemberList.map((g) => ({ value: g.id, text: g.nama }))
				"
				column-key="group_member_id"
				prop="group.nama"
				label="Group"
				sortable="custom"
				show-overflow-tooltip
				min-width="120px"
			>
			</el-table-column>

			<el-table-column
				prop="nomor_kartu"
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
				<template slot-scope="scope">
					{{ scope.row.vehicles.map((v) => v.plat_nomor).join(', ') }}
				</template>
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
				prop="tarif"
				label="Tarif"
				sortable="custom"
				min-width="100px"
				header-align="right"
				align="right"
			>
				<template slot-scope="scope">
					Rp. {{ $decimal(scope.row.tarif) }}
				</template>
			</el-table-column>
			<el-table-column
				prop="siklus_pembayaran"
				label="Siklus Bayar"
				sortable="custom"
				min-width="130px"
			>
				<template slot-scope="scope">
					{{ scope.row.siklus_pembayaran }}
					{{
						siklus.find((s) => s.value == scope.row.siklus_pembayaran_unit)
							.label
					}}
				</template>
			</el-table-column>
			<el-table-column
				prop="phone"
				label="Nomor HP"
				sortable="custom"
				show-overflow-tooltip
				min-width="130px"
			></el-table-column>
			<!-- <el-table-column prop="email" label="Alamat Email" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column> -->
			<el-table-column
				prop="last_transaction"
				label="Trx Terkakhir"
				sortable="custom"
				min-width="150px"
			>
				<template slot-scope="scope">
					{{
						scope.row.last_transaction
							? $moment(scope.row.last_transaction).format('DD-MMM-YYYY')
							: ''
					}}
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
										selectedData = scope.row
										showDetail = true
									}
								"
								>Lihat Detail</el-dropdown-item
							>
							<el-dropdown-item
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
			v-if="!!selectedData"
			center
			fullscreen
			title="INFORMASI MEMBER"
			:visible.sync="showDetail"
		>
			<MemberParkingMemberDetail :member="selectedData" />
		</el-dialog>

		<el-dialog
			fullscreen
			center
			:visible.sync="showForm"
			:title="!!formModel.id ? 'EDIT MEMBER' : 'TAMBAH MEMBER'"
			v-loading="loading"
			:close-on-click-modal="false"
		>
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
									:label="t.nama"
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
							:class="formErrors.nama ? 'is-error' : ''"
						>
							<el-input placeholder="Nama" v-model="formModel.nama"></el-input>
							<div class="el-form-item__error" v-if="formErrors.nama">
								{{ formErrors.nama[0] }}
							</div>
						</el-form-item>

						<!-- <el-form-item label="Alamat Email" :class="formErrors.email ? 'is-error' : ''">
                            <el-input placeholder="Alamat Email" v-model="formModel.email"></el-input>
                            <div class="el-form-item__error" v-if="formErrors.email">{{formErrors.email[0]}}</div>
                        </el-form-item> -->

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
							:class="formErrors.nomor_kartu ? 'is-error' : ''"
						>
							<el-input
								placeholder="Nomor Kartu"
								v-model="formModel.nomor_kartu"
							></el-input>
							<div class="el-form-item__error" v-if="formErrors.nomor_kartu">
								{{ formErrors.nomor_kartu[0] }}
							</div>
						</el-form-item>
						<!-- DISINI -->

						<el-form-item
							label="Jenis Kartu"
							:class="formErrors.card_type ? 'is-error' : ''"
						>
							<el-select
								v-model="formModel.card_type"
								placeholder="Jenis Kartu"
								style="width: 100%"
							>
								<el-option
									v-for="(t, i) in ['RFID', 'UHF']"
									:value="t"
									:label="t"
									:key="i"
								></el-option>
							</el-select>
							<div class="el-form-item__error" v-if="formErrors.card_type">
								{{ formErrors.card_type[0] }}
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
							label="Jenis Anggota"
							:class="formErrors.berbayar ? 'is-error' : ''"
						>
							<el-select
								v-model="formModel.berbayar"
								placeholder="Jenis Anggota"
								style="width: 100%"
							>
								<el-option
									v-for="(t, i) in ['Gratis', 'Berbayar']"
									:value="i"
									:label="t"
									:key="i"
								></el-option>
							</el-select>
							<div class="el-form-item__error" v-if="formErrors.berbayar">
								{{ formErrors.berbayar[0] }}
							</div>
						</el-form-item>

						<el-form-item
							label="Tarif (Rp)"
							:class="formErrors.tarif ? 'is-error' : ''"
						>
							<el-input
								:disabled="!formModel.berbayar"
								type="number"
								placeholder="Tarif (Rp)"
								v-model="formModel.tarif"
							></el-input>
							<div class="el-form-item__error" v-if="formErrors.tarif">
								{{ formErrors.tarif[0] }}
							</div>
						</el-form-item>
					</el-col>
					<el-col :span="8">
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
								v-model="formModel.siklus_pembayaran_unit"
								style="width: 66%; float: right; clear: right"
							>
								<el-option
									v-for="(s, i) in siklus"
									:value="s.value"
									:label="s.label"
									:key="i"
								></el-option>
							</el-select>
							<div
								class="el-form-item__error"
								v-if="formErrors.siklus_pembayaran"
							>
								{{ formErrors.siklus_pembayaran[0] }}
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
								v-model="formModel.status"
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
							<div class="el-form-item__error" v-if="formErrors.status">
								{{ formErrors.status[0] }}
							</div>
						</el-form-item>
					</el-col>
				</el-row>
			</el-form>

			<el-table :data="formModel.vehicles">
				<el-table-column label="Jenis Kendaraan">
					<template slot-scope="scope">
						<el-select
							size="small"
							v-model="scope.row.jenis_kendaraan"
							placeholder="Jenis Kendaraan"
							style="width: 100%"
						>
							<el-option
								v-for="kendaraan in jenisKendaraanList"
								:value="kendaraan.nama"
								:label="kendaraan.nama"
								:key="kendaraan.id"
							></el-option>
						</el-select>
					</template>
				</el-table-column>
				<el-table-column label="Plat Nomor">
					<template slot-scope="scope">
						<el-input
							v-model="scope.row.plat_nomor"
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
				<el-table-column label="Tipe">
					<template slot-scope="scope">
						<el-input
							v-model="scope.row.tipe"
							placeholder="Tipe"
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
					<template slot="header">
						<el-button
							:disabled="
								setting.jml_kendaraan_per_kartu > 0 &&
								formModel.vehicles.length >= setting.jml_kendaraan_per_kartu
							"
							icon="el-icon-plus"
							@click="addVehicle"
							size="small"
							type="primary"
						></el-button>
					</template>
					<template slot-scope="scope">
						<el-button
							@click="deleteVehicle(scope.$index, scope.row.id)"
							icon="el-icon-delete"
							size="small"
							type="danger"
							plain
						></el-button>
					</template>
				</el-table-column>
			</el-table>

			<span slot="footer" class="dialog-footer">
				<el-button icon="el-icon-error" @click="closeForm"> BATAL </el-button>
				<el-button type="primary" icon="el-icon-success" @click="submit">
					SIMPAN
				</el-button>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import { mapState } from 'vuex'
import crud from '@/mixins/crud'

export default {
	mixins: [crud],

	computed: {
		expiry_date() {
			try {
				return this.$moment(this.formModel.register_date, 'YYYY-MM-DD')
					.add(
						this.formModel.siklus_pembayaran,
						this.formModel.siklus_pembayaran_unit
					)
					.format('YYYY-MM-DD')
			} catch (error) {
				return ''
			}
		},
		...mapState(['groupMemberList', 'siklus', 'setting', 'jenisKendaraanList']),
	},

	watch: {
		'formModel.berbayar'(v) {
			if (!v) {
				this.formModel.tarif = 0
			}
		},
	},

	data() {
		return {
			url: '/api/member',
			formModel: { vehicles: [] },
			selectedData: { vehicles: [] },
			showDetail: false,
			now: this.$moment().format('YYYY-MM-DD'),
		}
	},

	methods: {
		closeForm() {
			this.showForm = false
			this.formModel = { vehicles: [] }
			this.formErrors = {}
		},

		submit() {
			this.formModel.expiry_date = this.expiry_date
			this.save()
		},

		print() {
			const params = {
				sort_prop: this.sort_prop || 'nama',
				sort_order: this.sort_order || 'asc',
				action: 'print',
				...this.filters,
			}

			const querystring = new URLSearchParams(params).toString()
			window.open(
				`${this.$axios.defaults.baseURL}/api/member?${querystring}`,
				'_blank'
			)
		},

		addVehicle() {
			if (
				this.formModel.vehicles.length < this.setting.jml_kendaraan_per_kartu ||
				this.setting.jml_kendaraan_per_kartu == 0
			) {
				this.formModel.vehicles.push({
					plat_nomor: '',
					jenis_kendaraan: '',
					tipe: '',
					merk: '',
					tahun: '',
					warna: '',
				})
			} else {
				this.$message({
					message: `Jumlah maksimal kendaraan per kartu adalah ${this.setting.jml_kendaraan_per_kartu}`,
					type: 'error',
				})
			}
		},

		deleteVehicle(index, id) {
			if (!id) {
				this.formModel.vehicles.splice(index, 1)
			} else {
				this.$axios.$delete(`/api/memberVehicle/${id}`).then((r) => {
					this.formModel.vehicles.splice(index, 1)
				})
			}
		},

		afterSave() {
			this.$store.dispatch('getMemberList')
		},

		afterDelete() {
			this.$store.dispatch('getMemberList')
		},
	},
}
</script>


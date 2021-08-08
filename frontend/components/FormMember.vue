<template>
	<el-dialog
		fullscreen
		center
		:visible.sync="show"
		:title="!!formModel.id ? 'EDIT MEMBER' : 'TAMBAH MEMBER'"
		v-loading="loading"
		:close-on-click-modal="false"
		:before-close="
			(done) => {
				closeForm()
			}
		"
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
						<div class="el-form-item__error" v-if="formErrors.group_member_id">
							{{ formErrors.group_member_id[0] }}
						</div>
					</el-form-item>

					<el-form-item label="Nama" :class="formErrors.nama ? 'is-error' : ''">
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
						:class="formErrors.berbayar ? 'is-error' : ''"
					>
						<el-select
							v-model="formModel.berbayar"
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

		<el-table :data="formModel.vehicles" height="calc(100vh - 433px)">
			<el-table-column label="Jenis Kendaraan">
				<template slot-scope="scope">
					<el-select
						size="small"
						v-model="scope.row.jenis_kendaraan"
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
			<el-button
				type="primary"
				icon="el-icon-success"
				@click="() => (!!formModel.id ? update() : store())"
				>SIMPAN</el-button
			>
			<el-button type="info" icon="el-icon-error" @click="closeForm"
				>BATAL</el-button
			>
		</span>
	</el-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
	props: ['model', 'show'],
	watch: {
		'formModel.berbayar'(v) {
			if (!v) {
				this.formModel.tarif = 0
			}
		},
	},
	computed: {
		formModel() {
			return this.model
		},
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
		...mapState([
			'user',
			'groupMemberList',
			'setting',
			'siklus',
			'jenisKendaraanList',
		]),
	},
	data() {
		return {
			formErrors: {},
			loading: false,
		}
	},
	methods: {
		closeForm() {
			this.formErrors = {}
			this.$emit('close')
		},
		store() {
			this.loading = true
			this.formModel.expiry_date = this.expiry_date
			axios
				.post('/member', this.formModel)
				.then((r) => {
					this.$emit('close')
					this.$message({
						message: 'Data berhasil disimpan.',
						type: 'success',
					})
					this.$emit('reload')
					this.$store.commit('getMemberList')
				})
				.catch((e) => {
					if (e.response.status == 422) {
						this.formErrors = e.response.data.errors
					}

					if (e.response.status == 500) {
						this.formErrors = {}
					}

					this.$message({
						message: e.response.data.message,
						type: 'error',
					})
				})
				.finally(() => {
					this.loading = false
				})
		},
		update() {
			this.loading = true
			this.formModel.expiry_date = this.expiry_date
			axios
				.put(`/member/${this.formModel.id}`, this.formModel)
				.then((r) => {
					this.$emit('close')
					this.$message({
						message: 'Data berhasil disimpan.',
						type: 'success',
						showClose: true,
					})
					this.$emit('reload')
					this.$store.commit('getMemberList')
				})
				.catch((e) => {
					if (e.response.status == 422) {
						this.formErrors = e.response.data.errors
					}

					if (e.response.status == 500) {
						this.formErrors = {}
					}

					this.$message({
						message: e.response.data.message,
						type: 'error',
					})
				})
				.finally(() => {
					this.loading = false
				})
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
				axios
					.delete(`/memberVehicle/${id}`)
					.then((r) => {
						this.formModel.vehicles.splice(index, 1)
					})
					.catch((e) => {
						this.$message({
							message: e.response.data.message,
							type: 'error',
						})
					})
			}
		},
	},
}
</script>

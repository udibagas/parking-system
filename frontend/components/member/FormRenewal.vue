<template>
	<el-dialog
		:visible.sync="show"
		:title="
			!!formModel.id
				? 'EDIT PEMBAYARAN KEANGGOTAAN'
				: 'INPUT PEMBAYARAN KEANGGOTAAN'
		"
		width="500px"
		v-loading="loading"
		:close-on-click-modal="false"
		:before-close="
			(done) => {
				closeForm()
			}
		"
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

			<el-form-item label="Jumlah" :class="formErrors.jumlah ? 'is-error' : ''">
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
			<el-button icon="el-icon-success" type="primary" @click="save"
				>SIMPAN</el-button
			>
			<el-button icon="el-icon-error" type="info" @click="closeForm"
				>BATAL</el-button
			>
		</span>
	</el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
	props: ['model', 'show'],
	data() {
		return {
			formErrors: {},
			loading: false,
		}
	},
	computed: {
		formModel() {
			return this.model
		},
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
		closeForm() {
			this.formErrors = {}
			this.$emit('close')
		},
		save() {
			this.formModel.sampai_tanggal = this.sampai_tanggal
			this.$confirm('Anda yakin?', 'Konfirmasi', { type: 'warning' })
				.then(() => {
					if (!!this.formModel.id) {
						this.update()
					} else {
						this.store()
					}
				})
				.catch((e) => console.log(e))
		},
		store() {
			this.loading = true
			this.$axios
				.$post('/api/memberRenewal', this.formModel)
				.then((response) => {
					this.closeForm()
					this.$emit('reload')
					this.$message({
						message: response.message,
						type: 'success',
					})
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
			this.$axios
				.put('/memberRenewal/' + this.formModel.id, this.formModel)
				.then((r) => {
					this.closeForm()
					this.$emit('reload')
					this.$message({
						message: r.data.message,
						type: 'success',
					})
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
	},
}
</script>

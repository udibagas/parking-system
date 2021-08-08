<template>
	<el-dialog
		:close-on-click-modal="false"
		:title="
			!formModel.id
				? 'TRANSAKSI MANUAL'
				: 'EDIT TRANSAKSI ' + formModel.nomor_barcode
		"
		:visible.sync="show"
		top="60px"
		width="800px"
		:before-close="(done) => closeForm()"
	>
		<el-form label-position="left" label-width="150px">
			<el-row :gutter="30">
				<el-col :span="12">
					<el-form-item
						label="Plat Nomor"
						:class="formErrors.plat_nomor ? 'is-error' : ''"
					>
						<el-input
							placeholder="Plat Nomor"
							v-model="formModel.plat_nomor"
						></el-input>
						<div class="el-form-item__error" v-if="formErrors.plat_nomor">
							{{ formErrors.plat_nomor[0] }}
						</div>
					</el-form-item>
					<el-form-item
						label="Gate Masuk"
						:class="formErrors.gate_in_id ? 'is-error' : ''"
					>
						<el-select
							v-model="formModel.gate_in_id"
							placeholder="Gate Masuk"
							style="width: 100%"
						>
							<el-option
								v-for="(g, i) in gateInList"
								:value="g.id"
								:label="g.nama"
								:key="i"
							></el-option>
						</el-select>
						<div class="el-form-item__error" v-if="formErrors.gate_in_id">
							{{ formErrors.gate_in_id[0] }}
						</div>
					</el-form-item>
					<el-form-item
						label="Waktu Masuk"
						:class="formErrors.time_in ? 'is-error' : ''"
					>
						<el-date-picker
							type="datetime"
							style="width: 100%"
							format="dd-MMM-yyyy HH:mm"
							value-format="yyyy-MM-dd HH:mm:ss"
							placeholder="Waktu Masuk"
							v-model="formModel.time_in"
						></el-date-picker>
						<div class="el-form-item__error" v-if="formErrors.time_in">
							{{ formErrors.time_in[0] }}
						</div>
					</el-form-item>
					<el-form-item
						label="Tarif (Rp)"
						:class="formErrors.tarif ? 'is-error' : ''"
					>
						<el-input
							type="number"
							placeholder="Tarif"
							v-model="formModel.tarif"
						></el-input>
						<div class="el-form-item__error" v-if="formErrors.tarif">
							{{ formErrors.tarif[0] }}
						</div>
					</el-form-item>
					<el-form-item
						label="User Admin"
						:class="formErrors.username ? 'is-error' : ''"
					>
						<el-input
							placeholder="User Admin"
							v-model="formModel.username"
						></el-input>
						<div class="el-form-item__error" v-if="formErrors.username">
							{{ formErrors.username[0] }}
						</div>
					</el-form-item>
				</el-col>

				<el-col :span="12">
					<el-form-item
						label="Jenis Kendaraan"
						:class="formErrors.jenis_kendaraan ? 'is-error' : ''"
					>
						<el-select
							v-model="formModel.jenis_kendaraan"
							placeholder="Jenis Kendaraan"
							style="width: 100%"
						>
							<el-option
								v-for="(v, i) in jenisKendaraanList"
								:value="v.nama"
								:label="v.nama"
								:key="i"
							></el-option>
						</el-select>
						<div class="el-form-item__error" v-if="formErrors.jenis_kendaraan">
							{{ formErrors.jenis_kendaraan[0] }}
						</div>
					</el-form-item>
					<el-form-item
						label="Gate Keluar"
						:class="formErrors.gate_out_id ? 'is-error' : ''"
					>
						<el-select
							v-model="formModel.gate_out_id"
							placeholder="Gate Keluar"
							style="width: 100%"
						>
							<el-option
								v-for="(g, i) in gateOutList"
								:value="g.id"
								:label="g.nama"
								:key="i"
							></el-option>
						</el-select>
						<div class="el-form-item__error" v-if="formErrors.gate_out_id">
							{{ formErrors.gate_out_id[0] }}
						</div>
					</el-form-item>
					<el-form-item
						label="Waktu Keluar"
						:class="formErrors.time_out ? 'is-error' : ''"
					>
						<el-date-picker
							type="datetime"
							:autocomplete="false"
							style="width: 100%"
							format="dd-MMM-yyyy HH:mm"
							value-format="yyyy-MM-dd HH:mm:ss"
							placeholder="Waktu Keluar"
							v-model="formModel.time_out"
						></el-date-picker>
						<div class="el-form-item__error" v-if="formErrors.time_out">
							{{ formErrors.time_out[0] }}
						</div>
					</el-form-item>
					<el-form-item
						label="Denda (Rp)"
						:class="formErrors.denda ? 'is-error' : ''"
					>
						<el-input
							type="number"
							placeholder="Denda"
							v-model="formModel.denda"
						></el-input>
						<div class="el-form-item__error" v-if="formErrors.denda">
							{{ formErrors.denda[0] }}
						</div>
					</el-form-item>
					<el-form-item
						label="Password Admin"
						:class="formErrors.password ? 'is-error' : ''"
					>
						<el-input
							type="password"
							placeholder="Password Admin"
							v-model="formModel.password"
						></el-input>
						<div class="el-form-item__error" v-if="formErrors.password">
							{{ formErrors.password[0] }}
						</div>
					</el-form-item>
				</el-col>
			</el-row>
		</el-form>

		<div slot="footer">
			<el-button
				type="primary"
				icon="el-icon-success"
				@click="() => (!!formModel.id ? update() : store())"
				>SIMPAN</el-button
			>
			<el-button type="info" icon="el-icon-error" @click="closeForm"
				>BATAL</el-button
			>
		</div>
	</el-dialog>
</template>

<script>
import { mapState } from 'vuex'
export default {
	props: ['show', 'model'],
	computed: {
		formModel() {
			return this.model
		},
		durasi() {
			var date1 = this.$moment(this.formModel.time_in)
			var date2 = this.$moment(this.formModel.time_out)
			var duration = this.$moment.duration(date2.diff(date1))
			return this.$moment.utc(duration.asMilliseconds()).format('HH:mm:ss')
		},
		...mapState(['posList', 'gateOutList', 'gateInList', 'jenisKendaraanList']),
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
			this.formModel.manual = 1
			axios
				.post('/parkingTransaction', this.formModel)
				.then((r) => {
					this.$message({
						message: 'Data berhasil disimpan',
						type: 'success',
						showClose: true,
					})

					this.closeForm()
					this.$emit('reload')
					this.openGate(this.formModel.gate_out_id)
				})
				.catch((e) => {
					if (e.response.status == 422) {
						this.formErrors = e.response.data.errors
					}

					this.$message({
						message: e.response.data.message,
						type: 'error',
						showClose: true,
					})
				})
				.finally(() => {
					this.loading = false
				})
		},
		update() {
			this.loading = true
			this.formModel.edit = 1
			axios
				.put(`/parkingTransaction/${this.formModel.id}`, this.formModel)
				.then((r) => {
					this.$message({
						message: 'Data berhasil disimpan',
						type: 'success',
						showClose: true,
					})

					this.closeForm()
					this.$emit('reload')
				})
				.catch((e) => {
					if (e.response.status == 422) {
						this.formErrors = e.response.data.errors
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
		openGate(gate_out_id) {
			const pos = this.posList.find((p) => p.id == this.formModel.pos_id)
			const gate = this.gateOutList.find((g) => g.id == gate_out_id)

			const ws = new WebSocket(`ws://${pos.ip_address}:5678/`)

			ws.onerror = (event) => {
				this.$message({
					message: 'KONEKSI KE POS GAGAL',
					type: 'error',
				})
			}

			ws.onopen = (event) => {
				ws.send(
					[
						'open',
						gate.device,
						gate.baudrate,
						gate.open_command,
						gate.close_command,
					].join(';')
				)
			}

			ws.onmessage = (event) => {
				let data = JSON.parse(event.data)
				this.$message({
					message: data.message,
					type: data.status ? 'success' : 'error',
				})
				ws.close()
			}
		},
	},
}
</script>

<template>
	<div id="gate-out-app" class="flex flex-row">
		<div>
			<h1
				v-if="formModel.pos_id"
				formModel.pos_id
				class="mb-3 p-2 bg-red-700 text-white text-center text-xl"
				@click="formModel.pos_id = null"
			>
				{{ posList.find((p) => p.id == formModel.pos_id).nama }}
			</h1>
			<el-row
				v-if="!setting.disable_plat_nomor"
				:gutter="10"
				style="margin-bottom: 10px"
			>
				<el-col :span="10">
					<div class="label-big">[-] NO. PLAT</div>
				</el-col>
				<el-col :span="14">
					<input
						id="plat-nomor"
						autocomplete="off"
						@keyup.enter="cekPlatNomor"
						type="text"
						placeholder="NO. PLAT"
						v-model="formModel.plat_nomor"
						class="my-input"
					/>
				</el-col>
			</el-row>

			<el-row :gutter="10" style="margin-bottom: 10px">
				<el-col :span="10">
					<div class="label-big">[+] NO. TIKET/KARTU</div>
				</el-col>
				<el-col :span="14">
					<input
						id="nomor-tiket"
						autocomplete="off"
						@keyup.enter="cekTiket"
						@keydown.tab="cekTiket"
						type="text"
						placeholder="NO. TIKET/KARTU"
						v-model="formModel.nomor_barcode"
						class="my-input"
					/>
				</el-col>
			</el-row>

			<el-row :gutter="10" style="margin-bottom: 10px">
				<el-col :span="10">
					<div class="label-big">[*] JENIS KENDARAAN</div>
				</el-col>
				<el-col :span="14">
					<select
						@change="hitungTarif"
						v-model="formModel.jenis_kendaraan"
						id="jenis-kendaraan"
						class="my-input"
						placeholder="JENIS KENDARAAN"
					>
						<option v-for="g in jenisKendaraanList" :value="g.nama" :key="g.id">
							{{ g.shortcut_key }} - {{ g.nama }}
						</option>
					</select>
				</el-col>
			</el-row>

			<el-row
				v-show="formModel.nomor_barcode == 'xxxxx'"
				:gutter="10"
				style="margin-bottom: 10px"
			>
				<el-col :span="10">
					<div class="label-big">[*] JAM MASUK</div>
				</el-col>
				<el-col :span="14">
					<input
						@keyup.enter="toGateIn"
						@change="hitungTarif"
						id="time-in"
						v-mask="'####-##-## ##:##'"
						v-model="formModel.time_in"
						class="my-input"
					/>
				</el-col>
			</el-row>

			<el-row
				v-show="formModel.nomor_barcode == 'xxxxx'"
				v-if="gateInList.length > 1"
				:gutter="10"
				style="margin-bottom: 10px"
			>
				<el-col :span="10">
					<div class="label-big">GATE MASUK</div>
				</el-col>
				<el-col :span="14">
					<select
						@change="toSubmit"
						v-model="formModel.gate_in_id"
						id="gate-in"
						class="my-input"
					>
						<option v-for="g in gateInList" :value="g.id" :key="g.id">
							{{ g.shortcut_key }} - {{ g.nama }}
						</option>
					</select>
				</el-col>
			</el-row>

			<el-row :gutter="10" style="margin-bottom: 10px">
				<el-col :span="10">
					<div class="label-big">TARIF</div>
				</el-col>
				<el-col :span="14">
					<input
						disabled
						v-model="formModel.tarif"
						class="my-input bg-red-700 text-white"
					/>
				</el-col>
			</el-row>

			<el-row
				v-if="formModel.nomor_barcode == 'xxxxx'"
				:gutter="10"
				style="margin-bottom: 10px"
			>
				<el-col :span="10">
					<div class="label-big">TARIF + DENDA</div>
				</el-col>
				<el-col :span="14">
					<input
						disabled
						:value="Number(formModel.tarif) + Number(formModel.denda)"
						class="my-input bg-red-700 text-white"
					/>
				</el-col>
			</el-row>

			<button
				id="submit-btn"
				@keyup.right="nextBtn"
				@keyup.down="nextBtn"
				@keydown.enter="submit(false)"
				class="my-big-btn"
				@click="submit(false)"
			>
				BUKA GATE
			</button>
			<button
				id="submit-btn1"
				@keyup.left="prevBtn"
				@keyup.up="prevBtn"
				@keydown.enter="printLastTrx"
				class="my-big-btn"
				@click="printLastTrx"
			>
				[F12] PRINT STRUK TRANSAKSI TERAKHIR
			</button>

			<el-row :gutter="10">
				<el-col :span="12" v-if="!HIDE_PRINT_REPORT">
					<button
						@keydown.enter="printReport"
						class="my-big-btn"
						@click="printReport"
					>
						[F10] PRINT LAPORAN
					</button>
				</el-col>
				<el-col :span="HIDE_PRINT_REPORT ? 24 : 12">
					<button
						class="my-big-btn"
						@keydown.enter="showManualOpenForm = true"
						@click="showManualOpenForm = true"
					>
						[F11] BUKA GATE MANUAL
					</button>
				</el-col>
			</el-row>
		</div>
		<div class="ml-5" v-if="snapshots.length > 0">
			<img
				v-for="s in snapshots"
				:key="s.id"
				:src="s.url"
				style="width: 500px"
				class="mx-auto mb-1 border"
			/>
		</div>

		<FormBukaManual
			:show="showManualOpenForm"
			@close="showManualOpenForm = false"
			@open-gate="(gate_out_id) => openGate(gate_out_id)"
		/>

		<el-dialog
			center
			:show-close="false"
			:visible="!formModel.pos_id && posList.length > 1"
		>
			<div class="mb-5">
				<h1 class="text-center mb-3 text-xl">PILIH POS</h1>
				<select v-model="formModel.pos_id" class="my-input" id="pos-id">
					<option v-for="g in posList" :value="g.id" :key="g.id">
						{{ g.nama }}
					</option>
				</select>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
	computed: {
		totalBayar() {
			return Number(this.formModel.tarif) + Number(this.formModel.denda)
		},
		duration() {
			if (!this.formModel.time_in || !this.formModel.time_out) {
				return '00:00:00'
			}

			let time_in = this.$moment(this.formModel.time_in)
			let time_out = this.$moment(this.formModel.time_out)
			let day = time_out.diff(time_in, 'days')
			let hour = time_out.diff(time_in, 'hours')
			let minute = time_out.diff(time_in, 'minutes')
			let second = time_out.diff(time_in, 'seconds')

			return `${day}HR ${String(hour % 24).padStart(2, '0')}:${String(
				minute % 60
			).padStart(2, '0')}`
		},
		...mapState(['gateOutList', 'gateInList', 'jenisKendaraanList']),
	},

	data() {
		return {
			formModel: { nomor_barcode: '', tarif: '', denda: '' },
			formErrors: {},
			snapshots: [],
			setting: {},
			showManualOpenForm: false,
			posList: [],
			HIDE_PRINT_REPORT: false,
		}
	},
	methods: {
		toSubmit() {
			this.runningText(`${this.duration}|Rp${this.$decimal(this.totalBayar)}`)
			document.getElementById('submit-btn').focus()
		},

		toGateIn() {
			if (this.gateInList.length == 1) {
				this.formModel.gate_in_id = this.gateInList[0].id
			}

			if (!this.formModel.gate_in_id) {
				document.getElementById('gate-in').focus()
			} else {
				document.getElementById('submit-btn').focus()
			}

			this.runningText(`${this.duration}|Rp${this.$decimal(this.totalBayar)}`)
		},

		nextBtn() {
			document.getElementById('submit-btn1').focus()
		},

		prevBtn() {
			document.getElementById('submit-btn').focus()
		},

		hitungTarif() {
			const gateOut = this.gateOutList.find((g) => {
				return (
					g.pos_id == this.formModel.pos_id &&
					g.jenis_kendaraan.includes(this.formModel.jenis_kendaraan)
				)
			})

			if (!gateOut) {
				this.$message({
					message: 'Tidak ada gate keluar untuk jenis kendaraan terkait',
					type: 'error',
				})
				return
			}

			this.formModel.gate_out_id = gateOut.id

			if (this.formModel.id) {
				this.takeSnapshot()
			}

			if (this.formModel.is_member) {
				this.formModel.tarif = 0
				document.getElementById('submit-btn').focus()
				return
			}

			const tarif = this.jenisKendaraanList.find(
				(v) => v.nama == this.formModel.jenis_kendaraan
			)

			if (!tarif) {
				this.$message({
					message:
						'Tarif tidak ditemukan untuk jenis kendaraan ' +
						this.formModel.jenis_kendaraan,
					type: 'error',
					showClose: true,
				})

				this.formModel.tarif = 0
				return
			}

			if (this.formModel.nomor_barcode.toLowerCase() == 'xxxxx') {
				this.formModel.denda = Number(tarif.denda_tiket_hilang)
			} else {
				this.formModel.denda = 0
			}

			var timeIn = this.$moment(this.formModel.time_in)
			var timeOut = this.formModel.time_out
				? this.$moment(this.formModel.time_out)
				: this.$moment()
			var durasiMenit = timeOut.diff(timeIn, 'minutes')

			var tarifMenitPertama = tarif.tarif_menit_pertama

			// tak peduli flat atau progressif berlaku seperti ini
			if (durasiMenit <= tarif.menit_pertama) {
				this.formModel.tarif = tarifMenitPertama
				document.getElementById('submit-btn').focus()
				this.runningText(`${this.duration}|Rp${this.$decimal(this.totalBayar)}`)
				return
			}

			var durasiReal = durasiMenit - tarif.menit_pertama

			if (tarif.mode_menginap == 0) {
				var hariParkir = Math.ceil(durasiMenit / (60 * 24))

				if (hariParkir == 0 && tarif.mode_tarif == 0) {
					hariParkir = 1
				}
			}

			if (tarif.mode_menginap == 1) {
				var hariIn = this.$moment(timeIn.format('YYYY-MM-DD'))
				var hariOut = this.$moment(timeOut.format('YYYY-MM-DD'))
				var hariParkir = 0

				if (durasiMenit >= 60) {
					hariParkir = hariOut.diff(hariIn, 'days') + 1
				} else {
					hariParkir = 1
				}
			}

			var hariMenginap = hariParkir >= 1 ? hariParkir - 1 : 0
			var tarifMenginap = hariMenginap * tarif.tarif_menginap

			// tarif flat per hari, kena tarif menginap, kena tarif maximal
			if (tarif.mode_tarif == 0) {
				this.formModel.tarif =
					tarifMenitPertama + hariParkir * tarif.tarif_flat + tarifMenginap
			}

			if (tarif.mode_tarif == 1) {
				var tarifMaksimum = hariMenginap * tarif.tarif_maksimum

				if (tarif.mode_menginap == 0) {
					var tarifHariTerakhir =
						Math.ceil((durasiMenit % (60 * 24)) / tarif.menit_selanjutnya) *
						tarif.tarif_menit_selanjutnya

					if (tarifHariTerakhir > tarif.tarif_maksimum) {
						tarifHariTerakhir = tarif.tarif_maksimum
					}

					this.formModel.tarif =
						tarifMenitPertama +
						tarifMaksimum +
						tarifHariTerakhir +
						tarifMenginap
				}

				if (tarif.mode_menginap == 1) {
					if (hariParkir > 1) {
						var menitHariPertama =
							this.$moment(timeIn.format('YYYY-MM-DD') + ' 24:00:00').diff(
								timeIn,
								'minutes'
							) - tarif.menit_pertama

						var menitHariTerakhir = timeOut.diff(
							this.$moment(timeOut.format('YYYY-MM-DD') + ' 00:00:00'),
							'minutes'
						)

						var tarifHariPertama =
							Math.ceil(menitHariPertama / tarif.menit_selanjutnya) *
							tarif.tarif_menit_selanjutnya
						tarifHariTerakhir =
							Math.ceil(menitHariTerakhir / tarif.menit_selanjutnya) *
							tarif.tarif_menit_selanjutnya

						if (tarifHariPertama > tarif.tarif_maksimum) {
							tarifHariPertama = tarif.tarif_maksimum
						}

						if (tarifHariTerakhir > tarif.tarif_maksimum) {
							tarifHariTerakhir = tarif.tarif_maksimum
						}

						if (hariParkir <= 2) {
							tarifMaksimum = 0
						}

						this.formModel.tarif =
							tarifMenitPertama +
							tarifMaksimum +
							tarifHariPertama +
							tarifHariTerakhir +
							tarifMenginap
					} else {
						tarifHariPertama =
							Math.ceil(durasiReal / tarif.menit_selanjutnya) *
							tarif.tarif_menit_selanjutnya

						if (tarifHariPertama > tarif.tarif_maksimum) {
							tarifHariPertama = tarif.tarif_maksimum
						}

						this.formModel.tarif = tarifMenitPertama + tarifHariPertama
					}
				}
			}

			if (this.formModel.nomor_barcode.toLowerCase() == 'xxxxx') {
				document.getElementById('time-in').focus()
			} else {
				document.getElementById('submit-btn').focus()
			}

			this.runningText(`${this.duration}|Rp${this.$decimal(this.totalBayar)}`)
		},

		cekPlatNomor() {
			let params = { plat_nomor: this.formModel.plat_nomor }
			axios
				.get('/member/search', { params: params })
				.then((r) => {
					this.formModel.is_member = 1
					this.formModel.tarif = 0
				})
				.catch((e) => {
					this.formModel.is_member = 0
				})
				.finally(() => {
					console.log('chekPlatNomor')
					document.getElementById('nomor-tiket').focus()
					this.$forceUpdate()
				})
		},

		cekTiket() {
			if (this.formModel.nomor_barcode.length < 5) return

			let now = this.$moment().format('YYYY-MM-DD HH:mm:ss')

			if (this.formModel.nomor_barcode.toLowerCase() == 'xxxxx') {
				this.formModel.time_in = this.$moment().format('YYYY-MM-DD')
				this.formModel.time_out = now
				document.getElementById('jenis-kendaraan').focus()
				return
			}

			let params = { nomor_barcode: this.formModel.nomor_barcode }
			axios
				.get('/parkingTransaction/search', { params })
				.then((r) => {
					const data = r.data
					this.snapshots = data.snapshots
					this.formModel.id = data.id
					this.formModel.gate_in_id = data.gate_in_id
					this.formModel.time_in = data.time_in
					this.formModel.is_member = data.is_member
					this.formModel.time_out = now
					this.formModel.tarif = 0
					this.$forceUpdate()

					if (!data.is_member) {
						document.getElementById('jenis-kendaraan').focus()
						return false
					}

					if (!!data.member.expired) {
						this.$alert('Kartu telah habis masa berlaku', 'Perhatian', {
							type: 'warning',
							center: true,
							roundButton: true,
							confirmButtonText: 'OK',
							confirmButtonClass: 'bg-red',
						})
						this.formModel.is_member = 0
						return false
					}

					if (!data.member.expired && data.member.expired_in <= 5) {
						this.$alert(
							'Kartu akan habis masa berlaku dalam ' +
								data.member.expired_in +
								' hari',
							'Perhatian',
							{
								type: 'warning',
								center: true,
								roundButton: true,
								confirmButtonText: 'OK',
								confirmButtonClass: 'bg-red',
							}
						)
					}

					if (!!this.setting.disable_plat_nomor) {
						// member auto open sesuai setingan
						if (!!this.setting.member_auto_open) {
							this.formModel.jenis_kendaraan =
								data.member.vehicles[0].jenis_kendaraan

							const gateOut = this.gateOutList.find((g) => {
								return (
									g.pos_id == this.formModel.pos_id &&
									g.jenis_kendaraan.includes(this.formModel.jenis_kendaraan)
								)
							})

							if (!gateOut) {
								this.$message({
									message:
										'Tidak ada gate keluar untuk jenis kendaraan terkait',
									type: 'error',
								})
								return
							}

							this.formModel.gate_out_id = gateOut.id

							if (this.formModel.id) {
								this.takeSnapshot()
							}

							this.save(false)
						}
					} else {
						let vehicle = data.member.vehicles.find(
							(v) => v.plat_nomor == this.formModel.plat_nomor
						)

						if (!vehicle) {
							this.$alert(
								'Plat nomor tidak cocok dengan kartu. Nomor plat yang terdaftar adalah ' +
									data.member.vehicles.map((v) => v.plat_nomor).join(', '),
								'Perhatian',
								{
									type: 'warning',
									center: true,
									roundButton: true,
									confirmButtonText: 'OK',
									confirmButtonClass: 'bg-red',
								}
							)
							document.getElementById('plat-nomor').focus()
						} else {
							document.getElementById('jenis-kendaraan').focus()
						}
					}
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: 'error',
						showClose: true,
					})
					document.getElementById('nomor-tiket').focus()
				})
		},

		resetForm() {
			this.resetRunningText()
			this.formModel.tarif = ''
			this.formModel.denda = ''
			this.formModel.gate_in_id = null
			this.formModel.gate_out_id = null
			this.formModel.jenis_kendaraan = null
			this.formModel.plat_nomor = this.setting.plat_nomor_default
			this.formModel.nomor_barcode = ''
			this.formModel.time_out = ''
			this.formModel.time_in = ''
			this.formModel.duration = ''

			this.snapshots = []
			this.$forceUpdate()

			if (this.setting.disable_plat_nomor) {
				console.log('ke nomor tiket')
				document.getElementById('nomor-tiket').focus()
			} else {
				console.log('ke plat nomor')
				document.getElementById('plat-nomor').focus()
			}
		},

		submit(ticket) {
			// kalau tiket hilang harus isi time in dulu
			if (
				this.formModel.nomor_barcode.toLowerCase() == 'xxxxx' &&
				!this.formModel.time_in
			) {
				document.getElementById('time-in').focus()
				return
			} else {
				document.getElementById('submit-btn').blur()
			}

			if (this.gateInList.length == 1) {
				this.formModel.gate_in_id = this.gateInList[0].id
			}

			if (!this.formModel.gate_in_id) {
				this.$message({
					message: 'MOHON ISI GATE IN',
					type: 'error',
					showClose: true,
				})
				return
			}

			if (
				!this.formModel.nomor_barcode ||
				!this.formModel.gate_out_id ||
				!this.formModel.jenis_kendaraan ||
				!this.formModel.time_out ||
				!this.formModel.time_in
			) {
				return
			}

			if (this.formModel.time_in.length < 16) {
				this.$message({
					message: 'FORMAT TIME IN SALAH',
					type: 'error',
					showClose: true,
				})
				return
			}

			if (this.formModel.time_in.length == 16) {
				this.formModel.time_in += ':00'
			}

			this.save(ticket)
		},

		save(ticket) {
			this.formModel.ticket = ticket

			axios({
				method: this.formModel.id ? 'put' : 'post',
				url: this.formModel.id
					? `/parkingTransaction/${this.formModel.id}`
					: '/parkingTransaction',
				data: this.formModel,
			})
				.then((r) => {
					this.$message({
						message: r.data.message,
						type: 'success',
					})
					this.openGate(this.formModel.gate_out_id)
					this.resetForm()
				})
				.catch((e) => {
					this.$message({
						message: 'DATA GAGAL DISIMPAN',
						type: 'error',
					})
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

		runningText(text) {
			const pos = this.posList.find((p) => p.id == this.formModel.pos_id)
			const gate = this.gateOutList.find(
				(g) => g.id == this.formModel.gate_out_id
			)

			if (!gate.running_text_device || !gate.running_text_baudrate) {
				return
			}

			const ws = new WebSocket(`ws://${pos.ip_address}:5678/`)

			ws.onerror = (event) => {
				this.$message({
					message: 'KONEKSI KE RUNNING TEXT GAGAL',
					type: 'error',
				})
			}

			ws.onopen = (event) => {
				ws.send(
					[
						'rt',
						gate.running_text_device,
						gate.running_text_baudrate,
						text,
					].join(';')
				)
			}

			ws.onmessage = (event) => {
				let data = JSON.parse(event.data)
				console.log(data)
				ws.close()
			}
		},

		resetRunningText() {
			const pos = this.posList.find((p) => p.id == this.formModel.pos_id)
			const gate = this.gateOutList.find(
				(g) => g.id == this.formModel.gate_out_id
			)

			if (!gate.running_text_device || !gate.running_text_baudrate) {
				return
			}

			const ws = new WebSocket(`ws://${pos.ip_address}:5678/`)

			ws.onerror = (event) => {
				this.$message({
					message: 'KONEKSI KE RUNNING TEXT GAGAL',
					type: 'error',
				})
			}

			ws.onopen = (event) => {
				ws.send(
					['rrt', gate.running_text_device, gate.running_text_baudrate].join(
						';'
					)
				)
			}

			ws.onmessage = (event) => {
				let data = JSON.parse(event.data)
				console.log(data)
				ws.close()
			}
		},

		printLastTrx() {
			axios
				.post('/parkingTransaction/printLastTransaction', {
					pos_id: this.formModel.pos_id,
				})
				.then((r) => {
					this.$message({
						message: r.data.message,
						type: 'success',
						showClose: true,
					})
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: 'error',
						showClose: true,
					})
				})
		},

		printReport() {
			if (this.HIDE_PRINT_REPORT) {
				return
			}

			let payload = {
				pos_id: this.formModel.pos_id,
				date: this.$moment().format('YYYY-MM-DD'),
			}

			axios
				.post('/parkingTransaction/printReport', payload)
				.then((r) => {
					this.$message({
						message: 'SILAKAN AMBIL STRUK',
						type: 'success',
						showClose: true,
					})
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: 'error',
						showClose: true,
					})
				})
		},

		getSetting(state) {
			axios
				.get('/setting')
				.then((r) => {
					this.setting = r.data
					this.formModel.plat_nomor = r.data.plat_nomor_default

					if (this.setting.disable_plat_nomor) {
						document.getElementById('nomor-tiket').focus()
					} else {
						document.getElementById('plat-nomor').focus()
					}
				})
				.catch((e) => {
					this.$message({
						message: 'BELUM ADA SETTING',
						type: 'error',
						showClose: true,
						duration: 10000,
					})
				})
		},

		getPosList() {
			axios.get('/pos').then((r) => {
				if (r.data.length == 0) {
					this.$message({
						message: 'BELUM ADA POS',
						type: 'error',
						showClose: true,
						duration: 10000,
					})
				} else {
					this.posList = r.data

					if (this.posList.length == 1) {
						this.formModel.pos_id = r.data[0].id

						if (r.data[0].gate_outs.length == 1) {
							this.formModel.gate_out_id = r.data[0].gate_outs[0].id
						}
					}
				}
			})
		},

		takeSnapshot() {
			axios
				.post(`/parkingTransaction/takeSnapshot/${this.formModel.id}`, {
					gate_out_id: this.formModel.gate_out_id,
				})
				.then((r) => {
					this.snapshots = r.data
					this.$forceUpdate()
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
		this.$store.dispatch('getNavigationList')
		this.getSetting()
		this.getPosList()
		this.$store.dispatch('getGateInList')
		this.$store.dispatch('getGateOutList')
		this.$store.dispatch('getJenisKendaraanList')

		document.getElementById('gate-out-app').onkeydown = (e) => {
			// console.log(e.key)
			// ke field nomor plat
			if (e.key == '-') {
				e.preventDefault()
				this.resetForm()
				this.$forceUpdate()
			}

			// ke field nomor tiket
			if (e.key == '+') {
				e.preventDefault()
				this.formModel.nomor_barcode = ''
				this.formModel.time_out = ''
				this.formModel.jenis_kendaraan = ''
				this.formModel.tarif = ''
				document.getElementById('nomor-tiket').focus()
			}

			// ke field jenis kendaraan
			if (e.key == '*') {
				e.preventDefault()
				this.formModel.jenis_kendaraan = ''
				this.formModel.tarif = ''
				document.getElementById('jenis-kendaraan').focus()
			}

			// ke field time in
			if (e.key == '/') {
				e.preventDefault()
				this.formModel.time_in = ''
				document.getElementById('time-in').focus()
			}

			if (e.key == 'F10') {
				e.preventDefault()
				this.printReport()
			}

			if (e.key == 'F11') {
				e.preventDefault()
				this.showManualOpenForm = true
			}

			if (e.key == 'F12') {
				e.preventDefault()
				this.printLastTrx()
			}
		}
	},
}
</script>

<style lang="css" scoped>
.block {
	background-color: #eee;
	height: calc(50vh - 73px);
}

.my-input {
	height: 43px;
	line-height: 43px;
	box-sizing: border-box;
	width: 100%;
	@apply border-2 border-blue-800 text-3xl py-0 px-3;
}

.my-input:focus,
.my-input-time:focus {
	@apply bg-yellow-300;
}

.my-input-time {
	border: 2px solid #160047;
	height: 43px;
	line-height: 43px;
	font-size: 20px;
	display: block;
	width: 100%;
	padding: 0px 10px;
	box-sizing: border-box;
}

.label-big {
	height: 43px;
	line-height: 43px;
	@apply bg-blue-800 text-white text-xl pl-3;
}

.my-big-btn {
	box-sizing: border-box;
	width: 100%;
	border: none;
	font-size: 20px;
	height: 43px;
	line-height: 43px;
	background-color: #254ec1;
	color: #fff;
	border-radius: 4px;
	margin-top: 10px;
}

.my-big-btn:focus {
	@apply bg-red-600;
}
</style>

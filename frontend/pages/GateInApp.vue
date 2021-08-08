<template>
	<div id="gate-in-app" style="padding: 0px 200px">
		<h1 style="text-align: center; font-size: 26px">{{ location.name }}</h1>
		<div style="text-align: center">{{ location.address }}</div>
		<el-divider></el-divider>
		<el-row :gutter="10" style="margin-bottom: 10px">
			<el-col :span="10">
				<div class="label-big">GATE IN</div>
			</el-col>
			<el-col :span="14">
				<select v-model="formModel.gate_in_id" id="gate-in" class="my-input">
					<option
						v-for="g in parkingGateList.filter((g) => g.type == 'IN')"
						:value="g.id"
						:key="g.id"
					>
						{{ g.name }}
					</option>
				</select>
			</el-col>
		</el-row>

		<el-row :gutter="10" style="margin-bottom: 10px">
			<el-col :span="10">
				<div class="label-big">[*] JENIS KENDARAAN</div>
			</el-col>
			<el-col :span="14">
				<select
					placeholder="JENIS KENDARAAN"
					@change="setFare"
					v-model="formModel.vehicle_type"
					id="vehicle-type"
					class="my-input"
				>
					<option v-for="g in vehicleTypeList" :value="g.name" :key="g.id">
						{{ g.shortcut_key }} - {{ g.name }}
					</option>
				</select>
				<!-- <div style="padding:3px 10px;font-weight:bold;" class="bg-yellow">
                    {{vehicleTypeList.map(vt => vt.shortcut_key + ' = ' + vt.name).join(', ')}}
                </div> -->
			</el-col>
		</el-row>

		<el-row :gutter="10" style="margin-bottom: 10px">
			<el-col :span="10">
				<div class="label-big">[-] NO. PLAT</div>
			</el-col>
			<el-col :span="14">
				<input
					id="plate-number"
					autocomplete="off"
					@keyup.enter="submit"
					type="text"
					placeholder="NO. PLAT"
					v-model="formModel.plate_number"
					class="my-input"
				/>
			</el-col>
		</el-row>

		<el-row :gutter="10" style="margin-bottom: 10px">
			<el-col :span="10">
				<div class="label-big">TARIF</div>
			</el-col>
			<el-col :span="14">
				<input disabled v-model="formModel.fare" class="my-input tarif-input" />
			</el-col>
		</el-row>

		<button class="my-big-btn" @click="submit">
			[ENTER] PRINT TIKET & BUKA GATE
		</button>
	</div>
</template>

<script>
export default {
	data() {
		return {
			formModel: {},
			formErrors: {},
			location: {},
			parkingGateList: [],
			vehicleTypeList: [],
		}
	},
	methods: {
		generateBarcodeNumber() {
			let result = ''
			let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
			for (let i = 0; i < 5; i++) {
				result += characters.charAt(
					Math.floor(Math.random() * characters.length)
				)
			}
			return result
		},
		setFare() {
			let vehicle = this.vehicleTypeList.find(
				(vt) => vt.name == this.formModel.vehicle_type
			)
			if (vehicle) {
				this.formModel.fare = this.formModel.is_member ? 0 : vehicle.tarif_flat
				this.$forceUpdate()
			}
			document.getElementById('plate-number').focus()
		},
		resetForm() {
			let default_vehicle = this.vehicleTypeList.find((v) => v.is_default == 1)
			this.formModel.plate_number = this.location.default_plate_number

			if (default_vehicle) {
				this.formModel.vehicle_type = default_vehicle.name
				this.formModel.fare = default_vehicle.tarif_flat
			} else {
				this.formModel.vehicle_type = ''
				this.formModel.fare = ''
			}

			this.$forceUpdate()
			document.getElementById('plate-number').focus()
		},
		submit() {
			if (
				!this.formModel.gate_in_id ||
				!this.formModel.plate_number ||
				!this.formModel.vehicle_type
			) {
				return
			}

			let params = { plate_number: this.formModel.plate_number }
			axios
				.get('/parkingMember/search', { params: params })
				.then((r) => {
					this.formModel.fare = 0
					this.formModel.is_member = 1
					this.formModel.member_id = r.data.id
				})
				.catch((e) => {
					this.formModel.is_member = 0
					this.formModel.member_id = null
				})
				.finally(() => {
					this.formModel.barcode_number = this.generateBarcodeNumber()
					this.formModel.time_in = this.$moment().format('YYYY-MM-DD HH:mm:ss')
					this.formModel.time_out = this.$moment().format('YYYY-MM-DD HH:mm:ss')

					axios
						.post('/parkingTransaction', this.formModel)
						.then((r) => {
							this.printTicket(r.data.id)
						})
						.catch((e) => {
							this.$message({
								message: 'DATA GAGAL DISIMPAN',
								type: 'error',
								showClose: true,
							})
						})
				})
		},
		printTicket(id) {
			axios
				.post('/parkingTransaction/printTicket/' + id, { trx: 'IN' })
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
				.finally(() => {
					setTimeout(this.openGate, 3000)
				})
		},
		openGate() {
			axios
				.post('/parkingGate/openGate/' + this.formModel.gate_in_id)
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
				.finally(() => {
					this.resetForm()
				})
		},
		getLocationIdentity() {
			axios
				.get('/locationIdentity/search', { params: { active: 1 } })
				.then((r) => {
					this.location = r.data
					this.formModel.plate_number = r.data.default_plate_number
				})
				.catch((e) => {
					this.$message({
						message: 'MOHON SET LOKASI',
						type: 'error',
						showClose: true,
					})
				})
		},
		getParkingGateList() {
			axios
				.get('/parkingGate/getList')
				.then((r) => {
					this.parkingGateList = r.data

					if (r.data.filter((g) => g.type == 'IN').length == 0) {
						this.$message({
							message: 'MOHON SET GATE IN',
							type: 'error',
							showClose: true,
						})
						return
					}

					this.formModel.gate_in_id = r.data.find((g) => g.type == 'IN').id
				})
				.catch((e) => {
					this.$message({
						message: 'MOHON SET GATE',
						type: 'error',
						showClose: true,
					})
				})
		},
		getVehicleTypeList() {
			axios
				.get('/vehicleType/getList')
				.then((r) => {
					if (r.data.length == 0) {
						this.$message({
							message: 'MOHON SET JENIS KENDARAAN',
							type: 'error',
							showClose: true,
						})
						return
					}

					this.vehicleTypeList = r.data
					let default_vehicle = r.data.find((v) => v.is_default == 1)

					if (default_vehicle) {
						this.formModel.vehicle_type = default_vehicle.name
						this.formModel.fare = default_vehicle.tarif_flat
						this.$forceUpdate()
					} else {
						this.$message({
							message: 'MOHON SET DEFAULT JENIS KENDARAAN',
							type: 'error',
							showClose: true,
						})
					}
				})
				.catch((e) => {
					this.$message({
						message: 'MOHON SET JENIS KENDARAAN',
						type: 'error',
						showClose: true,
					})
				})
		},
	},
	mounted() {
		this.getLocationIdentity()
		this.getParkingGateList()
		this.getVehicleTypeList()
		document.getElementById('plate-number').focus()

		document.getElementById('gate-in-app').onkeypress = (e) => {
			// ke field nomor plat
			if (e.key == '-') {
				e.preventDefault()
				this.resetForm()
				this.$forceUpdate()
				document.getElementById('plate-number').focus()
			}

			// ke field jenis kendaraan
			if (e.key == '*') {
				e.preventDefault()
				this.formModel.vehicle_type = ''
				this.formModel.fare = ''
				document.getElementById('vehicle-type').focus()
			}
		}
	},
}
</script>

<style lang="scss" scoped>
.my-input {
	border: 2px solid #160047;
	height: 45px;
	line-height: 45px;
	font-size: 30px;
	display: block;
	width: 100%;
	padding: 0px 15px;
	box-sizing: border-box;
}

.my-input:focus,
.my-input-time:focus {
	background: rgb(255, 246, 122);
}

.label-big {
	box-sizing: border-box;
	background-color: #160047;
	color: #fff;
	padding-left: 15px;
	font-size: 20px;
	height: 45px;
	line-height: 45px;
}

.tarif-input {
	background: rgb(199, 24, 24);
	color: #fff;
}

.my-big-btn {
	box-sizing: border-box;
	width: 100%;
	border: none;
	font-size: 20px;
	height: 45px;
	line-height: 45px;
	background-color: #254ec1;
	color: #fff;
	border-radius: 4px;
	margin-top: 10px;
}

.label {
	box-sizing: border-box;
	background-color: #160047;
	color: #fff;
	text-align: center;
	padding: 10px;
}

.text-center {
	text-align: center;
}
</style>

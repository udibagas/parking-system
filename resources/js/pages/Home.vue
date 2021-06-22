<template>
	<div id="gate-in-app">
		<!-- <h1 style="text-align:center;font-size:26px;">{{setting.location_name}}</h1>
    <div style="text-align:center">{{setting.location_address}}</div>
    <el-divider></el-divider>-->

		<el-row :gutter="20">
			<el-col :span="12">
				<el-row :gutter="10" style="margin-bottom: 10px">
					<el-col :span="10">
						<div class="label-big">[/] NO. KARTU</div>
					</el-col>
					<el-col :span="14">
						<input
							id="card-number"
							autocomplete="off"
							@keyup.enter="checkCard"
							type="text"
							placeholder="NO. KARTU"
							v-model="formModel.card_number"
							class="my-input"
						/>
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
							@keyup.enter="toVehicleField"
							type="text"
							placeholder="NO. PLAT"
							v-model="formModel.plate_number"
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
							placeholder="JENIS KENDARAAN"
							@change="toDriveThruField"
							v-model="formModel.vehicle_type"
							id="vehicle-type"
							class="my-input"
						>
							<option v-for="g in vehicleTypeList" :value="g.name" :key="g.id">
								{{ g.shortcut_key }} - {{ g.name }}
							</option>
						</select>
					</el-col>
				</el-row>

				<el-row :gutter="10" style="margin-bottom: 10px">
					<el-col :span="10">
						<div class="label-big">[+] DRIVE THRU</div>
					</el-col>
					<el-col :span="14">
						<select
							placeholder="DRIVE THRU"
							v-model="formModel.drive_thru"
							@change="setFare"
							id="drive-thru"
							class="my-input"
						>
							<option :value="0">0 - TIDAK</option>
							<option :value="1">1 - YA</option>
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
							v-model="formModel.fare"
							class="my-input tarif-input"
						/>
					</el-col>
				</el-row>

				<button class="my-big-btn" id="submit-button" @click="submit">
					[ENTER] PRINT TIKET & BUKA GATE
				</button>

				<br />
				<button
					@keydown.enter="printReport"
					class="my-big-btn"
					@click="printReport"
				>
					[F10] PRINT LAPORAN
				</button>
			</el-col>
			<el-col :span="12">
				<el-image
					:src="snapshot_in"
					style="width: 100%; height: 100%"
					fit="cover"
				>
					<div slot="error" class="el-image__error">
						<h1>SNAPSHOT</h1>
					</div>
				</el-image>
			</el-col>
		</el-row>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	data() {
		return {
			formModel: {},
			formErrors: {},
			location: {},
			vehicleTypeList: [],
			snapshot_in: null,
			pos: {}
		};
	},
	computed: {
		...mapState(["setting"])
	},
	methods: {
		toVehicleField() {
			document.getElementById("vehicle-type").focus();
		},

		toDriveThruField() {
			document.getElementById("drive-thru").focus();
		},

		generateBarcodeNumber() {
			let result = "";
			let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
			for (let i = 0; i < 5; i++) {
				result += characters.charAt(
					Math.floor(Math.random() * characters.length)
				);
			}
			return result;
		},

		setFare() {
			if (this.formModel.is_member || this.formModel.drive_thru) {
				this.formModel.fare = 0;
			} else {
				let vehicle = this.vehicleTypeList.find(
					vt => vt.name == this.formModel.vehicle_type
				);
				if (vehicle) {
					this.formModel.fare = vehicle.tarif_flat;
				}
			}

			this.$forceUpdate();
			document.getElementById("submit-button").focus();
		},

		checkCard() {
			const params = { card_number: this.formModel.card_number };
			axios
				.get("/parkingMember/search", { params })
				.then(r => {
					this.formModel.is_member = true;

					if (!!r.data.expired) {
						this.$alert("Kartu telah habis masa berlaku", "Perhatian", {
							type: "warning",
							center: true,
							roundButton: true,
							confirmButtonText: "OK",
							confirmButtonClass: "bg-red"
						});
						this.formModel.is_member = 0;
						return;
					}

					if (!r.data.expired && r.data.expired_in <= 5) {
						this.$alert(
							"Kartu akan habis masa berlaku dalam " +
								r.data.expired_in +
								" hari",
							"Perhatian",
							{
								type: "warning",
								center: true,
								roundButton: true,
								confirmButtonText: "OK",
								confirmButtonClass: "bg-red"
							}
						);
					}

					let vehicle = null;

					if (this.setting.member_auto_open) {
						// langsung ambil data yg pertama
						this.formModel.plate_number = r.data.vehicles[0].plate_number;
						this.formModel.vehicle_type = r.data.vehicles[0].vehicle_type;
						this.formModel.drive_thru = 0;
						this.submit();
						this.openGate();
						return;
					}

					vehicle = r.data.vehicles.find(
						v => v.plate_number == this.formModel.plate_number
					);

					if (!vehicle) {
						this.$alert(
							"Plat nomor tidak cocok dengan kartu. Nomor plat yang terdaftar adalah " +
								r.data.vehicles.map(v => v.plate_number).join(", "),
							"Perhatian",
							{
								type: "warning",
								center: true,
								roundButton: true,
								confirmButtonText: "OK",
								confirmButtonClass: "bg-red"
							}
						);
						document.getElementById("plate-number").focus();
					} else {
						document.getElementById("vehicle-type").focus();
					}
				})
				.catch(e => {
					document.getElementById("plate-number").focus();
					this.$message({
						message: e.response.data.message,
						type: "error",
						showClose: true
					});
				});
		},

		resetForm() {
			this.formModel.plate_number = this.setting.default_plate_number;
			this.formModel.card_number = "";
			this.formModel.vehicle_type = "";
			this.formModel.fare = "";
			this.formModel.drive_thru = "";
			this.snapshot_in = null;
			this.$forceUpdate();
			document.getElementById("card-number").focus();
		},

		submit() {
			if (!this.formModel.plate_number || !this.formModel.vehicle_type) {
				return;
			}

			let params = { plate_number: this.formModel.plate_number };
			axios
				.get("/parkingMember/search", { params: params })
				.then(r => {
					this.formModel.fare = 0;
					this.formModel.is_member = 1;
					this.formModel.parking_member_id = r.data.id;
				})
				.catch(e => {
					this.formModel.is_member = 0;
					this.formModel.parking_member_id = null;
				})
				.finally(() => {
					this.formModel.barcode_number = this.generateBarcodeNumber();
					this.formModel.time_in = moment().format("YYYY-MM-DD HH:mm:ss");

					axios
						.post("/parkingTransaction", this.formModel)
						.then(r => {
							if (!this.formModel.drive_thru || !this.formModel.is_member) {
								this.printTicket(r.data.id);
							}
							this.takeSnapshot(r.data.id);
						})
						.catch(e => {
							this.$message({
								message: "DATA GAGAL DISIMPAN",
								type: "error",
								showClose: true
							});
						});
				});
		},

		printTicket(id) {
			axios
				.post("/parkingTransaction/printTicket/" + id)
				.then(r => {
					this.$message({
						message: r.data.message,
						type: "success",
						showClose: true
					});
				})
				.catch(e => {
					this.$message({
						message: e.response.data.message,
						type: "error",
						showClose: true
					});
				})
				.finally(() => {
					setTimeout(this.openGate, 3000);
				});
		},

		takeSnapshot(id) {
			axios
				.post("/parkingTransaction/takeSnapshot/" + id)
				.then(r => {
					this.snapshot_in = r.data.snapshot_in;
				})
				.catch(e => {
					this.$message({
						message: e.response.data.message,
						type: "error",
						showClose: true
					});
				});
		},

		openGate() {
			const pos = this.pos;
			const ws = new WebSocket(`ws://${pos.ip_address}:5678/`);

			ws.onerror = event => {
				this.$message({
					message: "KONEKSI KE POS GAGAL",
					type: "error"
				});
			};

			ws.onopen = event => {
				ws.send(
					[
						"open",
						pos.gate_device,
						pos.gate_baudrate,
						pos.gate_command_open,
						pos.gate_command_close
					].join(";")
				);
			};

			ws.onmessage = event => {
				let data = JSON.parse(event.data);
				this.$message({
					message: data.message,
					type: data.status ? "success" : "error"
				});
				ws.close();
			};
		},

		printReport() {
			let payload = { date: moment().format("YYYY-MM-DD") };

			axios
				.post("/parkingTransaction/printReport", payload)
				.then(r => {
					this.$message({
						message: "SILAKAN AMBIL STRUK",
						type: "success",
						showClose: true
					});
				})
				.catch(e => {
					this.$message({
						message: e.response.data.message,
						type: "error",
						showClose: true
					});
				});
		},

		getVehicleTypeList() {
			axios
				.get("/vehicleType")
				.then(r => {
					if (r.data.length == 0) {
						this.$message({
							message: "MOHON SET JENIS KENDARAAN",
							type: "error",
							showClose: true
						});
						return;
					}

					this.vehicleTypeList = r.data;
				})
				.catch(e => {
					this.$message({
						message: "MOHON SET JENIS KENDARAAN",
						type: "error",
						showClose: true
					});
				});
		},

		getPos() {
			axios
				.get("getPosByIp")
				.then(r => (this.pos = r.data))
				.catch(e => {
					this.$message({
						message: e.response.data.message,
						type: "error",
						showClose: true
					});
				});
		}
	},

	mounted() {
		this.$store.commit("getSetting");
		this.getPos();

		setTimeout(() => {
			this.formModel.plate_number = this.setting.default_plate_number;
			this.$forceUpdate();
		}, 100);
		this.getVehicleTypeList();
		document.getElementById("card-number").focus();

		document.getElementById("gate-in-app").onkeypress = e => {
			// ke field nomor plat
			if (e.key == "/") {
				e.preventDefault();
				this.formModel.card_number = "";
				this.$forceUpdate();
				document.getElementById("card-number").focus();
			}

			if (e.key == "-") {
				e.preventDefault();
				this.resetForm();
				this.$forceUpdate();
				document.getElementById("plate-number").focus();
			}

			// ke field jenis kendaraan
			if (e.key == "*") {
				e.preventDefault();
				this.formModel.vehicle_type = "";
				this.formModel.fare = "";
				document.getElementById("vehicle-type").focus();
			}

			// ke field drive thru
			if (e.key == "+") {
				e.preventDefault();
				this.formModel.drive_thru = "";
				document.getElementById("drive-thru").focus();
			}

			// print report
			if (e.key == "F10") {
				e.preventDefault();
				this.printReport();
			}
		};
	}
};
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

.my-big-btn:focus {
	background: rgb(199, 24, 24);
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

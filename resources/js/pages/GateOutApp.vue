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
						id="ticket-number"
						autocomplete="off"
						@keyup.enter="cekTiket"
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
				v-if="
					gateOutList.filter((g) => g.pos_id == formModel.pos_id).length > 1
				"
				:gutter="10"
				style="margin-bottom: 10px"
			>
				<el-col :span="10">
					<div class="label-big">GATE KELUAR</div>
				</el-col>
				<el-col :span="14">
					<select
						v-model="formModel.gate_out_id"
						id="gate-out"
						class="my-input"
					>
						<option
							v-for="g in gateOutList.filter(
								(g) => g.pos_id == formModel.pos_id
							)"
							:value="g.id"
							:key="g.id"
						>
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
					<div class="label-big">GATE IN</div>
				</el-col>
				<el-col :span="14">
					<select
						@change="toSubmit"
						v-model="formModel.gate_in_id"
						id="gate-in"
						class="my-input"
					>
						<option v-for="g in gateInList" :value="g.id" :key="g.id">
							{{ g.shortcut_key }} - {{ g.name }}
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
						v-model="totalBayar"
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
				<el-col :span="12">
					<button
						@keydown.enter="printReport"
						class="my-big-btn"
						@click="printReport"
					>
						[F10] PRINT LAPORAN
					</button>
				</el-col>
				<el-col :span="12">
					<button
						@keydown.enter="
							() => {
								showManualOpenForm = true;
								formModelManualOpen = {};
							}
						"
						class="my-big-btn"
						@click="
							() => {
								showManualOpenForm = true;
								formModelManualOpen = {};
							}
						"
					>
						[F11] BUKA GATE MANUAL
					</button>
				</el-col>
			</el-row>
		</div>
		<div class="ml-5 flex-grow">
			<img v-for="s in snapshots" :key="s.id" :src="s.url" alt="" />
		</div>

		<FormBukaManual
			:show="showManualOpenForm"
			@close="showManualOpenForm = false"
			@open-gate="(gate_out_id) => openGate(gate_in_id)"
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
import { mapState } from "vuex";
import FormBukaManual from "../components/FormBukaManual";

export default {
	components: { FormBukaManual },
	computed: {
		...mapState(["gateOutList", "gateInList", "jenisKendaraanList"]),
	},
	watch: {
		"formModel.pos_id"(v) {
			if (!v) {
				document.getElementById("pos-id").focus();
			} else {
				document.getElementById("plat-nomor").focus();
			}
		},
	},
	data() {
		return {
			formModel: { nomor_barcode: "" },
			formErrors: {},
			snapshots: [],
			setting: {},
			showManualOpenForm: false,
			totalBayar: 0,
			posList: [],
		};
	},
	methods: {
		toSubmit() {
			document.getElementById("submit-btn").focus();
		},
		toGateIn() {
			if (!this.formModel.gate_in_id) {
				document.getElementById("gate-in").focus();
			} else {
				document.getElementById("submit-btn").focus();
			}
		},
		nextBtn() {
			document.getElementById("submit-btn1").focus();
		},
		prevBtn() {
			document.getElementById("submit-btn").focus();
		},
		hitungTarif() {
			if (this.formModel.is_member) {
				this.formModel.tarif = 0;
				this.$forceUpdate();

				if (
					this.gateOutList.filter((g) => g.pos_id == this.formModel.pos_id)
						.length > 1
				) {
					document.getElementById("gate-out").focus();
				} else {
					document.getElementById("submit-btn").focus();
				}

				return;
			}

			const tarif = this.jenisKendaraanList.find(
				(v) => v.nama == this.formModel.jenis_kendaraan
			);

			if (!tarif) {
				this.$message({
					message:
						"Tarif tidak ditemukan untuk jenis kendaraan " +
						this.formModel.jenis_kendaraan,
					type: "error",
					showClose: true,
				});
				this.formModel.tarif = 0;
				this.$forceUpdate();
				return;
			}

			if (this.formModel.nomor_barcode.toLowerCase() == "xxxxx") {
				if (
					this.gateOutList.filter((g) => g.pos_id == this.formModel.pos_id)
						.length > 1
				) {
					document.getElementById("gate-out").focus();
				} else {
					document.getElementById("submit-btn").focus();
				}

				document.getElementById("time-in").focus();
				this.formModel.denda = tarif.denda_tiket_hilang;
			} else {
				if (
					this.gateOutList.filter((g) => g.pos_id == this.formModel.pos_id)
						.length > 1
				) {
					document.getElementById("gate-out").focus();
				} else {
					document.getElementById("submit-btn").focus();
				}
			}

			if (tarif.mode_tarif == 0) {
				this.formModel.tarif = tarif.tarif_flat;
				this.totalBayar = this.formModel.denda + this.formModel.tarif;
				this.$forceUpdate();
				return;
			}

			const timeIn = moment(this.formModel.time_in);
			const timeOut = moment(this.formModel.time_out);
			const durasi = timeOut.diff(timeIn, "minutes");
			const duration = moment.duration(timeOut.diff(timeIn));
			this.formModel.duration = moment
				.utc(duration.asMilliseconds())
				.format("DD HH:mm:ss");

			// buat hitung hari lewat tengah malem
			const dateIn = moment(this.formModel.time_in.slice(0, 10));
			const dateOut = moment(this.formModel.time_out.slice(0, 10));

			// hitung dia menginap berapa hari (jumlah hari * tarif)
			const hari_menginap =
				tarif.mode_menginap == 0
					? timeOut.diff(timeIn, "days") // mode 24 jam
					: dateOut.diff(dateIn, "days"); // mode lewat tengah malam

			const tarif_menginap = hari_menginap * tarif.tarif_menginap;

			// mode 24 jam
			if (tarif.mode_menginap == 0) {
				const tarif_maksimum = hari_menginap * tarif.tarif_maksimum;
				// sisa menit
				const sisa_menit = durasi % (60 * 24);
				let tarif_sisa_menit = tarif.tarif_menit_pertama;

				// kalau menitnya lebih dari atau sama dengan menit pertama
				if (sisa_menit > tarif.menit_pertama) {
					const menit_selanjutnya = sisa_menit - tarif.menit_pertama;
					const tarif_menit_selanjutnya =
						Math.ceil(menit_selanjutnya / tarif.menit_selanjutnya) *
						tarif.tarif_menit_selanjutnya;
					tarif_sisa_menit += tarif_menit_selanjutnya;

					if (tarif_sisa_menit > tarif.tarif_maksimum) {
						tarif_sisa_menit = tarif.tarif_maksimum;
					}
				}

				this.formModel.tarif =
					tarif_menginap + tarif_maksimum + tarif_sisa_menit;
			}

			// mode lewat tengah malam
			else {
				const tarif_maksimum = (hari_menginap - 1) * tarif.tarif_maksimum;
				const menit_hari_pertama = moment(
					this.formModel.time_in.slice(0, 10) + " 24:00:00"
				).diff(timeIn, "minutes");
				const menit_hari_terakhir = timeOut.diff(dateOut, "minutes");
				// hitung menit selanjutnya
				const menit_selanjutnya_hari_pertama =
					menit_hari_pertama - tarif.menit_pertama;
				const menit_selanjutnya_hari_terakhir =
					menit_hari_terakhir - tarif.menit_pertama;

				// tarif menit pertama hari pertama & terakhir by default = tarif menit pertama
				let tarif_hari_pertama = tarif.tarif_menit_pertama;
				let tarif_hari_terakhir = tarif.tarif_menit_pertama;

				if (menit_selanjutnya_hari_pertama > 0) {
					tarif_hari_pertama +=
						Math.ceil(
							menit_selanjutnya_hari_pertama / tarif.menit_selanjutnya
						) * tarif.tarif_menit_selanjutnya;
				}

				if (menit_selanjutnya_hari_terakhir > 0) {
					tarif_hari_terakhir +=
						Math.ceil(
							menit_selanjutnya_hari_terakhir / tarif.menit_selanjutnya
						) * tarif.tarif_menit_selanjutnya;
				}

				if (tarif_hari_pertama > tarif.tarif_maksimum) {
					tarif_hari_pertama = tarif.tarif_maksimum;
				}

				if (tarif_hari_terakhir > tarif.tarif_maksimum) {
					tarif_hari_terakhir = tarif.tarif_maksimum;
				}

				this.formModel.tarif =
					tarif_menginap +
					tarif_maksimum +
					tarif_hari_pertama +
					tarif_hari_terakhir;
			}

			this.totalBayar = this.formModel.denda + this.formModel.tarif;
			this.$forceUpdate();
		},
		cekPlatNomor() {
			let params = { plat_nomor: this.formModel.plat_nomor };
			axios
				.get("/parkingMember/search", { params: params })
				.then((r) => {
					this.formModel.is_member = 1;
					this.formModel.tarif = 0;
				})
				.catch((e) => {
					this.formModel.is_member = 0;
				})
				.finally(() => {
					document.getElementById("ticket-number").focus();
					this.$forceUpdate();
				});
		},
		cekTiket() {
			let now = moment().format("YYYY-MM-DD HH:mm:ss");

			if (this.formModel.nomor_barcode.toLowerCase() == "xxxxx") {
				this.formModel.time_in = moment().format("YYYY-MM-DD");
				this.formModel.time_out = now;
				document.getElementById("jenis-kendaraan").focus();
			} else {
				let params = { nomor_barcode: this.formModel.nomor_barcode };
				axios
					.get("/parkingTransaction/search", { params })
					.then((r) => {
						const data = r.data;
						this.snapshots = data.snapshots;
						this.formModel.id = data.id;
						this.formModel.gate_in_id = data.gate_in_id;
						this.formModel.time_in = data.time_in;
						this.formModel.is_member = data.is_member;
						this.formModel.jenis_kendaraan = data.jenis_kendaraan;
						this.formModel.time_out = now;
						this.formModel.tarif = 0;
						this.hitungTarif();

						if (!data.is_member) {
							document.getElementById("jenis-kendaraan").focus();
							return;
						}

						if (!!data.member.expired) {
							this.$alert("Kartu telah habis masa berlaku", "Perhatian", {
								type: "warning",
								center: true,
								roundButton: true,
								confirmButtonText: "OK",
								confirmButtonClass: "bg-red",
							});
							this.formModel.is_member = 0;
							return;
						}

						if (!data.member.expired && data.member.expired_in <= 5) {
							this.$alert(
								"Kartu akan habis masa berlaku dalam " +
									data.member.expired_in +
									" hari",
								"Perhatian",
								{
									type: "warning",
									center: true,
									roundButton: true,
									confirmButtonText: "OK",
									confirmButtonClass: "bg-red",
								}
							);
						}

						if (!!this.setting.disable_plat_nomor) {
							this.$confirm(
								"Plat nomor yang terdaftar atas kartu ini adalah " +
									data.member.vehicles.map((v) => v.plat_nomor).join(", "),
								"Perhatian",
								{
									type: "warning",
									center: true,
									roundButton: true,
									confirmButtonText: "SESUAI",
									cancelButtonText: "TIDAK SESUAI",
								}
							)
								.then(() => {
									if (data.member.vehicles.length == 1) {
										this.formModel.plat_nomor =
											data.member.vehicles[0].plat_nomor;
									}

									// member auto open sesuai setingan
									if (!!this.setting.member_auto_open) {
										this.update(false);
									}
								})
								.catch(() => {
									this.formModel.is_member = 0;
									return;
								});
						} else {
							let vehicle = data.member.vehicles.find(
								(v) => v.plat_nomor == this.formModel.plat_nomor
							);

							if (!vehicle) {
								this.$alert(
									"Plat nomor tidak cocok dengan kartu. Nomor plat yang terdaftar adalah " +
										data.member.vehicles.map((v) => v.plat_nomor).join(", "),
									"Perhatian",
									{
										type: "warning",
										center: true,
										roundButton: true,
										confirmButtonText: "OK",
										confirmButtonClass: "bg-red",
									}
								);
								document.getElementById("plat-nomor").focus();
							} else {
								document.getElementById("jenis-kendaraan").focus();
							}
						}
					})
					.catch((e) => {
						console.log(e);
						this.$message({
							message: e.response.data.message,
							type: "error",
							showClose: true,
						});
					});
			}
		},
		resetForm() {
			let default_vehicle = this.jenisKendaraanList.find(
				(v) => v.is_default == 1
			);
			this.formModel.gate_in_id = null;
			this.formModel.plat_nomor = this.setting.default_plat_nomor;
			this.formModel.nomor_barcode = "";
			this.formModel.time_out = "";
			this.formModel.time_in = "";
			this.formModel.duration = "";
			this.snapshots = [];

			if (default_vehicle) {
				this.formModel.jenis_kendaraan = default_vehicle.name;
				this.formModel.tarif = default_vehicle.tarif_flat;
			} else {
				this.formModel.jenis_kendaraan = "";
				this.formModel.tarif = "";
			}

			if (this.setting.disable_plat_nomor) {
				document.getElementById("ticket-number").focus();
			} else {
				document.getElementById("plat-nomor").focus();
			}
		},
		submit(ticket) {
			// kalau tiket hilang harus isi time in dulu
			if (
				this.formModel.nomor_barcode.toLowerCase() == "xxxxx" &&
				!this.formModel.time_in
			) {
				document.getElementById("time-in").focus();
				return;
			} else {
				document.getElementById("submit-btn").blur();
			}

			if (!this.formModel.gate_in_id) {
				this.$message({
					message: "MOHON ISI GATE IN",
					type: "error",
					showClose: true,
				});
				return;
			}

			if (
				!this.formModel.nomor_barcode ||
				!this.formModel.gate_out_id ||
				!this.formModel.jenis_kendaraan ||
				!this.formModel.time_out ||
				!this.formModel.time_in
			) {
				return;
			}

			if (this.formModel.time_in.length < 16) {
				this.$message({
					message: "FORMAT TIME IN SALAH",
					type: "error",
					showClose: true,
				});
				return;
			}

			if (this.formModel.time_in.length == 16) {
				this.formModel.time_in += ":00";
			}

			if (!!this.formModel.id) {
				this.update(ticket);
			} else {
				this.store(ticket);
			}
		},
		store(ticket) {
			this.formModel.ticket = ticket;
			axios
				.post("/parkingTransaction", this.formModel)
				.then((r) => {
					this.openGate(this.formModel.gate_out_id);
				})
				.catch((e) => {
					this.$message({
						message: "DATA GAGAL DISIMPAN",
						type: "error",
						showClose: true,
					});
				});
		},
		update(ticket) {
			this.formModel.ticket = ticket;
			axios
				.put(`/parkingTransaction/${this.formModel.id}`, this.formModel)
				.then((r) => {
					this.$message({
						message: r.data.message,
						type: "success",
					});
				})
				.catch((e) => {
					this.$message({
						message: "DATA GAGAL DISIMPAN",
						type: "error",
						showClose: true,
					});
				})
				.finally(() => {
					this.openGate(this.formModel.gate_out_id);
				});
		},
		printTicketOut(id) {
			axios
				.post(`/parkingTransaction/printTicketOut/${id}`)
				.then((r) => {
					this.$message({
						message: r.data.message,
						type: "success",
					});
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: "error",
					});
				});
		},
		openGate(gate_out_id) {
			const pos = this.posList.find((p) => p.id == this.formModel.pos_id);
			const gate = this.gateOutList.find((g) => g.id == gate_out_id);

			const ws = new WebSocket(`ws://${pos.ip_address}:5678/`);

			ws.onerror = (event) => {
				this.$message({
					message: "KONEKSI KE POS GAGAL",
					type: "error",
				});
			};

			ws.onopen = (event) => {
				ws.send(
					[
						"open",
						gate.device,
						gate.baudrate,
						gate.open_command,
						gate.close_command,
					].join(";")
				);
			};

			ws.onmessage = (event) => {
				let data = JSON.parse(event.data);
				this.$message({
					message: data.message,
					type: data.status ? "success" : "error",
				});
				ws.close();
			};
		},
		printLastTrx() {
			if (!this.formModel.gate_out_id) {
				return;
			}

			let params = { gate_out_id: this.formModel.gate_out_id };
			axios
				.get("/parkingTransaction/search", { params: params })
				.then((r) => {
					this.printTicketOut(r.data.id);
				})
				.catch((e) => {
					this.$message({
						message: "BELUM ADA TRANSAKSI",
						type: "error",
						showClose: true,
					});
				});
		},
		printReport() {
			let payload = {
				pos_id: this.formModel.pos_id,
				date: moment().format("YYYY-MM-DD"),
			};

			axios
				.post("/parkingTransaction/printReport", payload)
				.then((r) => {
					this.$message({
						message: "SILAKAN AMBIL STRUK",
						type: "success",
						showClose: true,
					});
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: "error",
						showClose: true,
					});
				});
		},
		getSetting(state) {
			axios
				.get("/setting")
				.then((r) => {
					this.setting = r.data;
					this.formModel.plat_nomor = r.data.default_plat_nomor;

					if (this.setting.disable_plat_nomor) {
						document.getElementById("ticket-number").focus();
					} else {
						document.getElementById("plat-nomor").focus();
					}
				})
				.catch((e) => {
					this.$message({
						message: "BELUM ADA SETTING",
						type: "error",
						showClose: true,
						duration: 10000,
					});
				});
		},
		getPosList() {
			axios.get("/pos").then((r) => {
				if (r.data.length == 0) {
					this.$message({
						message: "BELUM ADA POS",
						type: "error",
						showClose: true,
						duration: 10000,
					});
				} else {
					this.posList = r.data;

					if (this.posList.length == 1) {
						this.formModel.pos_id = r.data[0].id;

						if (r.data[0].gate_outs.length == 1) {
							this.formModel.gate_out_id = r.data[0].gate_outs[0].id;
						}
					}
				}
			});
		},
	},
	mounted() {
		this.getSetting();
		this.getPosList();
		this.$store.commit("getGateInList");
		this.$store.commit("getGateOutList");
		this.$store.commit("getJenisKendaraanList");

		let default_vehicle = this.$store.state.jenisKendaraanList.find(
			(v) => v.is_default == 1
		);

		if (default_vehicle) {
			this.formModel.jenis_kendaraan = default_vehicle.name;
			this.formModel.tarif = default_vehicle.tarif_flat;
			this.$forceUpdate();
		}

		document.getElementById("gate-out-app").onkeydown = (e) => {
			// console.log(e.key)
			// ke field nomor plat
			if (e.key == "-") {
				e.preventDefault();
				this.resetForm();
				this.$forceUpdate();
			}

			// ke field nomor tiket
			if (e.key == "+") {
				e.preventDefault();
				let default_vehicle = this.jenisKendaraanList.find(
					(v) => v.is_default == 1
				);
				this.formModel.nomor_barcode = "";
				this.formModel.time_out = "";

				if (default_vehicle) {
					this.formModel.jenis_kendaraan = default_vehicle.name;
					this.formModel.tarif = default_vehicle.tarif_flat;
				} else {
					this.formModel.jenis_kendaraan = "";
					this.formModel.tarif = "";
				}

				document.getElementById("ticket-number").focus();
			}

			// ke field jenis kendaraan
			if (e.key == "*") {
				e.preventDefault();
				this.formModel.jenis_kendaraan = "";
				this.formModel.tarif = "";
				document.getElementById("jenis-kendaraan").focus();
			}

			// ke field time in
			if (e.key == "/") {
				e.preventDefault();
				this.formModel.time_in = "";
				document.getElementById("time-in").focus();
			}

			if (e.key == "F10") {
				e.preventDefault();
				this.printReport();
			}

			if (e.key == "F11") {
				e.preventDefault();
				this.showManualOpenForm = true;
				this.formModelManualOpen = {};
			}

			if (e.key == "F12") {
				e.preventDefault();
				this.printLastTrx();
			}
		};
	},
};
</script>

<style scoped>
.block {
	background-color: #eee;
	height: calc(50vh - 73px);
}

.my-input {
	@apply border-2 border-blue-800 text-3xl py-0 px-3;
	height: 43px;
	line-height: 43px;
	box-sizing: border-box;
	width: 100%;
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
	@apply bg-blue-800 text-white text-xl pl-3;
	height: 43px;
	line-height: 43px;
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

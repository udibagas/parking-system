<template>
	<div>
		<div class="text-right mb-4">
			<el-button
				type="primary"
				icon="el-icon-plus"
				@click="openForm()"
				size="small"
				>TAMBAH GATE MASUK</el-button
			>
		</div>

		<el-table
			:data="tableData"
			height="calc(100vh - 260px)"
			v-loading="loading"
		>
			<el-table-column
				prop="shortcut_key"
				label="#"
				min-width="30px"
				align="center"
				header-align="center"
			></el-table-column>
			<el-table-column prop="name" label="Nama" min-width="100px">
				<template slot-scope="scope">
					<el-tag
						size="small"
						:type="scope.row.active ? 'success' : 'danger'"
						style="width: 100%"
						effect="dark"
						>{{ scope.row.name }}</el-tag
					>
				</template>
			</el-table-column>
			<el-table-column
				prop="type"
				label="Jenis"
				min-width="80px"
				header-align="center"
				align="center"
			></el-table-column>
			<el-table-column
				prop="jenis_kendaraan"
				label="Jenis Kendaraan"
				min-width="130px"
				show-overflow-tooltip
			></el-table-column>
			<el-table-column
				prop="controller_ip_address"
				label="Controller"
				min-width="150px"
				show-overflow-tooltip
			>
				<template slot-scope="scope">
					<span v-if="!!scope.row.controller_ip_address">
						{{ scope.row.controller_ip_address }}:{{
							scope.row.controller_port
						}}
					</span>
					<br v-if="!!scope.row.controller_ip_address" />
					<span v-if="!!scope.row.controller_device">
						{{ scope.row.controller_device }}:{{
							scope.row.controller_baudrate
						}}
					</span>
				</template>
			</el-table-column>
			<el-table-column label="Printer" min-width="110px" show-overflow-tooltip>
				<template slot-scope="scope">
					{{
						scope.row.printer_type == "local"
							? scope.row.printer_device
							: scope.row.printer_ip_address
					}}
				</template>
			</el-table-column>
			<el-table-column
				prop="camera_image_snapshot_url"
				label="URL Kamera"
				min-width="180px"
				show-overflow-tooltip
			>
				<template slot-scope="scope">
					<i
						:class="
							scope.row.camera_status
								? 'el-icon-circle-check text-green'
								: 'el-icon-circle-close text-red'
						"
					></i>
					{{ scope.row.camera_image_snapshot_url }}
				</template>
			</el-table-column>

			<el-table-column
				fixed="right"
				width="40px"
				align="center"
				header-align="center"
			>
				<template slot="header">
					<el-button
						type="text"
						class="text-white"
						@click="
							() => {
								page = 1;
								keyword = '';
								requestData();
							}
						"
						icon="el-icon-refresh"
					>
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
										selectedData = scope.row;
										showDetail = true;
									}
								"
								>Lihat Detail</el-dropdown-item
							>
							<el-dropdown-item
								icon="el-icon-camera"
								@click.native.prevent="testDevice('testCamera', scope.row.id)"
								>Test Kamera</el-dropdown-item
							>
							<el-dropdown-item
								icon="el-icon-printer"
								@click.native.prevent="testDevice('testPrinter', scope.row.id)"
								>Test Printer</el-dropdown-item
							>
							<el-dropdown-item
								v-if="scope.row.type == 'OUT'"
								icon="el-icon-minus"
								@click.native.prevent="testGate(scope.row)"
								>Test Gate</el-dropdown-item
							>
							<el-dropdown-item
								icon="el-icon-edit-outline"
								divided
								@click.native.prevent="openForm(scope.row)"
								>Edit</el-dropdown-item
							>
							<el-dropdown-item
								icon="el-icon-delete"
								@click.native.prevent="deleteData(scope.row.id)"
								>Hapus</el-dropdown-item
							>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>

		<FormGateIn
			:model="selectedData"
			:show="showForm"
			@close="showForm = false"
			@reload="requestData"
		/>
	</div>
</template>

<script>
import FormGateIn from "./form/FormGateIn";

export default {
	components: { FormGateIn },
	data() {
		return {
			showForm: false,
			tableData: [],
			loading: false,
			selectedData: {},
		};
	},
	methods: {
		tableRowClassName({ row, rowIndex }) {
			if (!row.active) {
				return "inactive-row";
			}
			return "";
		},
		testGate(gate) {
			// interface langsung nancep ke server
			if (!gate.controller_ip_address) {
				axios
					.post("/gateIn/openGate/" + gate.id)
					.then((r) => {
						this.$message({
							message: r.data.message,
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
			} else {
				const ws = new WebSocket(
					"ws://" +
						gate.controller_ip_address +
						":" +
						gate.controller_port +
						"/"
				);

				ws.onerror = (event) => {
					this.$message({
						message: "KONEKSI KE CONTROLLER GATE KELUAR GAGAL",
						type: "error",
						showClose: true,
						duration: 10000,
					});
				};

				ws.onopen = (event) => {
					ws.send(
						[
							"open",
							gate.controller_device,
							gate.controller_baudrate,
							gate.cmd_open,
							gate.cmd_close,
						].join(";")
					);
				};

				ws.onmessage = (event) => {
					let data = JSON.parse(event.data);
					this.$message({
						message: data.message,
						type: data.status ? "success" : "error",
						showClose: true,
					});
					ws.close(1000, "Leaving app");
				};
			}
		},
		testDevice(action, id) {
			axios
				.post("/gateIn/" + action + "/" + id)
				.then((r) => {
					this.$message({
						message: r.data.message,
						type: "success",
						showClose: true,
					});

					if (action == "testCamera") {
						this.snapshot = "data:image/jpeg;base64," + r.data.snapshot;
						this.snapshotPreview = true;
					}
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: "error",
						showClose: true,
					});
				});
		},
		sortChange(c) {
			if (c.prop != this.sort || c.order != this.order) {
				this.sort = c.prop;
				this.order = c.order;
				this.requestData();
			}
		},
		openForm(data) {
			this.error = {};
			this.formErrors = {};
			this.formModel = JSON.parse(JSON.stringify(data));
			this.showForm = true;
		},
		store() {
			this.loading = true;
			axios
				.post("/gateIn", this.formModel)
				.then((r) => {
					this.showForm = false;
					this.$message({
						message: "Data BERHASIL disimpan.",
						type: "success",
						showClose: true,
					});
					this.requestData();
				})
				.catch((e) => {
					if (e.response.status == 422) {
						this.error = {};
						this.formErrors = e.response.data.errors;
					}

					if (e.response.status == 500) {
						this.formErrors = {};
						this.error = e.response.data;
					}
				})
				.finally(() => {
					this.loading = false;
				});
		},
		update() {
			this.loading = true;
			axios
				.put("/gateIn/" + this.formModel.id, this.formModel)
				.then((r) => {
					this.showForm = false;
					this.$message({
						message: "Data BERHASIL disimpan.",
						type: "success",
						showClose: true,
					});
					this.requestData();
				})
				.catch((e) => {
					if (e.response.status == 422) {
						this.error = {};
						this.formErrors = e.response.data.errors;
					}

					if (e.response.status == 500) {
						this.formErrors = {};
						this.error = e.response.data;
					}
				})
				.finally(() => {
					this.loading = false;
				});
		},
		deleteData(id) {
			this.$confirm("Anda yakin akan menghapus data ini?", "Warning", {
				type: "warning",
			})
				.then(() => {
					axios
						.delete("/gateIn/" + id)
						.then((r) => {
							this.requestData();
							this.$message({
								message: r.data.message,
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
				})
				.catch(() => console.log(e));
		},
		requestData() {
			let params = {
				keyword: this.keyword,
				sort: this.sort,
				order: this.order,
			};

			this.loading = true;

			axios
				.get("/gateIn", { params: params })
				.then((r) => {
					this.loading = false;
					this.tableData = r.data;
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: "error",
						showClose: true,
					});
				})
				.finally(() => {
					this.loading = false;
				});
		},
	},
	mounted() {
		this.requestData();
	},
};
</script>

<style scoped>
.td-label {
	min-width: 150px;
	font-weight: bold;
	background-color: #ddd;
	padding: 5px 10px;
}

.td-value {
	background-color: #eee;
	padding: 5px 10px;
}
</style>

<template>
	<div>
		<div class="text-right mb-4">
			<el-button
				type="primary"
				icon="el-icon-plus"
				@click="openForm()"
				size="small"
				>TAMBAH GATE KELUAR</el-button
			>
		</div>

		<el-table :data="tableData" stripe height="calc(100vh - 205px)">
			<el-table-column type="index"></el-table-column>
			<el-table-column min-width="100" label="Status" prop="status">
				<template slot-scope="scope">
					<el-tag
						effect="dark"
						:type="scope.row.status ? 'success' : 'info'"
						size="small"
						>{{ scope.row.status ? "Aktif" : "Tidak Aktif" }}</el-tag
					>
				</template>
			</el-table-column>

			<el-table-column
				min-width="150"
				label="Nama"
				prop="nama"
			></el-table-column>

			<el-table-column
				prop="shortcut_key"
				label="Shortcut"
				align="center"
				header-align="center"
				min-width="100"
			></el-table-column>

			<el-table-column
				min-width="100"
				label="Pos"
				prop="pos.nama"
			></el-table-column>

			<el-table-column
				min-width="150"
				label="Jenis Kendaraan"
				prop="jenis_kendaraan"
			>
				<template slot-scope="scope">
					{{
						scope.row.jenis_kendaraan
							? scope.row.jenis_kendaraan.join(", ")
							: ""
					}}
				</template>
			</el-table-column>

			<el-table-column min-width="150" label="Controller Device">
				<template slot-scope="scope">
					{{ scope.row.device }}:{{ scope.row.baudrate }}
				</template>
			</el-table-column>

			<el-table-column
				min-width="120"
				label="Perintah Buka"
				prop="open_command"
			></el-table-column>

			<el-table-column
				min-width="120"
				label="Perintah Tutup"
				prop="close_command"
			></el-table-column>

			<el-table-column min-width="200" label="Running Text Device">
				<template slot-scope="scope">
					{{ scope.row.running_text_device }}:{{
						scope.row.running_text_baudrate
					}}
				</template>
			</el-table-column>

			<el-table-column min-width="150" label="Kamera">
				<template slot-scope="scope">
					{{
						scope.row.kameraList
							? scope.row.kameraList.map((k) => k.nama).join(",")
							: ""
					}}
				</template>
			</el-table-column>

			<el-table-column
				fixed="right"
				width="60px"
				align="center"
				header-align="center"
			>
				<template slot="header">
					<el-button type="text" @click="requestData" icon="el-icon-refresh">
					</el-button>
				</template>
				<template slot-scope="scope">
					<el-dropdown>
						<span class="el-dropdown-link">
							<i class="el-icon-more"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item
								icon="el-icon-minus"
								@click.native.prevent="testGate(scope.row)"
								>Test Gate</el-dropdown-item
							>
							<el-dropdown-item
								icon="el-icon-chat-dot-square"
								@click.native.prevent="testRunningText(scope.row)"
								>Test Running Text</el-dropdown-item
							>
							<el-dropdown-item
								icon="el-icon-edit"
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

		<FormGateOut
			:model="selectedData"
			:show="showForm"
			@close="showForm = false"
			@reload="requestData"
		/>
	</div>
</template>

<script>
import FormGateOut from "./form/FormGateOut";

export default {
	components: { FormGateOut },
	mounted() {
		this.requestData();
		this.$store.commit("getJenisKendaraanList");
	},
	data() {
		return {
			tableData: [],
			selectedData: {},
			showForm: false,
			loading: false,
			ws: null
		};
	},
	methods: {
		requestData() {
			this.loading = true;
			axios
				.get("/gateOut")
				.then(r => {
					this.tableData = r.data;
				})
				.catch(e => {
					this.$message({
						message: e.response.data.message,
						type: "error"
					});
				})
				.finally(() => (this.loading = false));
		},
		openForm(data = null) {
			this.selectedData = data ? JSON.parse(JSON.stringify(data)) : {};
			this.showForm = true;
		},
		deleteData(id) {
			this.$confirm("Anda yakin?", "Konfirmasi", { type: "warning" })
				.then(() => {
					this.loading = true;
					axios
						.delete(`/gateOut/${id}`)
						.then(r => {
							this.$message({
								message: r.data.message,
								type: "success"
							});
							this.requestData();
						})
						.catch(e => {
							this.$message({
								message: e.response.data.message,
								type: "error"
							});
						})
						.finally(() => (this.loading = false));
				})
				.catch(e => console.log(e));
		},

		testGate(gate) {
			console.log(`connecting to ${gate.pos.ip_address}:5678`);
			const ws = new WebSocket(`ws://${gate.pos.ip_address}:5678/`);

			ws.onerror = event => {
				this.$message({
					message: "KONEKSI KE POS GAGAL",
					type: "error"
				});
			};

			ws.onopen = event => {
				console.log(`connected to ${gate.pos.ip_address}:5678`);
				ws.send(
					[
						"open",
						gate.device,
						gate.baudrate,
						gate.open_command,
						gate.close_command
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

		testRunningText(gate) {
			if (!gate.running_text_device || !gate.running_text_baudrate) {
				this.$message({
					message: "RUNNING TEXT TIDAK TERPASANG",
					type: "error"
				});
				return;
			}

			console.log(`connecting to ${gate.pos.ip_address}:5678`);
			const ws = new WebSocket(`ws://${gate.pos.ip_address}:5678/`);

			ws.onerror = event => {
				this.$message({
					message: "KONEKSI KE POS GAGAL",
					type: "error"
				});
			};

			ws.onopen = event => {
				console.log(`connected to ${gate.pos.ip_address}:5678`);
				ws.send(
					[
						"rt",
						gate.running_text_device,
						gate.running_text_baudrate,
						`TEST|${gate.nama}`
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
		}
	}
};
</script>

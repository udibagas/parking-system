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
			<el-table-column prop="nama" label="Nama" min-width="100px">
			</el-table-column>
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
			<el-table-column
				min-width="150"
				label="Printer"
				prop="printer.nama"
			></el-table-column>

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
				width="40px"
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
								icon="el-icon-edit-outline"
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
		openForm(data = null) {
			this.selectedData = data ? JSON.parse(JSON.stringify(data)) : {};
			this.showForm = true;
		},
		deleteData(id) {
			this.$confirm("Anda yakin?", "Konfirmasi", {
				type: "warning",
			})
				.then(() => {
					axios
						.delete(`/gateIn/${id}`)
						.then((r) => {
							this.requestData();
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
				})
				.catch(() => console.log(e));
		},
		requestData() {
			this.loading = true;
			axios
				.get("/gateIn")
				.then((r) => {
					this.tableData = r.data;
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: "error",
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

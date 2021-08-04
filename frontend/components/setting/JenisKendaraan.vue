<template>
	<div>
		<div class="text-right mb-3">
			<el-button
				size="small"
				icon="el-icon-plus"
				@click="openForm()"
				type="primary"
				>TAMBAH JENIS KENDARAAN</el-button
			>
		</div>

		<el-table
			:data="tableData"
			stripe
			height="calc(100vh - 205px)"
			v-loading="loading"
		>
			<el-table-column type="index"></el-table-column>
			<el-table-column
				prop="nama"
				label="Nama"
				min-width="100px"
			></el-table-column>
			<el-table-column
				prop="shortcut_key"
				label="Shortcut"
				align="center"
				header-align="center"
				min-width="100px"
			></el-table-column>
			<el-table-column
				label="Mode Tarif"
				align="center"
				header-align="center"
				min-width="120px"
			>
				<template slot-scope="scope">
					{{ scope.row.mode_tarif ? "PROGRESIF" : "FLAT" }}
				</template>
			</el-table-column>
			<el-table-column
				label="Mode Inap"
				align="center"
				header-align="center"
				min-width="120px"
			>
				<template slot-scope="scope">
					{{
						scope.row.mode_menginap
							? "LEWAT TENGAH MALAM"
							: "24 JAM DARI CHECK IN"
					}}
				</template>
			</el-table-column>
			<el-table-column
				prop="tarif_flat"
				label="Tarif Flat"
				align="center"
				header-align="center"
				min-width="120px"
			>
				<template slot-scope="scope">
					Rp {{ scope.row.tarif_flat | formatNumber }}
				</template>
			</el-table-column>
			<el-table-column label="Tarif Non Flat" min-width="250px">
				<template slot-scope="scope">
					Tarif {{ scope.row.menit_pertama }} menit pertama = Rp
					{{ scope.row.tarif_menit_pertama | formatNumber }} <br />
					Tarif {{ scope.row.menit_selanjutnya }} menit selanjutnya = Rp
					{{ scope.row.tarif_menit_selanjutnya | formatNumber }} <br />
					Tarif maksimal per hari = Rp
					{{ scope.row.tarif_maksimum | formatNumber }} <br />
					Tarif menginap per hari = Rp
					{{ scope.row.tarif_menginap | formatNumber }} <br />
				</template>
			</el-table-column>
			<el-table-column
				prop="denda_tiket_hilang"
				label="Denda Tiket Hilang"
				align="center"
				header-align="center"
				min-width="150px"
			>
				<template slot-scope="scope">
					Rp {{ scope.row.denda_tiket_hilang | formatNumber }}
				</template>
			</el-table-column>
			<el-table-column width="40px" align="center" header-align="center">
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
							<el-dropdown-item @click.native.prevent="openForm(scope.row)"
								><i class="el-icon-edit-outline"></i> Edit</el-dropdown-item
							>
							<el-dropdown-item @click.native.prevent="deleteData(scope.row.id)"
								><i class="el-icon-delete"></i> Hapus</el-dropdown-item
							>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>

		<FormJenisKendaraan
			:model="selectedData"
			:show="showForm"
			@close="showForm = false"
			@reload="requestData"
		/>
	</div>
</template>

<script>
import FormJenisKendaraan from "../setting/form/FormJenisKendaraan";
export default {
	components: { FormJenisKendaraan },
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
						.delete("/jenisKendaraan/" + id)
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
				.get("/jenisKendaraan")
				.then((r) => {
					this.tableData = r.data;
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: "error",
						showClose: true,
					});
				})
				.finally(() => (this.loading = false));

			this.$store.commit("getJenisKendaraanList");
		},
	},
	mounted() {
		this.requestData();
	},
};
</script>

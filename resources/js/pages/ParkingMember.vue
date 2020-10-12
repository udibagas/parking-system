<template>
	<div>
		<el-form
			inline
			class="text-right"
			@submit.native.prevent="
				() => {
					return;
				}
			"
		>
			<el-form-item v-if="user.role == 1">
				<el-button
					size="small"
					@click="openForm({ vehicles: [], register_date: now, tarif: 0 })"
					type="primary"
					icon="el-icon-plus"
					>TAMBAH MEMBER</el-button
				>
			</el-form-item>
			<el-form-item>
				<el-input
					size="small"
					v-model="keyword"
					placeholder="Cari"
					prefix-icon="el-icon-search"
					:clearable="true"
					@change="
						(v) => {
							keyword = v;
							requestData();
						}
					"
				>
				</el-input>
			</el-form-item>
			<el-form-item>
				<el-button-group>
					<el-button
						icon="el-icon-download"
						size="small"
						type="primary"
						@click="download"
					></el-button>
					<el-button
						icon="el-icon-printer"
						size="small"
						type="primary"
						@click="print"
					></el-button>
				</el-button-group>
			</el-form-item>
		</el-form>

		<el-table
			:data="tableData.data"
			stripe
			@row-dblclick="
				(row, column, event) => {
					selectedData = row;
					showDetail = true;
				}
			"
			:default-sort="{ prop: sort, order: order }"
			height="calc(100vh - 260px)"
			@filter-change="
				(f) => {
					let c = Object.keys(f)[0];
					filters[c] = Object.values(f[c]);
					page = 1;
					requestData();
				}
			"
			v-loading="loading"
			@sort-change="sortChange"
		>
			<el-table-column type="index" :index="tableData.from"></el-table-column>
			<el-table-column
				:filters="[
					{ value: 1, text: 'Aktif' },
					{ value: 0, text: 'Nonaktif' },
				]"
				column-key="status"
				prop="status"
				label="Status"
				sortable="custom"
				min-width="120px"
				header-align="center"
				align="center"
			>
				<template slot-scope="scope">
					<el-tag
						size="small"
						effect="dark"
						style="width: 100%"
						:type="scope.row.status ? 'success' : 'info'"
						>{{ scope.row.status ? "Aktif" : "Nonaktif" }}</el-tag
					>
				</template>
			</el-table-column>
			<el-table-column
				prop="nama"
				label="Nama"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>

			<el-table-column
				:filters="[
					{ value: 'y', text: 'BERBAYAR' },
					{ value: 'n', text: 'GRATIS' },
				]"
				:filter-multiple="false"
				column-key="berbayar"
				prop="berbayar"
				label="Jenis"
				sortable="custom"
				min-width="100px"
				align="center"
				header-align="center"
			>
				<template slot-scope="scope">
					{{ scope.row.berbayar ? "BERBAYAR" : "GRATIS" }}
				</template>
			</el-table-column>

			<el-table-column
				:filters="
					this.groupMemberList.map((g) => {
						return { value: g.id, text: g.nama };
					})
				"
				column-key="group_member_id"
				prop="group.nama"
				label="Group"
				sortable="custom"
				show-overflow-tooltip
				min-width="120px"
			>
			</el-table-column>

			<el-table-column
				prop="nomor_kartu"
				label="Nomor Kartu"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>
			<el-table-column
				label="Plat Nomor"
				show-overflow-tooltip
				min-width="150px"
			>
				<template slot-scope="scope">
					{{ scope.row.vehicles.map((v) => v.plat_nomor).join(", ") }}
				</template>
			</el-table-column>
			<el-table-column
				prop="register_date"
				label="Tgl Daftar"
				sortable="custom"
				min-width="120px"
				align="center"
				header-align="center"
			>
				<template slot-scope="scope">
					{{ scope.row.register_date | readableDate }}
				</template>
			</el-table-column>
			<el-table-column
				prop="expiry_date"
				label="Tgl Kedaluarsa"
				sortable="custom"
				min-width="150px"
				align="center"
				header-align="center"
			>
				<template slot-scope="scope">
					{{ scope.row.expiry_date | readableDate }}
				</template>
			</el-table-column>
			<el-table-column
				prop="tarif"
				label="Tarif"
				sortable="custom"
				min-width="100px"
				header-align="right"
				align="right"
			>
				<template slot-scope="scope">
					Rp. {{ scope.row.tarif | formatNumber }}
				</template>
			</el-table-column>
			<el-table-column
				prop="siklus_pembayaran"
				label="Siklus Bayar"
				sortable="custom"
				min-width="130px"
			>
				<template slot-scope="scope">
					{{ scope.row.siklus_pembayaran }}
					{{
						siklus.find((s) => s.value == scope.row.siklus_pembayaran_unit)
							.label
					}}
				</template>
			</el-table-column>
			<el-table-column
				prop="phone"
				label="Nomor HP"
				sortable="custom"
				show-overflow-tooltip
				min-width="130px"
			></el-table-column>
			<!-- <el-table-column prop="email" label="Alamat Email" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column> -->
			<el-table-column
				prop="last_transaction"
				label="Trx Terkakhir"
				sortable="custom"
				min-width="150px"
			>
				<template slot-scope="scope">
					{{ scope.row.last_transaction | readableDate }}
				</template>
			</el-table-column>
			<el-table-column
				:filters="[
					{ value: 'y', text: 'Ya' },
					{ value: 'n', text: 'Tidak' },
				]"
				:filter-multiple="false"
				column-key="expired"
				fixed="right"
				prop="expired"
				label="Expired"
				sortable="custom"
				min-width="120px"
				header-align="center"
				align="center"
			>
				<template slot-scope="scope">
					<el-tag
						size="small"
						effect="dark"
						style="width: 100%"
						:type="scope.row.expired ? 'danger' : 'success'"
						>{{ scope.row.expired ? "Ya" : "Tidak" }}</el-tag
					>
				</template>
			</el-table-column>
			<el-table-column
				fixed="right"
				width="40px"
				align="center"
				header-align="center"
				v-if="user.role == 1"
			>
				<template slot="header">
					<el-button
						type="text"
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

		<div class="flex flex-row mt-3">
			<el-pagination
				class="flex-grow"
				background
				@current-change="
					(p) => {
						page = p;
						requestData();
					}
				"
				@size-change="
					(s) => {
						pageSize = s;
						requestData();
					}
				"
				layout="total, sizes, prev, pager, next"
				:page-size="pageSize"
				:page-sizes="[10, 25, 50, 100]"
				:total="tableData.total"
			>
			</el-pagination>

			<div class="text-sm">
				Menampilkan {{ tableData.from }} - {{ tableData.to }} dari
				{{ tableData.total }}
			</div>
		</div>

		<el-dialog
			v-if="!!selectedData"
			center
			fullscreen
			title="INFORMASI MEMBER"
			:visible.sync="showDetail"
		>
			<ParkingMemberDetail :member="selectedData" />
		</el-dialog>

		<FormMember
			:model="selectedData"
			:show="showForm"
			@close="showForm = false"
			@reload="requestData"
		/>
	</div>
</template>

<script>
import exportFromJSON from "export-from-json";
import ParkingMemberDetail from "../components/ParkingMemberDetail";
import { mapState } from "vuex";
import FormMember from "../components/FormMember";

export default {
	components: { ParkingMemberDetail, FormMember },
	computed: {
		...mapState(["user", "groupMemberList", "siklus"]),
	},
	data() {
		return {
			showForm: false,
			keyword: "",
			page: 1,
			pageSize: 10,
			tableData: {},
			sort: "nama",
			order: "ascending",
			loading: false,
			selectedData: { vehicles: [] },
			showDetail: false,
			now: moment().format("YYYY-MM-DD"),
			filters: {},
		};
	},
	methods: {
		print() {
			const params = Object.assign(
				{
					pageSize: 1000000,
					sort: this.sort,
					order: this.order,
					action: "print",
					token: this.$store.state.token,
				},
				this.filters
			);

			const querystring = Object.keys(params)
				.map((key) => key + "=" + params[key])
				.join("&");
			window.open(BASE_URL + "/member?" + querystring, "_blank");
		},
		download() {
			const params = {
				pageSize: 1000000,
				sort: this.sort,
				order: this.order,
			};

			axios
				.get("member", { params: Object.assign(params, this.filters) })
				.then((r) => {
					const data = r.data.data.map((d) => {
						return {
							Nama: d.nama,
							Jenis: d.berbayar ? "BERBAYAR" : "GRATIS",
							Group: d.group.nama,
							"Nomor Kartu": d.nomor_kartu,
							"Plat Nomor": d.vehicles.map((v) => v.plat_nomor).join(", "),
							"Tanggal Daftar": d.register_date,
							"Tanggal Kedaluarsa": d.expiry_date,
							Tarif: d.tarif,
							"Siklus Bayar":
								d.siklus_pembayaran +
								" " +
								this.siklus.find((s) => s.value == d.siklus_pembayaran_unit)
									.label,
							"Nomor HP": d.phone_number,
							// "Alamat Email": d.email,
							"Transaksi Terakhir": d.last_transaction || "",
							"Status Kartu": d.expired ? "KEDALUARSA" : "BERLAKU",
							"Status Anggota": d.status ? "AKTIF" : "NONAKTIF",
						};
					});

					exportFromJSON({
						data,
						fileName: "member-parkir",
						exportType: "xls",
					});
				})
				.catch((e) => console.log(e))
				.finally(() => (this.loading = false));
		},
		sortChange(c) {
			if (c.prop != this.sort || c.order != this.order) {
				this.sort = c.prop;
				this.order = c.order;
				this.requestData();
			}
		},
		openForm(data) {
			this.selectedData = JSON.parse(JSON.stringify(data));
			this.showForm = true;
		},
		deleteData(id) {
			this.$confirm("Anda yakin akan menghapus data ini?", "Warning", {
				type: "warning",
			})
				.then(() => {
					axios
						.delete(`/member/${id}`)
						.then((r) => {
							this.requestData();
							this.$store.commit("getMemberList");
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
			let params = {
				page: this.page,
				keyword: this.keyword,
				pageSize: this.pageSize,
				sort: this.sort,
				order: this.order,
			};

			this.loading = true;
			axios
				.get("/member", { params: Object.assign(params, this.filters) })
				.then((r) => {
					this.tableData = r.data;
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: "error",
					});
				})
				.finally(() => (this.loading = false));
		},
	},
	mounted() {
		this.requestData();
		this.$store.commit("getGroupMemberList");
		this.$store.commit("getSetting");
	},
};
</script>


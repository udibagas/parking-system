<template>
	<div>
		<el-page-header @back="$emit('back')" content="TRANSAKSI"> </el-page-header>

		<br />

		<el-form
			inline
			class="text-right"
			@submit.native.prevent="
				() => {
					return;
				}
			"
		>
			<el-form-item>
				<el-button
					size="small"
					type="primary"
					icon="el-icon-plus"
					@click="
						() => {
							formModel = {};
							formErrors = {};
							showForm = true;
						}
					"
					>TRANSAKSI MANUAL</el-button
				>
			</el-form-item>
			<el-form-item>
				<el-date-picker
					size="small"
					@change="requestData"
					v-model="dateRange"
					format="dd-MMM-yyyy HH:mm:ss"
					value-format="yyyy-MM-dd HH:mm:ss"
					type="datetimerange"
					range-separator="-"
					start-placeholder="Start date"
					end-placeholder="End date"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button
					size="small"
					type="primary"
					icon="el-icon-finished"
					@click="setSudahKeluarSemua"
					>SET SUDAH KELUAR SEMUA</el-button
				>
			</el-form-item>
			<el-form-item style="margin-right: 0">
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
		</el-form>

		<el-table
			:data="tableData.data"
			stripe
			@row-dblclick="
				(row, column, event) => {
					trx = row;
					showTrxDetail = true;
				}
			"
			@filter-change="
				(f) => {
					let c = Object.keys(f)[0];
					filters[c] = Object.values(f[c]);
					page = 1;
					requestData();
				}
			"
			:default-sort="{ prop: sort, order: order }"
			height="calc(100vh - 250px)"
			v-loading="loading"
			@sort-change="sortChange"
		>
			<el-table-column
				prop="nomor_barcode"
				label="No. Tiket"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>

			<el-table-column
				prop="jenis_kendaraan"
				label="Jenis Kendaraan"
				sortable="custom"
				show-overflow-tooltip
				:filters="
					jenisKendaraanList.map((v) => {
						return { value: v.name, text: v.name };
					})
				"
				column-key="jenis_kendaraan"
				min-width="180px"
			>
			</el-table-column>

			<el-table-column
				prop="plat_nomor"
				label="Plat Nomor"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>
			<!-- <el-table-column prop="is_member" label="Member" sortable="custom" show-overflow-tooltip min-width="120px">
                <template slot-scope="scope">
                    {{scope.row.is_member ? 'Ya' : 'Tidak'}}
                </template>
            </el-table-column> -->
			<el-table-column
				prop="member"
				label="Nama Member"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>
			<el-table-column
				prop="nomor_kartu"
				label="Nomor Kartu"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>

			<el-table-column
				prop="gate_in.nama"
				label="Gate Masuk"
				show-overflow-tooltip
				min-width="150px"
				column-key="gate_in_id"
				:filters="
					gateInList.map((g) => {
						return { value: g.id, text: g.name };
					})
				"
			>
			</el-table-column>

			<el-table-column
				prop="gate_out.nama"
				label="Gate Keluar"
				show-overflow-tooltip
				min-width="150px"
				column-key="gate_out_id"
				:filters="
					gateOutList.map((g) => {
						return { value: g.id, text: g.name };
					})
				"
			>
			</el-table-column>

			<el-table-column
				prop="time_in"
				label="Waktu Masuk"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>
			<el-table-column
				prop="time_out"
				label="Waktu Keluar"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>
			<el-table-column
				prop="durasi"
				label="Durasi"
				show-overflow-tooltip
				min-width="100px"
			></el-table-column>
			<el-table-column
				v-if="$store.state.user.role == 1"
				prop="tarif"
				label="Tarif"
				sortable="custom"
				align="right"
				header-align="right"
				min-width="100px"
			>
				<template slot-scope="scope">
					Rp. {{ scope.row.tarif | formatNumber }}
				</template>
			</el-table-column>

			<el-table-column
				v-if="$store.state.user.role == 1"
				prop="denda"
				label="Denda"
				sortable="custom"
				align="right"
				column-key="denda"
				:filters="[
					{ value: 'Y', text: 'YA' },
					{ value: 'T', text: 'TIDAK' },
				]"
				:filter-multiple="false"
				header-align="right"
				min-width="120px"
			>
				<template slot-scope="scope">
					Rp. {{ scope.row.denda | formatNumber }}
				</template>
			</el-table-column>

			<el-table-column
				prop="operator"
				label="Operator"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>
			<!-- <el-table-column prop="updated_at" label="Waktu" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column> -->

			<el-table-column
				label="Edit"
				sortable="custom"
				align="center"
				header-align="center"
				column-key="edit"
				:filters="[
					{ value: 'Y', text: 'YA' },
					{ value: 'T', text: 'TIDAK' },
				]"
				:filter-multiple="false"
				min-width="100px"
			>
				<template slot-scope="scope">
					{{ scope.row.edit ? "YA" : "TIDAK" }}
				</template>
			</el-table-column>

			<el-table-column
				label="Manual"
				sortable="custom"
				align="center"
				header-align="center"
				column-key="manual"
				:filters="[
					{ value: 'Y', text: 'YA' },
					{ value: 'T', text: 'TIDAK' },
				]"
				:filter-multiple="false"
				min-width="120px"
			>
				<template slot-scope="scope">
					{{ scope.row.manual ? "YA" : "TIDAK" }}
				</template>
			</el-table-column>

			<el-table-column
				prop="edit_by"
				label="Diedit Oleh"
				sortable="custom"
				show-overflow-tooltip
				min-width="150px"
			></el-table-column>

			<el-table-column
				fixed="right"
				width="40px"
				align="center"
				header-align="center"
			>
				<template slot="header">
					<el-button
						class="text-white"
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
										trx = scope.row;
										showTrxDetail = true;
									}
								"
								>Lihat Detail</el-dropdown-item
							>
							<el-dropdown-item
								icon="el-icon-check"
								v-if="!scope.row.time_out"
								@click.native.prevent="setSudahKeluar(scope.row.id)"
								>Set Sudah Keluar</el-dropdown-item
							>

							<el-dropdown-item
								icon="el-icon-edit"
								v-if="
									!scope.row.is_member && !scope.row.edit && !scope.row.manual
								"
								@click.native.prevent="
									() => {
										formModel = scope.row;
										formErrors = {};
										showForm = true;
									}
								"
							>
								Edit
							</el-dropdown-item>

							<el-dropdown-item
								icon="el-icon-printer"
								v-if="!scope.row.is_member && !!scope.row.time_out"
								@click.native.prevent="printTicket(scope.row.id)"
								>Print Ticket Keluar</el-dropdown-item
							>
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>

		<br />

		<el-pagination
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
			layout="prev, pager, next, sizes, total"
			:page-size="pageSize"
			:page-sizes="[10, 25, 50, 100]"
			:total="tableData.total"
		>
		</el-pagination>

		<el-dialog
			center
			top="60px"
			width="70%"
			v-if="trx"
			:visible.sync="showTrxDetail"
			:title="'DETAIL TRANSAKSI ' + trx.nomor_barcode"
		>
			<el-row :gutter="20">
				<el-col :span="14">
					<table style="width: 100%">
						<tbody>
							<tr>
								<td class="td-label">Nomor Barcode</td>
								<td class="td-value">{{ trx.nomor_barcode }}</td>
							</tr>
							<tr>
								<td class="td-label">Jenis Kendaraan</td>
								<td class="td-value">{{ trx.jenis_kendaraan }}</td>
							</tr>
							<tr>
								<td class="td-label">Plat Nomor</td>
								<td class="td-value">{{ trx.plat_nomor }}</td>
							</tr>
							<tr>
								<td class="td-label">Member</td>
								<td class="td-value">{{ trx.is_member ? "Ya" : "Tidak" }}</td>
							</tr>
							<tr>
								<td class="td-label">Nomor Kartu</td>
								<td class="td-value">{{ trx.nomor_kartu }}</td>
							</tr>
							<tr>
								<td class="td-label">Gate Masuk</td>
								<td class="td-value">{{ trx.gate_in }}</td>
							</tr>
							<tr>
								<td class="td-label">Gate Keluar</td>
								<td class="td-value">{{ trx.gate_out }}</td>
							</tr>
							<tr>
								<td class="td-label">Waktu Masuk</td>
								<td class="td-value">{{ trx.time_in }}</td>
							</tr>
							<tr>
								<td class="td-label">Waktu Keluar</td>
								<td class="td-value">{{ trx.time_out }}</td>
							</tr>
							<tr>
								<td class="td-label">Durasi</td>
								<td class="td-value">{{ trx.durasi }}</td>
							</tr>
							<tr v-if="$store.state.user.role == 1">
								<td class="td-label">Tarif</td>
								<td class="td-value">Rp {{ trx.tarif | formatNumber }}</td>
							</tr>
							<tr v-if="$store.state.user.role == 1">
								<td class="td-label">Denda</td>
								<td class="td-value">Rp {{ trx.denda | formatNumber }}</td>
							</tr>
							<tr>
								<td class="td-label">Operator</td>
								<td class="td-value">{{ trx.operator }}</td>
							</tr>
						</tbody>
					</table>
				</el-col>
				<el-col :span="10">
					<div class="block">
						<el-image
							:src="trx.snapshot_in"
							style="width: 100%; height: 100%"
							fit="cover"
						>
							<div slot="error" class="el-image__error">
								<i class="el-icon-picture-outline"></i>
							</div>
						</el-image>
					</div>
					<div class="block">
						<el-image
							:src="trx.snapshot_out"
							style="width: 100%; height: 100%"
							fit="cover"
						>
							<div slot="error" class="el-image__error">
								<i class="el-icon-picture-outline"></i>
							</div>
						</el-image>
					</div>
				</el-col>
			</el-row>
		</el-dialog>

		<el-dialog
			:close-on-click-modal="false"
			:title="
				!formModel.id
					? 'TRANSAKSI MANUAL'
					: 'EDIT TRANSAKSI ' + formModel.nomor_barcode
			"
			:visible.sync="showForm"
			top="60px"
			width="800px"
		>
			<el-form label-position="left" label-width="150px">
				<!-- <el-form-item label="Nomor Barcode">
                    <el-input disabled placeholder="Nomor Barcode" v-model="formModel.nomor_barcode"></el-input>
                </el-form-item> -->
				<!-- <el-form-item label="Durasi" >
                    <el-input disabled placeholder="Durasi" v-model="durasi"></el-input>
                </el-form-item> -->
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
									v-for="(g, i) in gates.filter((g) => g.type == 'IN')"
									:value="g.id"
									:label="g.name"
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
									:value="v.name"
									:label="v.name"
									:key="i"
								></el-option>
							</el-select>
							<div
								class="el-form-item__error"
								v-if="formErrors.jenis_kendaraan"
							>
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
									v-for="(g, i) in gates.filter((g) => g.type == 'OUT')"
									:value="g.id"
									:label="g.name"
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
				<el-button type="info" icon="el-icon-error" @click="showForm = false"
					>BATAL</el-button
				>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import { mapState } from "vuex";
export default {
	computed: {
		durasi() {
			var date1 = moment(this.formModel.time_in);
			var date2 = moment(this.formModel.time_out);
			var duration = moment.duration(date2.diff(date1));
			return moment.utc(duration.asMilliseconds()).format("HH:mm:ss");
		},
		...mapState(["jenisKendaraanList", "gateOutList", "gateInList"]),
	},
	data() {
		return {
			keyword: "",
			page: 1,
			pageSize: 10,
			tableData: {},
			sort: "updated_at",
			order: "descending",
			loading: false,
			trx: null,
			showTrxDetail: false,
			transaction: [],
			income: [],
			parkedVehicle: [],
			date: moment().format("YYYY-MM-DD"),
			dateRange: [
				moment().format("YYYY-MM-DD 00:00:00"),
				moment().format("YYYY-MM-DD HH:mm:ss"),
			],
			formModel: {},
			formErrors: {},
			showForm: false,
			filters: {},
		};
	},
	methods: {
		sortChange(c) {
			if (c.prop != this.sort || c.order != this.order) {
				this.sort = c.prop;
				this.order = c.order;
				this.requestData();
			}
		},
		setSudahKeluar(id) {
			this.$confirm("Anda yakin?", "Confirm", { type: "warning" })
				.then(() => {
					axios
						.put("parkingTransaction/setSudahKeluar/" + id)
						.then((r) => {
							this.$message({
								message: r.data.message,
								type: "success",
								showClose: true,
							});
							this.requestData();
						})
						.catch((e) => {
							this.$message({
								message: r.response.data.message,
								type: "error",
								showClose: true,
							});
						});
				})
				.catch(() => console.log(e));
		},
		setSudahKeluarSemua() {
			this.$confirm("Anda yakin?", "Confirm", { type: "warning" })
				.then(() => {
					axios
						.put("parkingTransaction/setSudahKeluarSemua", {
							dateRange: this.dateRange,
						})
						.then((r) => {
							this.$message({
								message: r.data.message,
								type: "success",
								showClose: true,
							});
							this.requestData();
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
		printTicket(id) {
			axios
				.post("/parkingTransaction/printTicket/" + id, { trx: "OUT" })
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
		},
		openGate(gate_id) {
			axios
				.post("/parkingGate/openGate/" + gate_id)
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
		},
		store() {
			this.loading = true;
			this.formModel.manual = 1;
			axios
				.post("/parkingTransaction", this.formModel)
				.then((r) => {
					this.$message({
						message: "Data berhasil disimpan",
						type: "success",
						showClose: true,
					});
					this.showForm = false;
					this.openGate(this.formModel.gate_out_id);
					this.formModel = {};
					(this.dateRange = [
						moment().format("YYYY-MM-DD 00:00:00"),
						moment().format("YYYY-MM-DD HH:mm:ss"),
					]),
						this.requestData();
				})
				.catch((e) => {
					if (e.response.status == 422) {
						this.formErrors = e.response.data.errors;
					}

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
		update() {
			this.loading = true;
			this.formModel.edit = 1;
			axios
				.put("/parkingTransaction/" + this.formModel.id, this.formModel)
				.then((r) => {
					this.$message({
						message: "Data berhasil disimpan",
						type: "success",
						showClose: true,
					});
					this.showForm = false;
					this.formModel = {};
					(this.dateRange = [
						moment().format("YYYY-MM-DD 00:00:00"),
						moment().format("YYYY-MM-DD HH:mm:ss"),
					]),
						this.requestData();
				})
				.catch((e) => {
					if (e.response.status == 422) {
						this.formErrors = e.response.data.errors;
					} else {
						this.$message({
							message: e.response.data.message,
							type: "error",
							showClose: true,
						});
					}
				})
				.finally(() => {
					this.loading = false;
				});
		},
		requestData() {
			let params = {
				page: this.page,
				keyword: this.keyword,
				pageSize: this.pageSize,
				sort: this.sort,
				order: this.order,
				dateRange: this.dateRange,
			};

			this.loading = true;
			axios
				.get("/parkingTransaction", {
					params: Object.assign(params, this.filters),
				})
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
				.finally(() => {
					this.loading = false;
				});
		},
	},
	mounted() {
		this.requestData();
		this.$store.commit("getGateInList");
		this.$store.commit("getGateOutList");
		this.$store.commit("getJenisKendaraanList");
	},
};
</script>

<style scoped>
.block {
	background-color: #eee;
	height: calc(50vh - 120px);
}

.td-label {
	width: 200px;
	font-weight: bold;
	background-color: #ddd;
	padding: 5px 10px;
}

.td-value {
	background-color: #eee;
	padding: 5px 10px;
}

.col-value,
.col-label {
	font-size: 16px;
	color: #fff;
}

.summary-container {
	height: 150px;
}

.summary-info {
	font-size: 30px;
}

.text-center {
	text-align: center;
}
</style>

<template>
	<div v-loading="loading">
		<el-form inline style="text-align: right">
			<el-form-item>
				<el-date-picker
					size="small"
					@change="requestData"
					v-model="date"
					format="dd/MMM/yyyy"
					value-format="yyyy-MM-dd"
					type="date"
				>
				</el-date-picker>
			</el-form-item>
			<el-form-item>
				<el-button
					size="small"
					type="primary"
					icon="el-icon-printer"
					@click="showPrintDialog = true"
					>PRINT LAPORAN</el-button
				>
			</el-form-item>
		</el-form>

		<el-table show-summary stripe :data="report" :summary-method="getSummaries">
			<el-table-column label="Tanggal" header-align="center" align="center">
				<template slot-scope="scope">
					{{ scope.row.created_at | readableDateTime }}
				</template>
			</el-table-column>
			<el-table-column prop="member.nama" label="Nama"></el-table-column>
			<el-table-column
				prop="member.nomor_kartu"
				label="Nomor Kartu"
				header-align="center"
				align="center"
			></el-table-column>
			<el-table-column label="Plat Nomor" header-align="center" align="center">
				<template slot-scope="scope">
					{{ scope.row.member.vehicles.map((v) => v.plate_number).join(", ") }}
				</template>
			</el-table-column>
			<el-table-column label="Jumlah" header-align="right" align="right">
				<template slot-scope="scope">
					Rp. {{ scope.row.jumlah | formatNumber }}
				</template>
			</el-table-column>
		</el-table>

		<PrintDialog
			:show="showPrintDialog"
			@print="(printer_id) => printReport(printer_id)"
			@close="showPrintDialog = false"
		/>
	</div>
</template>

<script>
import PrintDialog from "../components/PrintDialog";

export default {
	components: { PrintDialog },
	data() {
		return {
			date: moment().format("YYYY-MM-DD"),
			report: [],
			loading: false,
			showPrintDialog: false,
		};
	},
	methods: {
		requestData() {
			let params = { date: this.date };
			this.loading = true;

			axios
				.get("/memberRenewal/reportDaily", { params: params })
				.then((r) => {
					this.report = r.data;
				})
				.catch((e) => {
					this.$message({
						message: e.response.data.message,
						type: "error",
						showClose: false,
					});
				})
				.finally(() => {
					this.loading = false;
				});
		},
		printReport(printer_id) {
			let params = { date: this.date, action: "print", printer_id };
			this.loading = true;

			axios
				.get("/memberRenewal/reportDaily", { params: params })
				.then((r) => {
					this.$message({
						message: "Silakan ambil slip",
						type: "success",
						showClose: false,
					});
				})
				.catch((e) => {
					console.log(e);
					this.$message({
						message: e.response.data.message,
						type: "error",
						showClose: false,
					});
				})
				.finally(() => {
					this.loading = false;
					this.showPrintDialog = false;
				});
		},
		formatNumber(v) {
			try {
				v += "";
				var x = v.split(".");
				var x1 = x[0];
				var x2 = x.length > 1 ? "." + x[1] : "";
				var rgx = /(\d+)(\d{3})/;
				while (rgx.test(x1)) {
					x1 = x1.replace(rgx, "$1" + "," + "$2");
				}
				return x1 + x2;
			} catch (error) {
				return 0;
			}
		},
		getSummaries(param) {
			const { columns, data } = param;
			const sums = [];

			columns.forEach((column, index) => {
				if (index === 0) {
					sums[index] = "TOTAL";
					return;
				}

				if (index === 1 || index === 2 || index === 3) {
					sums[index] = "";
					return;
				}

				if (index === 4) {
					let jumlah = this.report.reduce((prev, curr) => {
						return prev + Number(curr.jumlah);
					}, 0);
					sums[index] = "Rp " + this.formatNumber(jumlah);
				}
			});

			return sums;
		},
	},
	mounted() {
		this.requestData();
	},
};
</script>

<template>
	<div>
		<div class="grid grid-cols-3 gap-4 mb-4">
			<div class="border shadow rounded-md p-3">
				Hari Ini
				<div class="text-5xl text-purple-700">
					Rp. {{ summary.today | formatNumber }}
				</div>
			</div>
			<div class="border shadow rounded-md p-3">
				Bulan Ini
				<div class="text-5xl text-blue-700">
					Rp. {{ summary.this_month | formatNumber }}
				</div>
			</div>
			<div class="border shadow rounded-md p-3">
				Total
				<div class="text-5xl text-orange-700">
					Rp. {{ summary.total | formatNumber }}
				</div>
			</div>
		</div>

		<!-- <div :class="`grid gap-4 mb-4 grid-cols-${areaParkir.length}`">
			<div
				v-for="p in areaParkir"
				:key="p.id"
				class="border rounded-md shadow p-3"
				:class="{
					'bg-red-200': p.kapasitas == p.terisi,
					'bg-green-200': p.terisi < p.kapasitas,
				}"
			>
				<div class="text-purple-700 mb-3 text-center text-2xl">
					{{ p.nama }}
				</div>
				<div class="flex text-center">
					<div class="flex-grow">
						<div class="text-4xl text-blue-700">
							{{ p.kapasitas }}
						</div>
						Kapasitas
					</div>
					<div class="flex-grow">
						<div class="text-4xl text-red-700">
							{{ p.terisi }}
						</div>
						Terisi
					</div>
					<div class="flex-grow">
						<div class="text-4xl text-green-700">
							{{ p.kapasitas - p.terisi }}
						</div>
						Tersedia
					</div>
				</div>
			</div>
		</div> -->

		<el-card class="mb-3" :body-style="{ padding: '0' }">
			<table class="min-w-full">
				<thead>
					<tr>
						<th class="border-b px-3 py-1">AREA PARKIR</th>
						<th class="border-b px-3 py-1">KAPASITAS</th>
						<th class="border-b px-3 py-1">TERISI</th>
						<th class="border-b px-3 py-1">TERSEDIA</th>
					</tr>
				</thead>
				<tbody>
					<tr
						v-for="p in areaParkir"
						:key="p.id"
						:class="{
							'bg-red-300': p.kapasitas == p.terisi,
							'bg-green-300': p.terisi < p.kapasitas,
						}"
					>
						<td class="border-b px-3 py-1">
							{{ p.nama }}
						</td>
						<td class="text-center border-b px-3 py-1">
							{{ p.kapasitas }}
						</td>
						<td class="text-center border-b px-3 py-1">{{ p.terisi }}</td>
						<td class="text-center border-b px-3 py-1">
							{{ p.kapasitas - p.terisi }}
						</td>
					</tr>
				</tbody>
			</table>
		</el-card>

		<el-row class="mb-3 border rounded-md p-3 bg-gray-200">
			<el-col :span="8">
				<div class="text-blue-700 text-2xl ml-3">LAPORAN</div>
			</el-col>
			<el-col :span="16" style="text-align: right">
				<el-date-picker
					class="mr-3"
					@change="requestData"
					v-model="dateRange"
					format="dd/MMM/yyyy"
					value-format="yyyy-MM-dd"
					type="daterange"
					range-separator="To"
					start-placeholder="Start date"
					end-placeholder="End date"
				>
				</el-date-picker>

				<el-button type="primary" icon="el-icon-printer" @click="printReport">
					PRINT LAPORAN
				</el-button>
			</el-col>
		</el-row>

		<el-row :gutter="15">
			<el-col :span="10">
				<!-- kendaraan masuk -->
				<el-card
					class="bg-purple-600 text-white mb-3"
					:body-style="{ padding: '0' }"
				>
					<div slot="header">Kendaraan Masuk</div>

					<table class="table min-w-full">
						<tbody>
							<tr v-for="(t, id) in vehicleIn" :key="id">
								<td class="border-b px-3 py-1">{{ t.gate }}</td>
								<td class="border-b px-3 py-1 text-right">
									{{ t.total | formatNumber }}
								</td>
							</tr>
						</tbody>
					</table>
				</el-card>

				<el-card
					class="bg-blue-600 text-white mb-3"
					:body-style="{ padding: '0' }"
				>
					<div slot="header">Transaksi</div>
					<table class="table min-w-full">
						<tbody>
							<tr v-for="(t, id) in transaction" :key="id">
								<td class="border-b px-3 py-1">{{ t.jenis_kendaraan }}</td>
								<td class="border-b px-3 py-1 text-right">
									{{ t.total | formatNumber }}
								</td>
							</tr>
						</tbody>
					</table>
				</el-card>

				<el-card
					class="bg-green-600 text-white mb-3"
					:body-style="{ padding: '0' }"
				>
					<div slot="header">Pendapatan</div>
					<table class="table min-w-full">
						<tbody>
							<tr v-for="(t, id) in income" :key="id">
								<td class="border-b px-3 py-1">{{ t.jenis_kendaraan }}</td>
								<td class="border-b px-3 py-1 text-right">
									Rp. {{ (Number(t.total) + Number(t.denda)) | formatNumber }}
								</td>
							</tr>
						</tbody>
					</table>
				</el-card>

				<!-- Kendaraan masih di dalam -->
				<el-card
					class="bg-orange-600 text-white mb-3"
					:body-style="{ padding: '0' }"
				>
					<div slot="header">Kendaraan Masih Terparkir</div>
					<table class="table min-w-full">
						<thead>
							<tr>
								<th
									v-for="(header, index) in Object.keys(parkedVehicle[0])"
									:key="index"
									class="border-b px-3 py-1"
								>
									{{ header }}
								</th>
							</tr>
						</thead>
						<tbody>
							<tr v-for="(t, id) in parkedVehicle" :key="id">
								<td
									class="border-b px-3 py-1 text-center"
									v-for="(header, index) in Object.keys(parkedVehicle[id])"
									:key="index"
								>
									{{ t[header] }}
								</td>
							</tr>
						</tbody>
					</table>
				</el-card>
			</el-col>

			<el-col :span="14">
				<el-card>
					<div v-html="report"></div>
				</el-card>
			</el-col>
		</el-row>
	</div>
</template>

<script>
export default {
	data() {
		return {
			transaction: [],
			income: [],
			parkedVehicle: [],
			vehicleIn: [],
			dateRange: [moment().format("YYYY-MM-01"), moment().format("YYYY-MM-DD")],
			report: null,
			areaParkir: [],
			summary: {}
		};
	},

	methods: {
		printReport() {
			window.open(
				BASE_URL +
					"/report?action=print&dateRange[]=" +
					this.dateRange[0] +
					"&dateRange[1]=" +
					this.dateRange[1] +
					"&token=" +
					this.$store.state.token,
				"_blank"
			);
		},

		getTransaction() {
			axios
				.get("getTransaction", { params: { dateRange: this.dateRange } })
				.then(r => {
					this.transaction = r.data;
					let total = r.data
						.map(d => d.total)
						.reduce((sum, total) => sum + parseInt(total), 0);
					this.transaction.push({ jenis_kendaraan: "TOTAL", total });
				});
		},

		getIncome() {
			axios
				.get("getIncome", { params: { dateRange: this.dateRange } })
				.then(r => {
					this.income = r.data;

					let total = r.data
						.map(d => Number(d.total))
						.reduce((sum, total) => sum + Number(total), 0);

					let denda = r.data
						.map(d => Number(d.denda))
						.reduce((sum, denda) => sum + Number(denda), 0);

					this.income.push({ jenis_kendaraan: "TOTAL", total, denda });
				});
		},

		getParkedVehicle() {
			axios
				.get("getParkedVehicle", { params: { dateRange: this.dateRange } })
				.then(r => {
					this.parkedVehicle = r.data;
				});
		},

		getVehicleIn() {
			axios
				.get("getVehicleIn", { params: { dateRange: this.dateRange } })
				.then(r => {
					this.vehicleIn = r.data;
					let total = r.data
						.map(d => d.total)
						.reduce((sum, total) => sum + parseInt(total), 0);
					this.vehicleIn.push({ gate: "TOTAL", total });
				});
		},

		getReport() {
			axios.get("report", { params: { dateRange: this.dateRange } }).then(r => {
				this.report = r.data;
			});
		},

		getAreaParkir() {
			axios.get("areaParkir").then(r => {
				this.areaParkir = r.data;
			});
		},

		getSummary() {
			axios.get("summary").then(r => {
				this.summary = r.data;
			});
		},

		requestData() {
			this.getSummary();
			this.getAreaParkir();
			this.getTransaction();
			this.getIncome();
			this.getParkedVehicle();
			this.getVehicleIn();
			this.getReport();
		}
	},
	mounted() {
		this.requestData();
	}
};
</script>

<template>
	<el-dialog
		width="70%"
		:visible.sync="show"
		:before-close="
			(done) => {
				$emit('close');
			}
		"
	>
		<div class="flex flex-row">
			<table class="table-auto">
				<tbody>
					<tr>
						<td
							style="width: 150px"
							class="border bg-blue-700 text-white px-4 py-1"
						>
							Nomor Barcode
						</td>
						<td class="border bg-blue-100 px-4 py-1">
							{{ trx.nomor_barcode }}
						</td>
					</tr>
					<tr>
						<td class="border bg-blue-700 text-white px-4 py-1">
							Jenis Kendaraan
						</td>
						<td class="border bg-blue-100 px-4 py-1">
							{{ trx.jenis_kendaraan }}
						</td>
					</tr>
					<tr>
						<td class="border bg-blue-700 text-white px-4 py-1">Plat Nomor</td>
						<td class="border bg-blue-100 px-4 py-1">{{ trx.plat_nomor }}</td>
					</tr>
					<tr>
						<td class="border bg-blue-700 text-white px-4 py-1">Member</td>
						<td class="border bg-blue-100 px-4 py-1">
							{{ trx.is_member ? "Ya" : "Tidak" }}
						</td>
					</tr>
					<tr>
						<td class="border bg-blue-700 text-white px-4 py-1">Nomor Kartu</td>
						<td class="border bg-blue-100 px-4 py-1">
							{{ trx.nomor_kartu }}
						</td>
					</tr>
					<tr>
						<td class="border bg-blue-700 text-white px-4 py-1">Gate Masuk</td>
						<td class="border bg-blue-100 px-4 py-1">
							{{ trx.gate_in ? trx.gate_in.nama : "" }}
						</td>
					</tr>
					<tr>
						<td class="border bg-blue-700 text-white px-4 py-1">Gate Keluar</td>
						<td class="border bg-blue-100 px-4 py-1">
							{{ trx.gate_out ? trx.gate_out.nama : "" }}
						</td>
					</tr>
					<tr>
						<td class="border bg-blue-700 text-white px-4 py-1">Waktu Masuk</td>
						<td class="border bg-blue-100 px-4 py-1">{{ trx.time_in }}</td>
					</tr>
					<tr>
						<td class="border bg-blue-700 text-white px-4 py-1">
							Waktu Keluar
						</td>
						<td class="border bg-blue-100 px-4 py-1">{{ trx.time_out }}</td>
					</tr>
					<tr>
						<td class="border bg-blue-700 text-white px-4 py-1">Durasi</td>
						<td class="border bg-blue-100 px-4 py-1">{{ trx.durasi }}</td>
					</tr>
					<tr v-if="user.role == 1">
						<td class="border bg-blue-700 text-white px-4 py-1">Tarif</td>
						<td class="border bg-blue-100 px-4 py-1">
							Rp {{ trx.tarif | formatNumber }}
						</td>
					</tr>
					<tr v-if="user.role == 1">
						<td class="border bg-blue-700 text-white px-4 py-1">Denda</td>
						<td class="border bg-blue-100 px-4 py-1">
							Rp {{ trx.denda | formatNumber }}
						</td>
					</tr>
					<tr>
						<td class="border bg-blue-700 text-white px-4 py-1">Operator</td>
						<td class="border bg-blue-100 px-4 py-1">{{ trx.operator }}</td>
					</tr>
				</tbody>
			</table>
			<div class="flex-grow ml-3">
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
			</div>
		</div>
	</el-dialog>
</template>

<script>
import { mapState } from "vuex";
export default {
	props: ["trx", "show"],
	computed: {
		...mapState(["user"]),
	},
};
</script>

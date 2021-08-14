<template>
	<div>
		<div class="text-right">
			<el-button
				size="small"
				icon="el-icon-plus"
				@click="openForm()"
				type="primary"
				>TAMBAH JENIS KENDARAAN</el-button
			>
		</div>

		<br />

		<el-table
			:data="tableData.data"
			stripe
			height="calc(100vh - 300px)"
			v-loading="loading"
		>
			<el-table-column
				type="index"
				:index="tableData.from"
				label="#"
			></el-table-column>

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
					{{ scope.row.mode_tarif ? 'PROGRESIF' : 'FLAT' }}
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
							? 'LEWAT TENGAH MALAM'
							: '24 JAM DARI CHECK IN'
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
					Rp {{ $decimal(scope.row.tarif_flat) }}
				</template>
			</el-table-column>
			<el-table-column label="Tarif Non Flat" min-width="250px">
				<template slot-scope="scope">
					Tarif {{ scope.row.menit_pertama }} menit pertama = Rp
					{{ $decimal(scope.row.tarif_menit_pertama) }} <br />
					Tarif {{ scope.row.menit_selanjutnya }} menit selanjutnya = Rp
					{{ $decimal(scope.row.tarif_menit_selanjutnya) }} <br />
					Tarif maksimal per hari = Rp
					{{ $decimal(scope.row.tarif_maksimum) }} <br />
					Tarif menginap per hari = Rp
					{{ $decimal(scope.row.tarif_menginap) }} <br />
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
					Rp {{ $decimal(scope.row.denda_tiket_hilang) }}
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

		<br />

		<el-pagination
			class="text-right"
			background
			@current-change="currentChange"
			@size-change="sizeChange"
			layout="total, sizes, prev, pager, next"
			:page-size="pageSize"
			:page-sizes="[10, 25, 50, 100]"
			:total="tableData.total"
		></el-pagination>

		<el-dialog
			v-loading="loading"
			:visible.sync="showForm"
			title="JENIS KENDARAAN"
			:close-on-click-modal="false"
			width="700px"
		>
			<el-form label-width="200px" label-position="left">
				<el-form-item label="Nama" :class="formErrors.nama ? 'is-error' : ''">
					<el-input placeholder="Nama" v-model="formModel.nama"></el-input>
					<div class="el-form-item__error" v-if="formErrors.nama">
						{{ formErrors.nama[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Shortcut Key"
					:class="formErrors.shortcut_key ? 'is-error' : ''"
				>
					<el-input
						maxlength="1"
						placeholder="Shortcut Key"
						v-model="formModel.shortcut_key"
					></el-input>
					<div class="el-form-item__error" v-if="formErrors.shortcut_key">
						{{ formErrors.shortcut_key[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Mode Inap"
					:class="formErrors.mode_menginap ? 'is-error' : ''"
				>
					<el-select
						placeholder="Mode Inap"
						v-model="formModel.mode_menginap"
						style="width: 100%"
					>
						<el-option :value="0" label="24 JAM DARI CHECK IN"></el-option>
						<el-option :value="1" label="LEWAT TENGAH MALAM"></el-option>
					</el-select>
					<div class="el-form-item__error" v-if="formErrors.mode_menginap">
						{{ formErrors.mode_menginap[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Tarif menginap per hari (Rp)"
					:class="{ 'is-error': formErrors.tarif_menginap }"
				>
					<el-input
						type="number"
						placeholder="Tarif menginap per hari (Rp)"
						v-model="formModel.tarif_menginap"
					></el-input>

					<div class="el-form-item__error" v-if="formErrors.tarif_menginap">
						{{ formErrors.tarif_menginap[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Denda Tiket Hilang (Rp)"
					:class="formErrors.denda_tiket_hilang ? 'is-error' : ''"
				>
					<el-input
						type="number"
						:step="500"
						placeholder="Denda Tiket Hilang (Rp)"
						v-model="formModel.denda_tiket_hilang"
					></el-input>
					<div class="el-form-item__error" v-if="formErrors.denda_tiket_hilang">
						{{ formErrors.denda_tiket_hilang[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Mode Tarif"
					:class="formErrors.mode_tarif ? 'is-error' : ''"
				>
					<el-select
						placeholder="FLAT/PROGRESIF"
						v-model="formModel.mode_tarif"
						style="width: 100%"
					>
						<el-option :value="0" label="FLAT"></el-option>
						<el-option :value="1" label="PROGRESIF"></el-option>
					</el-select>
					<div class="el-form-item__error" v-if="formErrors.mode_tarif">
						{{ formErrors.mode_tarif[0] }}
					</div>
				</el-form-item>

				<el-form-item
					v-show="formModel.mode_tarif === 0"
					label="Tarif Flat (Rp)"
					:class="formErrors.tarif_flat ? 'is-error' : ''"
				>
					<el-input
						type="number"
						:step="500"
						placeholder="Tarif Flat (Rp)"
						v-model="formModel.tarif_flat"
					></el-input>
					<div class="el-form-item__error" v-if="formErrors.tarif_flat">
						{{ formErrors.tarif_flat[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Tarif maksimal per hari (Rp)"
					v-show="formModel.mode_tarif === 1"
					:class="{ 'is-error': formErrors.tarif_maksimum }"
				>
					<el-input
						type="number"
						placeholder="Tarif maksimal per hari (Rp)"
						v-model="formModel.tarif_maksimum"
					></el-input>

					<div class="el-form-item__error" v-if="formErrors.tarif_maksimum">
						{{ formErrors.tarif_maksimum[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Tarif Progresif"
					v-show="formModel.mode_tarif === 1"
				>
					<div class="mb-2 flex">
						<el-input
							type="number"
							v-model="formModel.menit_pertama"
							style="width: 250px"
							class="mr-2"
							placeholder="Menit Pertama"
						></el-input>
						<el-input
							type="number"
							v-model="formModel.tarif_menit_pertama"
							:placeholder="`Tarif ${formModel.menit_pertama} menit pertama (Rp)`"
						></el-input>
					</div>

					<div class="flex">
						<el-input
							type="number"
							v-model="formModel.menit_selanjutnya"
							style="width: 250px"
							class="mr-2"
							placeholder="Menit Selanjutnya"
						></el-input>
						<el-input
							type="number"
							v-model="formModel.tarif_menit_selanjutnya"
							:placeholder="`Tarif ${formModel.menit_selanjutnya} menit selanjutnya (Rp)`"
						></el-input>
					</div>
				</el-form-item>
			</el-form>

			<div slot="footer">
				<el-button icon="el-icon-error" @click="closeForm"> BATAL </el-button>
				<el-button icon="el-icon-success" type="primary" @click="save">
					SIMPAN
				</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import crud from '@/mixins/crud'

export default {
	mixins: [crud],

	data() {
		return {
			url: '/api/jenisKendaraan',
		}
	},

	methods: {
		afterSave() {
			this.$store.dispatch('getJenisKendaraanList')
		},
	},
}
</script>

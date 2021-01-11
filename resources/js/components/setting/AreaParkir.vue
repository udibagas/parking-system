<template>
	<div>
		<div class="text-right mb-4">
			<el-button
				type="primary"
				icon="el-icon-plus"
				@click="openForm()"
				size="small"
				>TAMBAH AREA PARKIR</el-button
			>
		</div>

		<el-table :data="tableData" stripe height="calc(100vh - 205px)">
			<el-table-column type="index"></el-table-column>
			<el-table-column
				min-width="100"
				label="Nama"
				prop="nama"
			></el-table-column>
			<el-table-column
				min-width="100"
				label="Nama"
				prop="nama"
			></el-table-column>

			<el-table-column
				min-width="100"
				label="Keterangan"
				prop="keterangan"
			></el-table-column>

			<el-table-column
				min-width="100"
				label="Kapasitas"
				prop="kapasitas"
			></el-table-column>

			<el-table-column
				min-width="100"
				label="Terisi"
				prop="terisi"
			></el-table-column>

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

		<el-dialog
			:visible.sync="showForm"
			:title="!!formModel.id ? 'EDIT AREA PARKIR' : 'TAMBAH AREA PARKIR'"
			width="500px"
			v-loading="loading"
			:close-on-click-modal="false"
		>
			<el-form label-width="100px" label-position="left">
				<el-form-item label="Nama" :class="formErrors.nama ? 'is-error' : ''">
					<el-input placeholder="Nama" v-model="formModel.nama"></el-input>
					<div class="el-form-item__error" v-if="formErrors.nama">
						{{ formErrors.nama[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Keterangan"
					:class="formErrors.keterangan ? 'is-error' : ''"
				>
					<el-input
						placeholder="Keterangan"
						v-model="formModel.keterangan"
					></el-input>
					<div class="el-form-item__error" v-if="formErrors.keterangan">
						{{ formErrors.keterangan[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Kapasitas"
					:class="formErrors.kapasitas ? 'is-error' : ''"
				>
					<el-input
						type="number"
						placeholder="Kapasitas"
						v-model="formModel.kapasitas"
					></el-input>
					<div class="el-form-item__error" v-if="formErrors.kapasitas">
						{{ formErrors.kapasitas[0] }}
					</div>
				</el-form-item>

				<el-form-item
					label="Terisi"
					:class="formErrors.terisi ? 'is-error' : ''"
				>
					<el-input
						type="number"
						placeholder="Terisi"
						v-model="formModel.terisi"
					></el-input>
					<div class="el-form-item__error" v-if="formErrors.terisi">
						{{ formErrors.terisi[0] }}
					</div>
				</el-form-item>
			</el-form>
			<span slot="footer">
				<el-button icon="el-icon-error" @click="closeForm">BATAL</el-button>
				<el-button type="primary" icon="el-icon-success" @click="save"
					>SIMPAN</el-button
				>
			</span>
		</el-dialog>
	</div>
</template>

<script>
import crud from "../../crud";

export default {
	mixins: [crud],
	data() {
		return { url: "/areaParkir" };
	}
};
</script>

<template>
	<div>
		<el-form
			inline
			class="text-right"
			@submit.native.prevent="requestData"
		>
			<el-form-item>
				<el-button
					size="small"
					@click="openForm({})"
					type="primary"
					icon="el-icon-plus"
					>TAMBAH SHIFT</el-button
				>
			</el-form-item>
		</el-form>

		<el-table
			:data="tableData"
			stripe
			height="calc(100vh - 220px)"
			v-loading="loading"
		>
      <el-table-column type="index" label="#"></el-table-column>
			<el-table-column prop="nama" label="Nama"></el-table-column>
			<el-table-column prop="mulai" label="Mulai"></el-table-column>
			<el-table-column prop="selesai" label="Selesai"></el-table-column>

			<el-table-column
				fixed="right"
				width="40px"
				header-align="center"
				align="center"
			>
				<template slot="header">
					<el-button type="text" @click="refreshData" icon="el-icon-refresh" > </el-button>
				</template>
				<template slot-scope="scope">
					<el-dropdown>
						<span class="el-dropdown-link">
							<i class="el-icon-more"></i>
						</span>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item @click.native.prevent="openForm(scope.row)"><i class="el-icon-edit-outline"></i> Edit</el-dropdown-item >
							<el-dropdown-item @click.native.prevent="deleteData(scope.row.id)" ><i class="el-icon-delete"></i> Hapus</el-dropdown-item >
						</el-dropdown-menu>
					</el-dropdown>
				</template>
			</el-table-column>
		</el-table>

		<el-dialog
			:visible.sync="showForm"
			:title="!!formModel.id ? 'EDIT SHIFT' : 'TAMBAH SHIFT'"
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
					label="Mulai"
					:class="{'is-error': formErrors.mulai}"
				>
					<el-time-select
            style="width:100%"
            v-model="formModel.mulai"
            :picker-options="{ start: '00:00', step: '00:30', end: '24:00' }"
            placeholder="Mulai">
          </el-time-select>

					<div class="el-form-item__error" v-if="formErrors.mulai">
						{{ formErrors.mulai[0] }}
					</div>
				</el-form-item>

        <el-form-item
					label="Selesai"
					:class="{'is-error': formErrors.selesai}"
				>
					<el-time-select
            style="width:100%"
            v-model="formModel.selesai"
            :picker-options="{ start: '00:00', step: '00:30', end: '24:00' }"
            placeholder="Selesai">
          </el-time-select>

					<div class="el-form-item__error" v-if="formErrors.selesai">
						{{ formErrors.selesai[0] }}
					</div>
				</el-form-item>

			</el-form>
			<span slot="footer">
				<el-button icon="el-icon-error" @click="closeForm" >BATAL</el-button >
				<el-button type="primary" icon="el-icon-success" @click="save" >SIMPAN</el-button >
			</span>
		</el-dialog>
	</div>
</template>

<script>
import crud from '../../crud';

export default {
  mixins: [crud],
  data() {
    return { url: '/shift' }
  }
};
</script>


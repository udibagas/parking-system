<template>
	<el-dialog
		title="PILIH PRINTER"
		center
		:visible.sync="show"
		width="500px"
		:before-close="
			(done) => {
				$emit('close')
			}
		"
	>
		<el-form>
			<el-form-item>
				<el-select
					v-model="printer_id"
					placeholder="Pilih Printer"
					style="width: 100%"
				>
					<el-option
						v-for="p in printerList"
						:key="p.id"
						:value="p.id"
						:label="p.nama"
					></el-option>
				</el-select>
			</el-form-item>
		</el-form>

		<div slot="footer">
			<el-button icon="el-icon-close" @click="$emit('close')" type="info">
				BATAL
			</el-button>
			<el-button
				icon="el-icon-printer"
				@click="$emit('print', printer_id)"
				type="primary"
				:disabled="!printer_id"
			>
				CETAK STRUK
			</el-button>
		</div>
	</el-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
	props: ['show'],

	computed: {
		...mapState(['printerList']),
	},

	data() {
		return {
			printer_id: null,
		}
	},
}
</script>

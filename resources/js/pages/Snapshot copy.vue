<template>
	<div class="flex">
		<el-card
			style="height: calc(100vh - 160px); overflow: auto; min-width: 600px"
			class="mr-3"
		>
			<el-tree
				v-if="show"
				lazy
				:load="loadData"
				node-key="id"
				:expand-on-click-node="false"
				@node-click="showPreview"
				:props="{ children: 'children', label: 'label', isLeaf: 'leaf' }"
			>
				<span class="custom-tree-node" slot-scope="{ node, data }">
					<span>{{ node.label }}</span>
					<span>
						<el-button
							type="text"
							size="mini"
							icon="el-icon-delete"
							@click="() => deleteSnapshot(node, data)"
						>
						</el-button>
					</span>
				</span>
			</el-tree>
		</el-card>
		<el-image style="width: 100%; height: 100%" :src="preview" fit="cover">
			<div slot="error" class="el-image__error">
				<i class="el-icon-picture-outline"></i>
			</div>
		</el-image>
	</div>
</template>

<script>
export default {
	data() {
		return {
			data: [],
			preview: null,
			months: moment.months(),
			show: true,
		};
	},
	methods: {
		reload() {
			this.show = false;
			this.$nextTick(() => {
				this.show = true;
			});
		},

		showPreview(node) {
			if (node.leaf == true) {
				this.preview = node.url;
			}
		},

		loadData(node, resolve) {
			let params = { level: node.level };

			if (node.level == 1) {
				params.year = node.data.id;
			}

			if (node.level == 2) {
				params.year = node.parent.data.id;
				params.month = node.data.id;
			}

			if (node.level == 3) {
				params.year = node.parent.parent.data.id;
				params.month = node.parent.data.id;
				params.day = node.data.id;
			}

			if (node.level == 4) {
				params.year = node.parent.parent.parent.data.id;
				params.month = node.parent.parent.data.id;
				params.day = node.parent.data.id;
				params.hour = node.data.id;
			}

			axios.get("snapshot", { params: params }).then((r) => {
				resolve(
					r.data.map((d) => {
						let label = d;

						if (node.level == 1) {
							label = this.months[parseInt(d) - 1];
						} else if (node.level == 4) {
							label = d.filename;
						}

						return {
							id: node.level == 4 ? d.filename : d,
							label: label,
							leaf: node.level == 4,
							url: node.level == 4 ? d.url : d,
							params,
						};
					})
				);
			});
		},

		deleteSnapshot(node, data) {
			let params = data.params;

			if (node.level == 5) {
				params.filename = data.id;
			}

			this.$confirm("Anda yakin?", "Peringatan", { type: "warning" })
				.then(() => {
					axios
						.delete("snapshot", { params })
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
						})
						.finally(() => {
							this.preview = null;
							this.reload();
						});
				})
				.catch((e) => console.log(e));
		},
	},
};
</script>

<style lang="scss" scoped>
.custom-tree-node {
	flex: 1;
	display: flex;
	align-items: center;
	justify-content: space-between;
	font-size: 14px;
	padding-right: 8px;
}
</style>

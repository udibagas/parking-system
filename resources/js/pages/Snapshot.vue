<template>
    <div>
        <el-page-header @back="$emit('back')" content="SNAPSHOT"> </el-page-header>
        <el-divider></el-divider>

        <el-row :gutter="20">
            <el-col :span="12">
                <el-card style="height:calc(100vh - 180px);overflow:auto;">
                    <el-tree v-if="show" lazy :load="loadData" node-key="id"
                    :expand-on-click-node="false"
                    @node-click="showPreview"
                    :props="{children: 'children', label: 'label', isLeaf: 'leaf'}">
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                        <span>{{ node.label }}</span>
                        <span>
                        <el-button type="text" size="mini" icon="el-icon-delete" @click="() => deleteSnapshot(node, data)"> </el-button>
                        </span>
                        </span>
                    </el-tree>
                </el-card>
            </el-col>
            <el-col :span="12">
                <el-image style="width:100%;height:100%;" :src="preview" fit="cover">
                    <div slot="error" class="el-image__error">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
            </el-col>
        </el-row>
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
        }
    },
    methods: {
        reload() {
            this.show = false;
            this.$nextTick(() => {
                this.show = true
            })
        },
        showPreview(node) {
            if (node.leaf == true) {
                this.preview = node.path
            }
        },
        loadData(node, resolve) {
            let params = {level: node.level}
            let path = ''

            if (node.level == 1) {
                params.year = node.data.id
                path = params.year
            }

            if (node.level == 2) {
                params.year = node.parent.data.id,
                params.month = node.data.id
                path = params.year + '/' + params.month
            }

            if (node.level == 3) {
                params.year = node.parent.parent.data.id,
                params.month = node.parent.data.id
                params.day = node.data.id
                path = params.year + '/' + params.month + '/' + params.day
            }

            if (node.level == 4) {
                params.year = node.parent.parent.parent.data.id,
                params.month = node.parent.parent.data.id
                params.day = node.parent.data.id
                params.hour = node.data.id
                path = params.year + '/' + params.month + '/' + params.day + '/' + params.hour
            }

            axios.get('snapshots', { params: params }).then(r => {
                resolve(r.data.filter(d => d != '.' && d != '..').map(d => {
                    return {
                        id: d,
                        label: node.level == 1 ? this.months[parseInt(d) - 1] : d,
                        leaf: d.includes('.jpg') || d.includes('.png'),
                        path: 'snapshot/' + path + '/' + d
                    }
                }))
            })
        },
        deleteSnapshot(node) {
            let params = null

            // tahun
            if (node.level == 1) {
                params = { level: 1, target: node.data.id }
            }

            // bulan
            if (node.level == 2) {
                params = {
                    level: 2,
                    target: node.parent.data.id + '/' +  node.data.id
                }
            }

            // tanggal
            if (node.level == 3) {
                params = {
                    level: 3,
                    target: node.parent.parent.data.id + '/' + node.parent.data.id + '/' + node.data.id
                }
            }

            // jam
            if (node.level == 4) {
                params = {
                    level: 4,
                    target: node.parent.parent.parent.data.id + '/' + node.parent.parent.data.id + '/' + node.parent.data.id + '/' + node.data.id
                }
            }

            // file
            if (node.level == 5) {
                params = {
                    level: 5,
                    target: node.parent.parent.parent.parent.data.id + '/' + node.parent.parent.parent.data.id + '/' + node.parent.parent.data.id + '/' + node.parent.data.id + '/' + node.data.id
                }
            }

            this.$confirm('Anda yakin?', 'Peringatan', { type: 'warning' }).then(() => {
                axios.delete('snapshots', { params: params }).then(r => {
                    this.$message({
                        message: r.data.message,
                        type: 'success',
                        showClose: true
                    });
                }).catch(e => {
                    console.log(e)
                    // this.$message({
                    //     message: e.response.data.message,
                    //     type: 'error',
                    //     showClose: true
                    // });
                }).finally(() => {
                    this.preview = null
                    this.reload()
                })
            }).catch(e => console.log(e))
        }
    }

}
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

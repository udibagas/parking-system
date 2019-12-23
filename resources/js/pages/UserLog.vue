<template>
    <div>
        <el-form inline class="text-right" @submit.native.prevent="() => { return }">
            <el-form-item>
                <el-button size="small" @click="clearLog" type="danger" icon="el-icon-delete">HAPUS LOG</el-button>
            </el-form-item>
            <el-form-item>
                <el-input
                size="small"
                v-model="keyword"
                placeholder="Cari" prefix-icon="el-icon-search"
                clearable
                @change="(v) => { keyword = v; requestData(); }">
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-pagination background
                @current-change="(p) => { page = p; requestData(); }"
                @size-change="(s) => { pageSize = s; requestData(); }"
                layout="total, sizes, prev, next"
                :page-size="pageSize"
                :page-sizes="[10, 25, 50, 100]"
                :total="tableData.total">
                </el-pagination>
            </el-form-item>
        </el-form>

        <el-table :data="tableData.data" stripe
        @row-dblclick="(row, column, event) => { snapshot = row.snapshot; showSnapshot = true }"
        :default-sort = "{prop: sort, order: order}"
        height="calc(100vh - 280px)"
        v-loading="loading"
        @sort-change="sortChange">
            <el-table-column prop="created_at" label="Tanggal" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="user" label="User" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="action" label="Aksi" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
        </el-table>

    </div>
</template>

<script>
export default {
    props: ['range'],
    watch: {
        range(v) {
            this.requestData()
        }
    },
    data() {
        return {
            keyword: '',
            page: 1,
            pageSize: 10,
            tableData: {},
            sort: 'updated_at',
            order: 'descending',
            loading: false,
        }
    },
    methods: {
        sortChange(c) {
            if (c.prop != this.sort || c.order != this.order) {
                this.sort = c.prop; this.order = c.order; this.requestData()
            }
        },
        requestData() {
            let params = {
                page: this.page,
                keyword: this.keyword,
                pageSize: this.pageSize,
                sort: this.sort,
                order: this.order,
                dateRange: this.range
            }

            this.loading = true;
            axios.get('/userLog', {params: params}).then(r => {
                    this.tableData = r.data
            }).catch(e => {
                if (e.response.status == 500) {
                    this.$message({
                        message: e.response.data.message,
                        type: 'error',
                        showClose: true
                    });
                }
            }).finally(() => {
                this.loading = false;
            })
        },
        clearLog() {
            this.$confirm('Anda yakin akan menghapus semua log?', 'Peringatan', { type: 'warning' }).then(() => {
                axios.delete('/userLog').then(r => {
                    this.requestData();
                    this.$message({
                        message: r.data.message,
                        type: 'success',
                        showClose: true
                    });
                }).catch(e => {
                    this.$message({
                        message: e.response.data.message,
                        type: 'error',
                        showClose: true
                    });
                })
            }).catch(() => console.log(e));
        }
    },
    mounted() {
        this.requestData();
    }
}
</script>

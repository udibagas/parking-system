<template>
    <div>
        <el-page-header @back="$emit('back')" content="LOG BUKA MANUAL"> </el-page-header>
        <el-divider></el-divider>

        <el-form :inline="true" style="text-align:right" @submit.native.prevent="() => { return }">
            <el-form-item>
                <el-date-picker
                @change="requestData"
                v-model="dateRange"
                format="dd/MMM/yyyy"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date">
                </el-date-picker>
            </el-form-item>
            <el-form-item style="margin-right:0;">
                <el-input v-model="keyword" placeholder="Cari" prefix-icon="el-icon-search" :clearable="true" @change="(v) => { keyword = v; requestData(); }">
                    <el-button @click="() => { page = 1; keyword = ''; requestData(); }" slot="append" icon="el-icon-refresh"></el-button>
                </el-input>
            </el-form-item>
        </el-form>

        <el-table :data="tableData.data" stripe
        @row-dblclick="(row, column, event) => { snapshot = row.snapshot; showSnapshot = true }"
        :default-sort = "{prop: sort, order: order}"
        height="calc(100vh - 290px)"
        v-loading="loading"
        @sort-change="sortChange">
            <el-table-column prop="created_at" label="Tanggal" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="operator" label="Operator" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="alasan" label="Alasan" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>

            <el-table-column fixed="right" width="40px">
                <template slot-scope="scope">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native.prevent="() => { snapshot = scope.row.snapshot; showSnapshot = true }"><i class="el-icon-camera"></i> Lihat Snapshot</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>

        <br>

        <el-pagination background
        @current-change="(p) => { page = p; requestData(); }"
        @size-change="(s) => { pageSize = s; requestData(); }"
        layout="prev, pager, next, sizes, total"
        :page-size="pageSize"
        :page-sizes="[10, 25, 50, 100]"
        :total="tableData.total">
        </el-pagination>

        <el-dialog center top="60px" width="500px" :visible.sync="showSnapshot" title="SNAPSHOT">
            <el-image :src="snapshot" style="width: 100%; height: 100%" fit="cover">
                <div slot="error" class="el-image__error">
                    <i class="el-icon-picture-outline"></i>
                </div>
            </el-image>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            keyword: '',
            page: 1,
            pageSize: 10,
            tableData: {},
            sort: 'updated_at',
            order: 'descending',
            loading: false,
            showSnapshot: false,
            dateRange: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')],
            snapshot: ''
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
                dateRange: this.dateRange
            }

            this.loading = true;
            axios.get('/manualOpenLog', {params: params}).then(r => {
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
        }
    },
    mounted() {
        this.requestData();
    }
}
</script>

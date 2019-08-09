<template>
    <div>
        <el-page-header @back="$emit('back')" content="TRANSACTION"> </el-page-header>
        <el-divider></el-divider>
        <el-form :inline="true" style="text-align:right" @submit.native.prevent="() => { return }">
            <el-form-item style="margin-right:0;">
                <el-input v-model="keyword" placeholder="Search" prefix-icon="el-icon-search" :clearable="true" @change="(v) => { keyword = v; requestData(); }">
                    <el-button @click="() => { page = 1; keyword = ''; requestData(); }" slot="append" icon="el-icon-refresh"></el-button>
                </el-input>
            </el-form-item>
        </el-form>

        <el-table :data="tableData.data" stripe
        :default-sort = "{prop: sort, order: order}"
        height="calc(100vh - 290px)"
        v-loading="loading"
        @sort-change="sortChange">
            <el-table-column type="expand">
                <template slot-scope="scope">
                    <table>
                        <tbody>
                            <tr><td class="td-label">Name</td><td class="td-value">{{scope.row.name}}</td></tr>
                            <tr><td class="td-label">Email</td><td class="td-value">{{scope.row.email}}</td></tr>
                            <tr><td class="td-label">Phone</td><td class="td-value">{{scope.row.phone}}</td></tr>
                            <tr><td class="td-label">Plate Number</td><td class="td-value">{{scope.row.plate_number}}</td></tr>
                            <tr><td class="td-label">Card Number</td><td class="td-value">{{scope.row.card_number}}</td></tr>
                            <tr><td class="td-label">Vehicle Type</td><td class="td-value">{{scope.row.vehicle_type}}</td></tr>
                            <tr><td class="td-label">Expiry Date</td><td class="td-value">{{scope.row.expiry_date}}</td></tr>
                            <tr><td class="td-label">Last Trx</td><td class="td-value">{{scope.row.last_transaction}}</td></tr>
                            <tr><td class="td-label">Status</td><td class="td-value">{{scope.row.is_active ? 'Active' : 'Inactive'}}</td></tr>
                        </tbody>
                    </table>
                </template>
            </el-table-column>
            <el-table-column prop="updated_at" label="Time" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="ticket_number" label="Ticket No." sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="barcode_number" label="Barcode No." sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="vehicle_type" label="Type" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="gate_in" label="Gate In" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="gate_out" label="Gate Out" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="time_in" label="Time In" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="time_out" label="Time Out" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column label="Duration" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="fare" label="Fare" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column label="Operator" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="is_member" label="Member" sortable="custom" show-overflow-tooltip min-width="150px">
                <template slot-scope="scope">
                    {{scope.row.is_member ? 'Yes' : 'No'}}
                </template>
            </el-table-column>

            <el-table-column fixed="right" width="40px">
                <template slot-scope="scope">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native.prevent="printTicket(scope.row)"><i class="el-icon-print"></i> Print Ticket</el-dropdown-item>
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
            loading: false
        }
    },
    methods: {
        sortChange(c) {
            if (c.prop != this.sort || c.order != this.order) {
                this.sort = c.prop; this.order = c.order; this.requestData()
            }
        },
        printTicket(data) {

        },
        requestData() {
            let params = {
                page: this.page,
                keyword: this.keyword,
                pageSize: this.pageSize,
                sort: this.sort,
                order: this.order,
            }

            this.loading = true;
            axios.get('/parkingTransaction', {params: params}).then(r => {
                    this.tableData = r.data
            }).catch(e => {
                if (e.response.status == 500) {
                    this.$message({
                        message: e.response.data.message + '\n' + e.response.data.file + ':' + e.response.data.line,
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

<style scoped>
.td-label {
    min-width: 150px;
    font-weight: bold;
    background-color: #ddd;
    padding: 5px 10px;
}

.td-value {
    background-color: #eee;
    padding: 5px 10px;
}
</style>

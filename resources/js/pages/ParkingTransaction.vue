<template>
    <div>
        <el-page-header @back="$emit('back')" content="TRANSAKSI"> </el-page-header>
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
            <el-form-item>
                <el-button type="primary" icon="el-icon-finished" @click="setSudahKeluarSemua">SET KENDARAAN SUDAH KELUAR SEMUA</el-button>
            </el-form-item>
            <el-form-item style="margin-right:0;">
                <el-input v-model="keyword" placeholder="Search" prefix-icon="el-icon-search" :clearable="true" @change="(v) => { keyword = v; requestData(); }">
                    <el-button @click="() => { page = 1; keyword = ''; requestData(); }" slot="append" icon="el-icon-refresh"></el-button>
                </el-input>
            </el-form-item>
        </el-form>

        <el-table :data="tableData.data" stripe
        @row-dblclick="(row, column, event) => { trx = row; showTrxDetail = true }"
        :default-sort = "{prop: sort, order: order}"
        height="calc(100vh - 290px)"
        v-loading="loading"
        @sort-change="sortChange">
            <el-table-column prop="barcode_number" label="No. Tiket" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="vehicle_type" label="Jenis Kendaraan" sortable="custom" show-overflow-tooltip min-width="160px"></el-table-column>
            <el-table-column prop="plate_number" label="Plat Nomor" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <!-- <el-table-column prop="is_member" label="Member" sortable="custom" show-overflow-tooltip min-width="120px">
                <template slot-scope="scope">
                    {{scope.row.is_member ? 'Ya' : 'Tidak'}}
                </template>
            </el-table-column> -->
            <el-table-column prop="member" label="Nama Member" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="card_number" label="Nomor Kartu" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="gate_in" label="Gate Masuk" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="gate_out" label="Gate Keluar" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="time_in" label="Waktu Masuk" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="time_out" label="Waktu Keluar" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="durasi" label="Durasi" show-overflow-tooltip min-width="100px"></el-table-column>
            <el-table-column v-if="$store.state.user.role == 1" prop="fare" label="Tarif" sortable="custom" align="right" header-align="right" min-width="100px">
                <template slot-scope="scope">
                    Rp. {{scope.row.fare | formatNumber }}
                </template>
            </el-table-column>
            <el-table-column v-if="$store.state.user.role == 1" prop="denda" label="Denda" sortable="custom" align="right" header-align="right" min-width="100px">
                <template slot-scope="scope">
                    Rp. {{scope.row.denda | formatNumber }}
                </template>
            </el-table-column>
            <el-table-column prop="operator" label="Operator" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <!-- <el-table-column prop="updated_at" label="Waktu" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column> -->

            <el-table-column fixed="right" width="40px">
                <template slot-scope="scope">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native.prevent="() => { trx = scope.row; showTrxDetail = true }"><i class="el-icon-zoom-in"></i> Lihat Detail</el-dropdown-item>
                            <el-dropdown-item v-if="!scope.row.time_out" @click.native.prevent="setSudahKeluar(scope.row.id)"><i class="el-icon-check"></i> Set Sudah Keluar</el-dropdown-item>
                            <!-- <el-dropdown-item @click.native.prevent="printTicket(scope.row)"><i class="el-icon-print"></i> Print Ticket Keluar</el-dropdown-item> -->
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

        <el-dialog center top="60px" width="70%" v-if="trx" :visible.sync="showTrxDetail" :title="'DETAIL TRANSAKSI ' + trx.barcode_number">
            <el-row :gutter="20">
                <el-col :span="14">
                    <table style="width:100%">
                        <tbody>
                            <tr><td class="td-label">Nomor Barcode</td><td class="td-value">{{trx.barcode_number}}</td></tr>
                            <tr><td class="td-label">Jenis Kendarran</td><td class="td-value">{{trx.vehicle_type}}</td></tr>
                            <tr><td class="td-label">Plat Nomor</td><td class="td-value">{{trx.plate_number}}</td></tr>
                            <tr><td class="td-label">Member</td><td class="td-value">{{trx.is_member ? 'Ya' : 'Tidak'}}</td></tr>
                            <tr><td class="td-label">Nomor Kartu</td><td class="td-value">{{trx.card_number}}</td></tr>
                            <tr><td class="td-label">Gate Masuk</td><td class="td-value">{{trx.gate_in}}</td></tr>
                            <tr><td class="td-label">Gate Keluar</td><td class="td-value">{{trx.gate_out}}</td></tr>
                            <tr><td class="td-label">Waktu Masuk</td><td class="td-value">{{trx.time_in}}</td></tr>
                            <tr><td class="td-label">Waktu Keluar</td><td class="td-value">{{trx.time_out}}</td></tr>
                            <tr><td class="td-label">Durasi</td><td class="td-value">{{trx.durasi}}</td></tr>
                            <tr><td class="td-label" v-if="$store.state.user.role == 1">Tarif</td><td class="td-value">Rp {{trx.fare | formatNumber}}</td></tr>
                            <tr><td class="td-label" v-if="$store.state.user.role == 1">Denda</td><td class="td-value">Rp {{trx.denda | formatNumber}}</td></tr>
                            <tr><td class="td-label">Operator</td><td class="td-value">{{trx.operator}}</td></tr>
                        </tbody>
                    </table>
                </el-col>
                <el-col :span="10">
                    <div class="block">
                        <el-image :src="trx.snapshot_in" style="width: 100%; height: 100%" fit="cover">
                            <div slot="error" class="el-image__error">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </div>
                    <div class="block">
                        <el-image :src="trx.snapshot_out" style="width: 100%; height: 100%" fit="cover">
                            <div slot="error" class="el-image__error">
                                <i class="el-icon-picture-outline"></i>
                            </div>
                        </el-image>
                    </div>
                </el-col>
            </el-row>
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
            trx: null,
            showTrxDetail: false,
            transaction: [],
            income: [],
            parkedVehicle: [],
            date: moment().format('YYYY-MM-DD'),
            dateRange: [moment().format('YYYY-MM-DD'), moment().format('YYYY-MM-DD')]
        }
    },
    methods: {
        sortChange(c) {
            if (c.prop != this.sort || c.order != this.order) {
                this.sort = c.prop; this.order = c.order; this.requestData()
            }
        },
        setSudahKeluar(id) {
            this.$confirm('Anda yakin?', 'Confirm', { type: 'warning' }).then(() => {
                axios.put('parkingTransaction/setSudahKeluar/' + id).then(r => {
                    this.$message({
                        message: r.data.message,
                        type: 'success',
                        showClose: true
                    });
                    this.requestData()
                }).catch(e => {
                    this.$message({
                        message: r.response.data.message,
                        type: 'error',
                        showClose: true
                    });
                })
            }).catch(() => console.log(e))
        },
        setSudahKeluarSemua() {
            this.$confirm('Anda yakin?', 'Confirm', { type: 'warning' }).then(() => {
                axios.put('parkingTransaction/setSudahKeluarSemua', { dateRange: this.dateRange }).then(r => {
                    this.$message({
                        message: r.data.message,
                        type: 'success',
                        showClose: true
                    });
                    this.requestData()
                }).catch(e => {
                    this.$message({
                        message: e.response.data.message,
                        type: 'error',
                        showClose: true
                    });
                })
            }).catch(() => console.log(e))
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
                dateRange: this.dateRange
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

.block {
    background-color: #eee;
    height: calc(50vh - 120px);
}

.td-label {
    width: 200px;
    font-weight: bold;
    background-color: #ddd;
    padding: 5px 10px;
}

.td-value {
    background-color: #eee;
    padding: 5px 10px;
}

.col-value, .col-label {
    font-size: 16px;
    color: #fff;
}

.summary-container {
    height: 150px;
}

.summary-info {
    font-size: 30px;
}

.text-center {
    text-align: center;
}
</style>

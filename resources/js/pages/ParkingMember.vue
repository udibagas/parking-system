<template>
    <div>
        <el-form :inline="true" style="text-align:right" @submit.native.prevent="() => { return }">
            <el-form-item v-if="$store.state.user.role == 1">
                <el-button @click="openForm({vehicles: [], register_date: now})" type="primary" icon="el-icon-plus">TAMBAH MEMBER</el-button>
            </el-form-item>
            <el-form-item style="margin-right:0;">
                <el-input v-model="keyword" placeholder="Cari" prefix-icon="el-icon-search" :clearable="true" @change="(v) => { keyword = v; requestData(); }">
                    <el-button @click="() => { page = 1; keyword = ''; requestData(); }" slot="append" icon="el-icon-refresh"></el-button>
                </el-input>
            </el-form-item>
        </el-form>

        <el-table :data="tableData.data" stripe
        @row-dblclick="(row, column, event) => { selectedData = row; showDetail = true }"
        :default-sort = "{prop: sort, order: order}"
        height="calc(100vh - 345px)"
        @filter-change="(f) => { let c = Object.keys(f)[0]; filters[c] = Object.values(f[c]); page = 1; requestData(); }"
        v-loading="loading"
        @sort-change="sortChange">
            <el-table-column prop="group" label="Group" sortable="custom" show-overflow-tooltip min-width="100px"></el-table-column>
            <el-table-column prop="name" label="Nama" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="email" label="Alamat Email" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="phone" label="Nomor HP" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="card_number" label="Nomor Kartu" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="register_date" label="Tgl Daftar" sortable="custom" show-overflow-tooltip min-width="120px"></el-table-column>
            <el-table-column prop="billing_cycle" label="Siklus Bayar" sortable="custom" min-width="150px">
                <template slot-scope="scope">
                    {{scope.row.billing_cycle}} bulan
                </template>
            </el-table-column>
            <el-table-column prop="expiry_date" label="Tgl Kedaluarsa" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="paid" label="Jenis" sortable="custom" min-width="100px">
                <template slot-scope="scope">
                    {{scope.row.paid ? 'Berbayar' : 'Gratis'}}
                </template>
            </el-table-column>
            <el-table-column prop="fare" label="Tarif" sortable="custom" min-width="100px" header-align="right" align="right">
                <template slot-scope="scope">
                    Rp. {{scope.row.fare | formatNumber}}
                </template>
            </el-table-column>
            <el-table-column prop="last_transaction" label="Trx Terkakhir" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column
            :filters="[{value: 'y', text: 'Ya'}, {value: 'n', text: 'Tidak'}]"
            :filter-multiple="false"
            column-key="expired"
            fixed="right"
            prop="expired"
            label="Expired"
            sortable="custom"
            min-width="120px"
            header-align="center"
            align="center">
                <template slot-scope="scope">
                    <el-tag size="mini" :type="scope.row.expired ? 'danger' : 'success'">{{scope.row.expired ? 'Ya' : 'Tidak'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column
            :filters="[{value: 1, text: 'Aktif'}, {value: 0, text: 'Nonaktif'}]"
            column-key="is_active"
            fixed="right"
            prop="is_active"
            label="Status"
            sortable="custom"
            min-width="100px"
            header-align="center"
            align="center">
                <template slot-scope="scope">
                    <el-tag size="mini" :type="scope.row.is_active ? 'success' : 'info'">{{scope.row.is_active ? 'Aktif' : 'Nonaktif'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column fixed="right" width="40px" v-if="$store.state.user.role == 1">
                <template slot-scope="scope">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-zoom-in" @click.native.prevent="() => { selectedData = scope.row; showDetail = true; }">Lihat Detail</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-edit-outline" @click.native.prevent="openForm(scope.row)">Edit</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-delete" @click.native.prevent="deleteData(scope.row.id)">Hapus</el-dropdown-item>
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

        <el-dialog v-if="!!selectedData" center fullscreen title="INFORMASI MEMBER" :visible.sync="showDetail">
            <ParkingMemberDetail :member="selectedData" />
        </el-dialog>

        <el-dialog fullscreen center :visible.sync="showForm" :title="!!formModel.id ? 'EDIT MEMBER' : 'TAMBAH MEMBER'" v-loading="loading" :close-on-click-modal="false">
            <el-alert type="error" title="ERROR"
                :description="error.message + '\n' + error.file + ':' + error.line"
                v-show="error.message"
                style="margin-bottom:15px;">
            </el-alert>

            <el-form label-width="150px" label-position="left">
                <el-row :gutter="30">
                    <el-col :span="8">
                        <el-form-item label="Group" :class="formErrors.group_member_id ? 'is-error' : ''">
                            <el-select v-model="formModel.group_member_id" placeholder="Group" style="width:100%">
                                <el-option v-for="t in $store.state.groupMemberList" :value="t.id" :label="t.name" :key="t.id"></el-option>
                            </el-select>
                            <div class="el-form-item__error" v-if="formErrors.group_member_id">{{formErrors.group_member_id[0]}}</div>
                        </el-form-item>

                        <el-form-item label="Nama" :class="formErrors.name ? 'is-error' : ''">
                            <el-input placeholder="Nama" v-model="formModel.name"></el-input>
                            <div class="el-form-item__error" v-if="formErrors.name">{{formErrors.name[0]}}</div>
                        </el-form-item>

                        <!-- <el-form-item label="Alamat Email" :class="formErrors.email ? 'is-error' : ''">
                            <el-input placeholder="Alamat Email" v-model="formModel.email"></el-input>
                            <div class="el-form-item__error" v-if="formErrors.email">{{formErrors.email[0]}}</div>
                        </el-form-item> -->

                        <el-form-item label="Nomor HP" :class="formErrors.phone ? 'is-error' : ''">
                            <el-input placeholder="Nomor HP" v-model="formModel.phone"></el-input>
                            <div class="el-form-item__error" v-if="formErrors.phone">{{formErrors.phone[0]}}</div>
                        </el-form-item>

                        <el-form-item label="Nomor Kartu" :class="formErrors.card_number ? 'is-error' : ''">
                            <el-input placeholder="Nomor Kartu" v-model="formModel.card_number"></el-input>
                            <div class="el-form-item__error" v-if="formErrors.card_number">{{formErrors.card_number[0]}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">

                        <el-form-item label="Tanggal Daftar" :class="formErrors.register_date ? 'is-error' : ''">
                            <el-date-picker format="dd-MMM-yyyy" value-format="yyyy-MM-dd" placeholder="Tanggal Daftar" v-model="formModel.register_date" style="width:100%"></el-date-picker>
                            <div class="el-form-item__error" v-if="formErrors.register_date">{{formErrors.register_date[0]}}</div>
                        </el-form-item>

                        <el-form-item label="Jenis"  :class="formErrors.paid ? 'is-error' : ''">
                            <el-select v-model="formModel.paid" placeholder="Jenis" style="width:100%">
                                <el-option v-for="(t, i) in ['Gratis', 'Berbayar']" :value="i" :label="t" :key="i"></el-option>
                            </el-select>
                            <div class="el-form-item__error" v-if="formErrors.paid">{{formErrors.paid[0]}}</div>
                        </el-form-item>

                        <el-form-item label="Tarif (Rp)" :class="formErrors.fare ? 'is-error' : ''">
                            <el-input :disabled="!formModel.paid" type="number" placeholder="Tarif (Rp)" v-model="formModel.fare"></el-input>
                            <div class="el-form-item__error" v-if="formErrors.fare">{{formErrors.fare[0]}}</div>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item label="Siklus Pembayaran" :class="formErrors.billing_cycle ? 'is-error' : ''">
                            <el-input type="number" v-model="formModel.billing_cycle" style="width: 30%"></el-input>
                            <el-select v-model="formModel.billing_cycle_unit" style="width:66%;float:right;clear: right;">
                                <el-option v-for="(s, i) in $store.state.siklus" :value="s.value" :label="s.label" :key="i"></el-option>
                            </el-select>
                            <div class="el-form-item__error" v-if="formErrors.billing_cycle">{{formErrors.billing_cycle[0]}}</div>
                        </el-form-item>

                        <el-form-item label="Tanggal Kedaluarsa" :class="formErrors.expiry_date ? 'is-error' : ''">
                            <el-date-picker disabled format="dd-MMM-yyyy" value-format="yyyy-MM-dd" placeholder="Tanggal Kedaluarsa" v-model="expiry_date" style="width:100%"></el-date-picker>
                            <div class="el-form-item__error" v-if="formErrors.expiry_date">{{formErrors.expiry_date[0]}}</div>
                        </el-form-item>

                        <el-form-item label="Status">
                            <el-select v-model="formModel.is_active" placeholder="Status" style="width:100%">
                                <el-option v-for="(t, i) in ['Nonaktif', 'Aktif']" :value="i" :label="t" :key="i"></el-option>
                            </el-select>
                            <div class="el-form-item__error" v-if="formErrors.is_active">{{formErrors.is_active[0]}}</div>
                        </el-form-item>

                    </el-col>
                </el-row>
            </el-form>

            <el-table :data="formModel.vehicles" height="calc(100vh - 433px)">
                <el-table-column label="Jenis Kendaraan">
                    <template slot-scope="scope">
                        <el-select size="small" v-model="scope.row.vehicle_type" placeholder="Jenis Kendaraan" style="width:100%">
                            <el-option v-for="(t, i) in ['MOBIL', 'MOTOR']" :value="t" :label="t" :key="i"></el-option>
                        </el-select>
                    </template>
                </el-table-column>
                <el-table-column label="Plat Nomor">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.plate_number" placeholder="Plat Nomor" size="small"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="Merk">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.merk" placeholder="Merk" size="small"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="Type">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.type" placeholder="Type" size="small"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="Tahun">
                    <template slot-scope="scope">
                        <el-input type="number" v-model="scope.row.tahun" placeholder="Tahun" size="small"></el-input>
                    </template>
                </el-table-column>
                <el-table-column label="Warna">
                    <template slot-scope="scope">
                        <el-input v-model="scope.row.warna" placeholder="Warna" size="small"></el-input>
                    </template>
                </el-table-column>
                <el-table-column width="70px" align="right" header-align="right">
                    <template slot="header" v-if="formModel.vehicles.length < $store.state.setting.jml_kendaraan_per_kartu">
                        <el-button icon="el-icon-plus" @click="addVehicle" size="small" type="primary"></el-button>
                    </template>
                    <template slot-scope="scope">
                        <el-button @click="deleteVehicle(scope.$index, scope.row.id)" icon="el-icon-delete" size="small" type="danger" plain></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <span slot="footer" class="dialog-footer">
                <el-button type="primary" icon="el-icon-success" @click="() => !!formModel.id ? update() : store()">SIMPAN</el-button>
                <el-button type="info" icon="el-icon-error" @click="showForm = false">BATAL</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import ParkingMemberDetail from '../components/ParkingMemberDetail'

export default {
    components: { ParkingMemberDetail },
    watch: {
        'formModel.paid'(v) {
            if (!v) {
                this.formModel.fare = 0
            }
        }
    },
    computed: {
        expiry_date() {
            try {
                return moment(this.formModel.register_date, 'YYYY-MM-DD')
                    .add(this.formModel.billing_cycle, this.formModel.billing_cycle_unit)
                    .format('YYYY-MM-DD')
            } catch (error) {
                return ''
            }
        },
    },
    data() {
        return {
            showForm: false,
            formErrors: {},
            error: {},
            formModel: { vehicles: [] },
            keyword: '',
            page: 1,
            pageSize: 10,
            tableData: {},
            sort: 'name',
            order: 'ascending',
            loading: false,
            selectedData: {},
            showDetail: false,
            now: moment().format('YYYY-MM-DD'),
            filters: {},
        }
    },
    methods: {
        sortChange(c) {
            if (c.prop != this.sort || c.order != this.order) {
                this.sort = c.prop; this.order = c.order; this.requestData()
            }
        },
        openForm(data) {
            this.error = {}
            this.formErrors = {}
            this.formModel = JSON.parse(JSON.stringify(data));
            this.showForm = true
        },
        store() {
            this.loading = true;
            this.formModel.expiry_date = this.expiry_date
            axios.post('/parkingMember', this.formModel).then(r => {
                this.showForm = false;
                this.$message({
                    message: 'Data berhasil disimpan.',
                    type: 'success',
                    showClose: true
                });
                this.requestData();
                this.$store.commit('getMemberList')
            }).catch(e => {
                if (e.response.status == 422) {
                    this.error = {}
                    this.formErrors = e.response.data.errors;
                }

                if (e.response.status == 500) {
                    this.formErrors = {}
                    this.error = e.response.data;
                }
            }).finally(() => {
                this.loading = false
            })
        },
        update() {
            this.loading = true;
            this.formModel.expiry_date = this.expiry_date
            axios.put('/parkingMember/' + this.formModel.id, this.formModel).then(r => {
                this.showForm = false
                this.$message({
                    message: 'Data berhasil disimpan.',
                    type: 'success',
                    showClose: true
                });
                this.requestData()
                this.$store.commit('getMemberList')
            }).catch(e => {
                if (e.response.status == 422) {
                    this.error = {}
                    this.formErrors = e.response.data.errors;
                }

                if (e.response.status == 500) {
                    this.formErrors = {}
                    this.error = e.response.data;
                }
            }).finally(() => {
                this.loading = false
            })
        },
        deleteData(id) {
            this.$confirm('Anda yakin akan menghapus data ini?', 'Warning', { type: 'warning' }).then(() => {
                axios.delete('/parkingMember/' + id).then(r => {
                    this.requestData();
                    this.$store.commit('getMemberList')
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
        },
        addVehicle() {
            if (this.formModel.vehicles.length < this.$store.state.setting.jml_kendaraan_per_kartu
            || this.$store.state.setting.jml_kendaraan_per_kartu == 0) {
                this.formModel.vehicles.push({
                    plate_number: '',
                    vehicle_type: '',
                    type: '',
                    merk: '',
                    tahun: '',
                    warna: '',
                })
            } else {
                this.$message({
                    message: 'Jumlah maksimal kendaraan per kartu adalah ' + this.$store.state.setting.jml_kendaraan_per_kartu ,
                    type: 'error',
                    showClose: true
                });
            }
        },
        deleteVehicle(index, id) {
            if (!id) {
                this.formModel.vehicles.splice(index, 1)
            } else {
                axios.delete('/memberVehicle/' + id).then(r => {
                    this.formModel.vehicles.splice(index, 1)
                }).catch(e => {
                    this.$message({
                        message: e.response.data.message,
                        type: 'error',
                        showClose: true
                    });
                })
            }
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
            axios.get('/parkingMember', {params: Object.assign(params, this.filters)}).then(r => {
                    this.loading = false;
                    this.tableData = r.data
            }).catch(e => {
                this.loading = false;
                if (e.response.status == 500) {
                    this.$message({
                        message: e.response.data.message + '\n' + e.response.data.file + ':' + e.response.data.line,
                        type: 'error',
                        showClose: true
                    });
                }
            })
        }
    },
    mounted() {
        this.requestData();
        this.$store.commit('getGroupMemberList')
        this.$store.commit('getSetting')
    }
}
</script>

<style scoped>

</style>


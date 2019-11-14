<template>
    <div>
        <el-form :inline="true" style="text-align:right" @submit.native.prevent="() => { return }">
            <el-form-item>
                <el-button icon="el-icon-plus" @click="openForm({printer_type: 'local'})" type="primary">TAMBAH GATE</el-button>
            </el-form-item>
            <el-form-item style="margin-right:0;">
                <el-input v-model="keyword" placeholder="Cari" prefix-icon="el-icon-search" :clearable="true" @change="(v) => { keyword = v; requestData(); }">
                    <el-button @click="() => { page = 1; keyword = ''; requestData(); }" slot="append" icon="el-icon-refresh"></el-button>
                </el-input>
            </el-form-item>
        </el-form>

        <el-table :data="tableData.data"
        :row-class-name="tableRowClassName"
        @row-dblclick="(row, column, event) => { selectedData = row; showDetail = true }"
        :default-sort = "{prop: sort, order: order}"
        height="calc(100vh - 345px)"
        v-loading="loading"
        @sort-change="sortChange">
            <el-table-column prop="shortcut_key" label="#" min-width="30px" align="center" header-align="center"></el-table-column>
            <el-table-column prop="name" label="Nama" min-width="100px">
                <template slot-scope="scope">
                    <i :class="scope.row.active ? 'el-icon-circle-check text-green' : 'el-icon-circle-close text-red'"></i>
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column prop="type" label="Jenis" min-width="80px" header-align="center" align="center"></el-table-column>
            <el-table-column prop="vehicle_type" label="Jenis Kendaraan" min-width="130px" show-overflow-tooltip></el-table-column>
            <el-table-column prop="controller_ip_address" label="Controller" min-width="150px" show-overflow-tooltip>
                <template slot-scope="scope">
                    <span v-if="!!scope.row.controller_ip_address">
                    {{scope.row.controller_ip_address}}:{{scope.row.controller_port}}
                    </span>
                    <br v-if="!!scope.row.controller_ip_address">
                    <span v-if="!!scope.row.controller_device">
                    {{scope.row.controller_device}}:{{scope.row.controller_baudrate}}
                    </span>
                </template>
            </el-table-column>
            <el-table-column label="Printer" min-width="110px" show-overflow-tooltip>
                <template slot-scope="scope">
                    {{scope.row.printer_type == 'local' ? scope.row.printer_device : scope.row.printer_ip_address}}
                </template>
            </el-table-column>
            <el-table-column prop="camera_image_snapshot_url" label="URL Kamera" min-width="180px" show-overflow-tooltip>
                <template slot-scope="scope">
                    <i :class="scope.row.camera_status ? 'el-icon-circle-check text-green' : 'el-icon-circle-close text-red'"></i>
                    {{scope.row.camera_image_snapshot_url}}
                </template>
            </el-table-column>
            <el-table-column label="User/Pass/Auth Kamera" min-width="250px">
                <template slot-scope="scope">
                    <!-- <i :class="scope.row.camera_status ? 'el-icon-circle-check text-green' : 'el-icon-circle-close text-red'"></i> -->
                    {{scope.row.camera_username}}/{{scope.row.camera_password}}/{{scope.row.camera_auth_type}}
                    <!-- <el-tag size="mini" :type="scope.row.camera_status ? 'success' : 'info'">{{scope.row.camera_status ? 'Aktif' : 'Nonaktif'}}</el-tag> -->
                </template>
            </el-table-column>
            <!-- <el-table-column prop="camera_video_snapshot_url" label="Camera Video Snapshot URL" min-width="250px" show-overflow-tooltip></el-table-column> -->

            <!-- <el-table-column fixed="right" prop="status" label="Status" min-width="100px">
                <template slot-scope="scope">
                    <el-tag size="mini" :type="scope.row.active ? 'success' : 'info'">{{scope.row.active ? 'Aktif' : 'Nonaktif'}}</el-tag>
                </template>
            </el-table-column> -->

            <el-table-column fixed="right" width="40px">
                <template slot-scope="scope">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-zoom-in" @click.native.prevent="() => { selectedData = scope.row; showDetail = true; }">Lihat Detail</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-camera" @click.native.prevent="testDevice('testCamera', scope.row.id)">Test Kamera</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-printer" @click.native.prevent="testDevice('testPrinter', scope.row.id)">Test Printer</el-dropdown-item>
                            <el-dropdown-item v-if="scope.row.type == 'OUT'" icon="el-icon-minus" @click.native.prevent="testGate(scope.row)">Test Gate</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-edit-outline" divided @click.native.prevent="openForm(scope.row)">Edit</el-dropdown-item>
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

        <el-dialog top="60px" :visible.sync="showForm" :title="!!formModel.id ? 'EDIT GATE' : 'TAMBAH GATE'" width="950px" v-loading="loading" :close-on-click-modal="false">
            <el-alert type="error" title="ERROR"
                :description="error.message + '\n' + error.file + ':' + error.line"
                v-show="error.message"
                style="margin-bottom:15px;">
            </el-alert>

            <el-form label-width="180px" label-position="left">
                <el-row :gutter="30">
                    <el-col :span="12">
                        <el-form-item label="Nama" :class="formErrors.name ? 'is-error' : ''">
                            <el-input placeholder="Nama" v-model="formModel.name"></el-input>
                            <div class="el-form-item__error" v-if="formErrors.name">{{formErrors.name[0]}}</div>
                        </el-form-item>

                        <el-form-item label="Tombol Shortcut" :class="formErrors.shortcut_key ? 'is-error' : ''">
                            <el-input type="number" placeholder="Tombol Shortcut" v-model="formModel.shortcut_key"></el-input>
                            <div class="el-form-item__error" v-if="formErrors.shortcut_key">{{formErrors.shortcut_key[0]}}</div>
                        </el-form-item>

                        <el-form-item label="Jenis" :class="formErrors.type ? 'is-error' : ''">
                            <el-select v-model="formModel.type" placeholder="Jenis" style="width:100%">
                                <el-option v-for="(t, i) in ['IN', 'OUT']" :value="t" :label="t" :key="i"></el-option>
                            </el-select>
                            <div class="el-form-item__error" v-if="formErrors.type">{{formErrors.type[0]}}</div>
                        </el-form-item>

                        <el-form-item label="Jenis Kendaraan" :class="formErrors.vehicle_type ? 'is-error' : ''">
                            <el-select v-model="formModel.vehicle_type" placeholder="Jenis Kendaraan" style="width:100%">
                                <el-option v-for="(t, i) in ['MOBIL', 'MOTOR', 'MOBIL/MOTOR']" :value="t" :label="t" :key="i"></el-option>
                            </el-select>
                            <div class="el-form-item__error" v-if="formErrors.vehicle_type">{{formErrors.vehicle_type[0]}}</div>
                        </el-form-item>

                        <el-form-item label="Status Gate" :class="formErrors.active ? 'is-error' : ''">
                            <el-switch
                            :active-value="1"
                            :inactive-value="0"
                            v-model="formModel.active"
                            active-color="#13ce66">
                            </el-switch>
                            <el-tag :type="formModel.active ? 'success' : 'info'" size="small" style="margin-left:10px">{{!!formModel.active ? 'Active' : 'Inactive'}}</el-tag>
                            <div class="el-form-item__error" v-if="formErrors.active">{{formErrors.active[0]}}</div>
                        </el-form-item>

                        <el-form-item label="Controller IP" :class="formErrors.controller_ip_address ? 'is-error' : ''">
                            <el-input placeholder="Alamat IP" v-model="formModel.controller_ip_address" style="width:60%"></el-input>
                            <el-input type="number" placeholder="Port" v-model="formModel.controller_port" style="width:38%;float:right;clear:right;"></el-input>
                            <div class="el-form-item__error" v-if="formErrors.controller_ip_address">{{formErrors.controller_ip_address[0]}}</div>
                            <div class="el-form-item__error" v-if="formErrors.controller_port">{{formErrors.controller_port[0]}}</div>
                        </el-form-item>

                        <el-form-item v-show="formModel.type == 'OUT'" label="Controller Device">
                            <el-input placeholder="Device" v-model="formModel.controller_device" style="width:60%"></el-input>
                            <el-input type="number" placeholder="Baudrate" v-model="formModel.controller_baudrate" style="width:38%;float:right;clear:right;"></el-input>
                        </el-form-item>

                        <el-form-item v-show="formModel.type == 'OUT'" label="Perintah Buka" :class="formErrors.cmd_open ? 'is-error' : ''">
                            <el-input placeholder="Perintah Buka" v-model="formModel.cmd_open"></el-input>
                            <div class="el-form-item__error" v-if="formErrors.cmd_open">{{formErrors.cmd_open[0]}}</div>
                        </el-form-item>

                        <el-form-item v-show="formModel.type == 'OUT'" label="Perintah Tutup" :class="formErrors.cmd_close ? 'is-error' : ''">
                            <el-input placeholder="Perintah Tutup" v-model="formModel.cmd_close"></el-input>
                            <div class="el-form-item__error" v-if="formErrors.cmd_close">{{formErrors.cmd_close[0]}}</div>
                        </el-form-item>

                    </el-col>

                    <el-col :span="12">
                        <el-form-item label="Jenis Printer" :class="formErrors.printer_type || formErrors.printer_device || formErrors.printer_ip_address ? 'is-error' : ''">
                            <el-select v-model="formModel.printer_type" placeholder="Jenis Printer" style="width:40%">
                                <el-option v-for="(t, i) in ['local', 'network']" :value="t" :label="t" :key="i"></el-option>
                            </el-select>
                            <el-input v-show="formModel.printer_type == 'local'" placeholder="Device Printer" v-model="formModel.printer_device" style="width:58%;float:right;clear:right;"></el-input>
                            <el-input v-show="formModel.printer_type == 'network'" placeholder="Alamat IP Printer" v-model="formModel.printer_ip_address" style="width:58%;float:right;clear:right;"></el-input>
                            <div class="el-form-item__error" v-if="formErrors.printer_type">{{formErrors.printer_type[0]}}</div>
                            <div class="el-form-item__error" v-if="formErrors.printer_device">{{formErrors.printer_device[0]}}</div>
                            <div class="el-form-item__error" v-if="formErrors.printer_ip_address">{{formErrors.printer_ip_address[0]}}</div>
                        </el-form-item>

                        <!-- <el-form-item label="Alamat IP Kamera" :class="formErrors.camera_ip_address ? 'is-error' : ''">
                            <el-input placeholder="Alamat IP Kamera" v-model="formModel.camera_ip_address"></el-input>
                            <div class="el-form-item__error" v-if="formErrors.camera_ip_address">{{formErrors.camera_ip_address[0]}}</div>
                        </el-form-item> -->

                        <el-form-item label="URL Snapshot Kamera" :class="formErrors.camera_image_snapshot_url ? 'is-error' : ''">
                            <el-input placeholder="URL Snapshot Kamera" v-model="formModel.camera_image_snapshot_url"></el-input>
                            <div class="el-form-item__error" v-if="formErrors.camera_image_snapshot_url">{{formErrors.camera_image_snapshot_url[0]}}</div>
                        </el-form-item>

                        <el-form-item label="Username Kamera" :class="formErrors.camera_username ? 'is-error' : ''">
                            <el-input placeholder="Username Kamera" v-model="formModel.camera_username"></el-input>
                            <div class="el-form-item__error" v-if="formErrors.camera_username">{{formErrors.camera_username[0]}}</div>
                        </el-form-item>

                        <el-form-item label="Password Kamera" :class="formErrors.camera_password ? 'is-error' : ''">
                            <el-input placeholder="Password Kamera" v-model="formModel.camera_password"></el-input>
                            <div class="el-form-item__error" v-if="formErrors.camera_password">{{formErrors.camera_password[0]}}</div>
                        </el-form-item>

                        <el-form-item label="Otentifikasi Kamera" :class="formErrors.camera_auth_type ? 'is-error' : ''">
                            <el-select v-model="formModel.camera_auth_type" placeholder="Otentifikasi" style="width:100%">
                                <el-option v-for="(t, i) in ['basic', 'digest']" :value="t" :label="t" :key="i"></el-option>
                            </el-select>
                            <div class="el-form-item__error" v-if="formErrors.camera_auth_type">{{formErrors.camera_auth_type[0]}}</div>
                        </el-form-item>

                        <el-form-item label="Status Kamera" :class="formErrors.camera_status ? 'is-error' : ''">
                            <el-switch
                            :active-value="1"
                            :inactive-value="0"
                            v-model="formModel.camera_status"
                            active-color="#13ce66">
                            </el-switch>
                            <el-tag :type="formModel.camera_status ? 'success' : 'info'" size="small" style="margin-left:10px">{{!!formModel.camera_status ? 'Active' : 'Inactive'}}</el-tag>
                            <div class="el-form-item__error" v-if="formErrors.camera_status">{{formErrors.camera_status[0]}}</div>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button icon="el-icon-success" type="primary" @click="() => !!formModel.id ? update() : store()">SIMPAN</el-button>
                <el-button icon="el-icon-error" type="info" @click="showForm = false">BATAL</el-button>
            </span>
        </el-dialog>

        <el-dialog title="DETAIL GATE" center top="60px" :visible.sync="showDetail">
            <table v-if="!!selectedData.id" style="width:100%">
                <tbody>
                    <tr><td class="td-label">Nama</td><td class="td-value">{{selectedData.name}}</td></tr>
                    <tr><td class="td-label">Tombol Shortcut</td><td class="td-value">{{selectedData.shortcut_key}}</td></tr>
                    <tr><td class="td-label">Jenis</td><td class="td-value">{{selectedData.type}}</td></tr>
                    <tr><td class="td-label">Jenis Kendaraan</td><td class="td-value">{{selectedData.vehicle_type}}</td></tr>
                    <tr><td class="td-label">Alamat IP Kontroller</td><td class="td-value">{{selectedData.controller_ip_address}}</td></tr>
                    <tr><td class="td-label">Port Kontroller</td><td class="td-value">{{selectedData.controller_port}}</td></tr>
                    <tr><td class="td-label">Device Kontroller</td><td class="td-value">{{selectedData.controller_device}}</td></tr>
                    <tr><td class="td-label">Baudrate Kontroller</td><td class="td-value">{{selectedData.controller_baudrate}}</td></tr>
                    <tr v-if="selectedData.type == 'OUT'"><td class="td-label">Perintah Buka</td><td class="td-value">{{selectedData.cmd_open}}</td></tr>
                    <tr v-if="selectedData.type == 'OUT'"><td class="td-label">Perintah Tutup</td><td class="td-value">{{selectedData.cmd_close}}</td></tr>
                    <tr><td class="td-label">Jenis Printer</td><td class="td-value">{{selectedData.printer_type}}</td></tr>
                    <tr><td class="td-label">Device Printer</td><td class="td-value">{{selectedData.printer_device}}</td></tr>
                    <tr><td class="td-label">Alamat IP Printer</td><td class="td-value">{{selectedData.printer_ip_address}}</td></tr>
                    <!-- <tr><td class="td-label">Alamat IP Kamera</td><td class="td-value">{{selectedData.camera_ip_address}}</td></tr> -->
                    <tr><td class="td-label">Username Kamera</td><td class="td-value">{{selectedData.camera_username}}</td></tr>
                    <tr><td class="td-label">Password Kamera</td><td class="td-value">{{selectedData.camera_password}}</td></tr>
                    <tr><td class="td-label">Tipe Otentifikasi Kamera</td><td class="td-value">{{selectedData.camera_auth_type}}</td></tr>
                    <tr><td class="td-label">URL Snapshot Kamera</td><td class="td-value">{{selectedData.camera_image_snapshot_url}}</td></tr>
                    <tr><td class="td-label">Status Kamera</td><td class="td-value">{{selectedData.camera_status ? 'Aktif' : 'Nonaktif'}}</td></tr>
                    <tr><td class="td-label">Status Gate</td><td class="td-value">{{selectedData.active ? 'Aktif' : 'Nonaktif'}}</td></tr>
                </tbody>
            </table>
        </el-dialog>

        <el-dialog title="SNAPSHOT KAMERA" center :visible.sync="snapshotPreview">
            <img :src="snapshot" alt="" style="width:100%">
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showForm: false,
            formErrors: {},
            error: {},
            formModel: {},
            keyword: '',
            page: 1,
            pageSize: 10,
            tableData: {},
            sort: 'name',
            order: 'ascending',
            loading: false,
            showDetail: false,
            selectedData: {},
            snapshot: '',
            snapshotPreview: false
        }
    },
    methods: {
        tableRowClassName({row, rowIndex}) {
            if (!row.active) {
                return 'inactive-row'
            }
            return ''
        },
        testGate(gate) {
            // interface langsung nancep ke server
            if (!gate.controller_ip_address) {
                axios.post('/parkingGate/openGate/' + gate.id).then(r => {
                    this.$message({
                        message: r.data.message,
                        type: 'success',
                        showClose: true
                    })
                }).catch(e => {
                    this.$message({
                        message: e.response.data.message,
                        type: 'error',
                        showClose: true
                    })
                })
            } else {
                const ws = new WebSocket("ws://"+gate.controller_ip_address+":"+gate.controller_port+"/");

                ws.onerror = (event) => {
                    this.$message({
                        message: 'KONEKSI KE CONTROLLER GATE KELUAR GAGAL',
                        type: 'error',
                        showClose: true,
                        duration: 10000
                    })
                }

                ws.onopen = (event) => {
                    ws.send([
                        'open',
                        gate.controller_device,
                        gate.controller_baudrate,
                        gate.cmd_open,
                        gate.cmd_close,
                    ].join(';'));
                }

                ws.onmessage = (event) => {
                    let data = JSON.parse(event.data)
                    this.$message({
                        message: data.message,
                        type: data.status ? 'success' : 'error',
                        showClose: true
                    })
                    ws.close(1000, 'Leaving app')
                }
            }
        },
        testDevice(action, id) {
            axios.post('/parkingGate/' + action + '/' + id).then(r => {
                this.$message({
                    message: r.data.message,
                    type: 'success',
                    showClose: true
                });

                if (action == 'testCamera') {
                    this.snapshot = 'data:image/jpeg;base64,' + r.data.snapshot
                    this.snapshotPreview = true
                }
            }).catch(e => {
                this.$message({
                    message: e.response.data.message,
                    type: 'error',
                    showClose: true
                });
            })
        },
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
            axios.post('/parkingGate', this.formModel).then(r => {
                this.showForm = false;
                this.$message({
                    message: 'Data BERHASIL disimpan.',
                    type: 'success',
                    showClose: true
                });
                this.requestData();
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
            axios.put('/parkingGate/' + this.formModel.id, this.formModel).then(r => {
                this.showForm = false
                this.$message({
                    message: 'Data BERHASIL disimpan.',
                    type: 'success',
                    showClose: true
                });
                this.requestData()
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
                axios.delete('/parkingGate/' + id).then(r => {
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
            axios.get('/parkingGate', {params: params}).then(r => {
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

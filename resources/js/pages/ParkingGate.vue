<template>
    <div>
        <el-page-header @back="$emit('back')" content="GATES"> </el-page-header>
        <el-divider></el-divider>
        <el-form :inline="true" style="text-align:right" @submit.native.prevent="() => { return }">
            <el-form-item>
                <el-button @click="openForm({role: 0, password: ''})" type="primary"><i class="el-icon-plus"></i> ADD NEW GATE</el-button>
            </el-form-item>
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
            <el-table-column prop="name" label="Name" sortable="custom"></el-table-column>
            <el-table-column prop="type" label="Type" sortable="custom"></el-table-column>
            <el-table-column prop="vehicle_type" label="Vehicle Type" sortable="custom"></el-table-column>
            <el-table-column prop="controller_ip_address" label="Controller Address" sortable="custom">
                <template slot-scope="scope">
                    {{scope.row.controller_ip_address}}:{{scope.row.controller_port}}
                </template>
            </el-table-column>
            <el-table-column prop="printer_ip_address" label="Printer IP Address" sortable="custom"></el-table-column>
            <el-table-column prop="camera_ip_address" label="Camera IP Address" sortable="custom"></el-table-column>

            <el-table-column fixed="right" width="40px">
                <template slot-scope="scope">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native.prevent="openForm(scope.row)"><i class="el-icon-edit-outline"></i> Edit</el-dropdown-item>
                            <el-dropdown-item @click.native.prevent="deleteData(scope.row.id)"><i class="el-icon-delete"></i> Delete</el-dropdown-item>
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

        <el-dialog :visible.sync="showForm" :title="!!formModel.id ? 'EDIT GATE' : 'ADD NEW GATE'" width="550px" v-loading="loading" :close-on-click-modal="false">
            <el-alert type="error" title="ERROR"
                :description="error.message + '\n' + error.file + ':' + error.line"
                v-show="error.message"
                style="margin-bottom:15px;">
            </el-alert>

            <el-form label-width="170px">
                <el-form-item label="Name" :class="formErrors.name ? 'is-error' : ''">
                    <el-input placeholder="Name" v-model="formModel.name"></el-input>
                    <div class="el-form-item__error" v-if="formErrors.name">{{formErrors.name[0]}}</div>
                </el-form-item>

                <el-form-item label="Type" :class="formErrors.type ? 'is-error' : ''">
                    <el-select v-model="formModel.type" placeholder="Type" style="width:100%">
                        <el-option v-for="(t, i) in ['IN', 'OUT']" :value="t" :label="t" :key="i"></el-option>
                    </el-select>
                    <div class="el-form-item__error" v-if="formErrors.type">{{formErrors.type[0]}}</div>
                </el-form-item>

                <el-form-item label="Vehicle Type" :class="formErrors.vehicle_type ? 'is-error' : ''">
                    <el-select v-model="formModel.vehicle_type" placeholder="Jenis Kendaraan" style="width:100%">
                        <el-option v-for="(t, i) in ['MOBIL', 'MOTOR', 'MOBIL/MOTOR']" :value="t" :label="t" :key="i"></el-option>
                    </el-select>
                    <div class="el-form-item__error" v-if="formErrors.vehicle_type">{{formErrors.vehicle_type[0]}}</div>
                </el-form-item>

                <el-form-item label="Controller Address" :class="formErrors.controller_ip_address ? 'is-error' : ''">
                    <el-input placeholder="IP Address" v-model="formModel.controller_ip_address" style="width:70%"></el-input>
                    <el-input type="number" placeholder="Port" v-model="formModel.controller_port" style="width:28%;float:right;clear:right;"></el-input>
                    <div class="el-form-item__error" v-if="formErrors.controller_ip_address">{{formErrors.controller_ip_address[0]}}</div>
                    <div class="el-form-item__error" v-if="formErrors.controller_port">{{formErrors.controller_port[0]}}</div>
                </el-form-item>

                <el-form-item label="Printer IP Address" :class="formErrors.printer_ip_address ? 'is-error' : ''">
                    <el-input placeholder="Printer IP Address" v-model="formModel.printer_ip_address"></el-input>
                    <div class="el-form-item__error" v-if="formErrors.printer_ip_address">{{formErrors.printer_ip_address[0]}}</div>
                </el-form-item>

                <el-divider>CAMERA</el-divider>

                <el-form-item label="IP Address" :class="formErrors.camera_ip_address ? 'is-error' : ''">
                    <el-input placeholder="IP Address" v-model="formModel.camera_ip_address"></el-input>
                    <div class="el-form-item__error" v-if="formErrors.camera_ip_address">{{formErrors.camera_ip_address[0]}}</div>
                </el-form-item>

                <el-form-item label="Username" :class="formErrors.camera_username ? 'is-error' : ''">
                    <el-input placeholder="Username" v-model="formModel.camera_username"></el-input>
                    <div class="el-form-item__error" v-if="formErrors.camera_username">{{formErrors.camera_username[0]}}</div>
                </el-form-item>

                <el-form-item label="Password" :class="formErrors.camera_password ? 'is-error' : ''">
                    <el-input placeholder="Password" v-model="formModel.camera_password"></el-input>
                    <div class="el-form-item__error" v-if="formErrors.camera_password">{{formErrors.camera_password[0]}}</div>
                </el-form-item>

                <el-form-item label="Image Snapshot Url" :class="formErrors.camera_image_snapshot_url ? 'is-error' : ''">
                    <el-input placeholder="Image Snapshot Url" v-model="formModel.camera_image_snapshot_url"></el-input>
                    <div class="el-form-item__error" v-if="formErrors.camera_image_snapshot_url">{{formErrors.camera_image_snapshot_url[0]}}</div>
                </el-form-item>

                <el-form-item label="Video Snapshot Url" :class="formErrors.camera_video_snapshot_url ? 'is-error' : ''">
                    <el-input placeholder="Video Snapshot Url" v-model="formModel.camera_video_snapshot_url"></el-input>
                    <div class="el-form-item__error" v-if="formErrors.camera_video_snapshot_url">{{formErrors.camera_video_snapshot_url[0]}}</div>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="() => !!formModel.id ? update() : store()"><i class="el-icon-success"></i> SAVE</el-button>
                <el-button type="info" @click="showForm = false"><i class="el-icon-error"></i> CANCEL</el-button>
            </span>
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
            loading: false
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

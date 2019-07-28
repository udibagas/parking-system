<template>
    <div>
        <el-page-header @back="$emit('back')" content="MEMBER RENEWAL"> </el-page-header>
        <el-divider></el-divider>
        <el-form :inline="true" style="text-align:right" @submit.native.prevent="() => { return }">
            <el-form-item>
                <el-button @click="openForm({})" type="primary"><i class="el-icon-plus"></i> ADD NEW RENEWAL</el-button>
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
            <el-table-column prop="plate_number" label="Plat Number" sortable="custom"></el-table-column>
            <el-table-column prop="card_number" label="Card Number" sortable="custom"></el-table-column>
            <el-table-column prop="vehicle_type" label="Type" sortable="custom"></el-table-column>
            <el-table-column prop="expiry_date" label="Expiry Date" sortable="custom"></el-table-column>
            <el-table-column prop="is_active" label="Status" sortable="custom">
                <template slot-scope="scope">
                    <el-tag size="mini" :type="scope.row.is_active ? 'success' : 'info'">{{scope.row.is_active ? 'Active' : 'Inactive'}}</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="last_transaction" label="Last Transaction" sortable="custom"></el-table-column>

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

        <el-dialog :visible.sync="showForm" :title="!!formModel.id ? 'EDIT MEMBER' : 'ADD NEW MEMBER'" width="550px" v-loading="loading" :close-on-click-modal="false">
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

                <el-form-item label="Plate Number" :class="formErrors.plate_number ? 'is-error' : ''">
                    <el-input placeholder="Plate Number" v-model="formModel.plate_number"></el-input>
                    <div class="el-form-item__error" v-if="formErrors.plate_number">{{formErrors.plate_number[0]}}</div>
                </el-form-item>

                <el-form-item label="Card Number" :class="formErrors.card_number ? 'is-error' : ''">
                    <el-input placeholder="Card Number" v-model="formModel.card_number"></el-input>
                    <div class="el-form-item__error" v-if="formErrors.card_number">{{formErrors.card_number[0]}}</div>
                </el-form-item>

                <el-form-item label="Type" :class="formErrors.vehicle_type ? 'is-error' : ''">
                    <el-select v-model="formModel.vehicle_type" placeholder="Jenis Kendaraan" style="width:100%">
                        <el-option v-for="(t, i) in ['MOBIL', 'MOTOR']" :value="t" :label="t" :key="i"></el-option>
                    </el-select>
                    <div class="el-form-item__error" v-if="formErrors.vehicle_type">{{formErrors.vehicle_type[0]}}</div>
                </el-form-item>

                <el-form-item label="Expiry Date" :class="formErrors.expiry_date ? 'is-error' : ''">
                    <el-date-picker format="dd-MMM-yyyy" value-format="yyyy-MM-dd" placeholder="Expiry Date" v-model="formModel.expiry_date" style="width:100%"></el-date-picker>
                    <div class="el-form-item__error" v-if="formErrors.expiry_date">{{formErrors.expiry_date[0]}}</div>
                </el-form-item>

                <el-form-item label="Status" :class="formErrors.status ? 'is-error' : ''">
                    <el-switch
                    :active-value="1"
                    :inactive-value="0"
                    v-model="formModel.is_active"
                    active-color="#13ce66">
                    </el-switch>
                    <el-tag :type="formModel.is_active ? 'success' : 'info'" size="small" style="margin-left:10px">{{!!formModel.is_active ? 'Active' : 'Inactive'}}</el-tag>

                    <div class="el-form-item__error" v-if="formErrors.status">{{formErrors.is_active[0]}}</div>
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
            axios.post('/parkingMember', this.formModel).then(r => {
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
            axios.put('/parkingMember/' + this.formModel.id, this.formModel).then(r => {
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
                axios.delete('/parkingMember/' + id).then(r => {
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
            axios.get('/parkingMember', {params: params}).then(r => {
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

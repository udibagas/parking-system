<template>
    <div>
        <el-form :inline="true" style="text-align:right" @submit.native.prevent="() => { return }">
            <el-form-item v-if="$store.state.user.role == 1">
                <el-button @click="openForm({})" type="primary" icon="el-icon-plus">TAMBAH GROUP</el-button>
            </el-form-item>
            <el-form-item style="margin-right:0;">
                <el-input v-model="keyword" placeholder="Cari" prefix-icon="el-icon-search" :clearable="true" @change="(v) => { keyword = v; requestData(); }">
                    <el-button @click="() => { page = 1; keyword = ''; requestData(); }" slot="append" icon="el-icon-refresh"></el-button>
                </el-input>
            </el-form-item>
        </el-form>

        <el-table :data="tableData.data" stripe
        :default-sort = "{prop: sort, order: order}"
        height="calc(100vh - 345px)"
        v-loading="loading"
        @sort-change="sortChange">
            <el-table-column prop="name" label="Nama" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="description" label="Deskripsi" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="contact_person_name" label="Nama Contact Person" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="contact_person_phone" label="No. HP Contact Person" sortable="custom" show-overflow-tooltip min-width="150px"></el-table-column>
            <el-table-column prop="contact_person_email" label="Alamat Email Contact Person" sortable="custom" show-overflow-tooltip min-width="220px"></el-table-column>
            <el-table-column fixed="right" width="40px" v-if="$store.state.user.role == 1">
                <template slot-scope="scope">
                    <el-dropdown>
                        <span class="el-dropdown-link">
                            <i class="el-icon-more"></i>
                        </span>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item @click.native.prevent="openForm(scope.row)"><i class="el-icon-edit-outline"></i> Edit</el-dropdown-item>
                            <el-dropdown-item @click.native.prevent="deleteData(scope.row.id)"><i class="el-icon-delete"></i> Hapus</el-dropdown-item>
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

        <el-dialog :visible.sync="showForm" :title="!!formModel.id ? 'EDIT GROUP MEMBER' : 'TAMBAH GROUP MEMBER'" width="500px" v-loading="loading" :close-on-click-modal="false">
            <el-alert type="error" title="ERROR"
                :description="error.message + '\n' + error.file + ':' + error.line"
                v-show="error.message"
                style="margin-bottom:15px;">
            </el-alert>

            <el-form label-width="220px" label-position="left">
                <el-form-item label="Nama" :class="formErrors.name ? 'is-error' : ''">
                    <el-input placeholder="Nama" v-model="formModel.name"></el-input>
                    <div class="el-form-item__error" v-if="formErrors.name">{{formErrors.name[0]}}</div>
                </el-form-item>

                <el-form-item label="Deskripsi" :class="formErrors.description ? 'is-error' : ''">
                    <el-input placeholder="Deskripsi" v-model="formModel.description"></el-input>
                    <div class="el-form-item__error" v-if="formErrors.description">{{formErrors.description[0]}}</div>
                </el-form-item>

                <el-form-item label="Nama Contact Person" :class="formErrors.contact_person_name ? 'is-error' : ''">
                    <el-input placeholder="Nama Contact Person" v-model="formModel.contact_person_name"></el-input>
                    <div class="el-form-item__error" v-if="formErrors.contact_person_name">{{formErrors.contact_person_name[0]}}</div>
                </el-form-item>

                <el-form-item label="No. HP Contact Person" :class="formErrors.contact_person_phone ? 'is-error' : ''">
                    <el-input placeholder="No. HP Contact Person" v-model="formModel.contact_person_phone"></el-input>
                    <div class="el-form-item__error" v-if="formErrors.contact_person_phone">{{formErrors.contact_person_phone[0]}}</div>
                </el-form-item>

                <el-form-item label="Alamat Email Contact Person" :class="formErrors.contact_person_email ? 'is-error' : ''">
                    <el-input placeholder="Alamat Email Contact Person" v-model="formModel.contact_person_email"></el-input>
                    <div class="el-form-item__error" v-if="formErrors.contact_person_email">{{formErrors.contact_person_email[0]}}</div>
                </el-form-item>

                <!-- <el-form-item label="Buka Gate OUT Otomatis" :class="formErrors.contact_person_email ? 'is-error' : ''">
                    <el-input placeholder="Ya/Tidak" v-model="formModel.contact_person_email"></el-input>
                    <div class="el-form-item__error" v-if="formErrors.contact_person_email">{{formErrors.contact_person_email[0]}}</div>
                </el-form-item>

                <el-form-item label="Keluar Tanpa Kartu" :class="formErrors.contact_person_email ? 'is-error' : ''">
                    <el-input placeholder="Boleh/Tidak" v-model="formModel.contact_person_email"></el-input>
                    <div class="el-form-item__error" v-if="formErrors.contact_person_email">{{formErrors.contact_person_email[0]}}</div>
                </el-form-item>

                <el-form-item label="Tap IN tanpa Tap OUT" :class="formErrors.contact_person_email ? 'is-error' : ''">
                    <el-input placeholder="Boleh/Tidak" v-model="formModel.contact_person_email"></el-input>
                    <div class="el-form-item__error" v-if="formErrors.contact_person_email">{{formErrors.contact_person_email[0]}}</div>
                </el-form-item> -->

            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" icon="el-icon-success" @click="() => !!formModel.id ? update() : store()">SIMPAN</el-button>
                <el-button type="info" icon="el-icon-error" @click="showForm = false">BATAL</el-button>
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
            loading: false,
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
            axios.post('/groupMember', this.formModel).then(r => {
                this.showForm = false;
                this.$message({
                    message: 'Data berhasil disimpan.',
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
            axios.put('/groupMember/' + this.formModel.id, this.formModel).then(r => {
                this.showForm = false
                this.$message({
                    message: 'Data berhasil disimpan.',
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
                axios.delete('/groupMember/' + id).then(r => {
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
            axios.get('/groupMember', {params: params}).then(r => {
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

</style>


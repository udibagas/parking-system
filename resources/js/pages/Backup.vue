<template>
    <div v-loading="loading">
        <el-form :inline="true">
            <el-form-item>
                <el-input v-model="fileName" placeholder="Nama file backup" style="width:300px;display:block;"></el-input>
                <span v-if="error" class="text-danger">{{error}}</span>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="isGenerating || !fileName" @click="createBackup" type="primary">{{buttonLabel}}</el-button>
            </el-form-item>
        </el-form>
        <!-- <el-divider style="margin-top:0"></el-divider> -->
        <el-row :gutter="15">
            <el-col :span="12">
                <el-table height="calc(100vh - 360px)" :data="files">
                    <el-table-column type="index" width="30px" label="#"></el-table-column>
                    <el-table-column label="Waktu Backup" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.modified_at | asDateTime }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="Backup File Database" show-overflow-tooltip></el-table-column>
                    <el-table-column label="Ukuran" width="120px" header-align="right" align="right">
                        <template slot-scope="scope">
                            {{scope.row.size | formatNumber }} KB
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" width="80px" align="right">
                        <template slot-scope="scope">
                            <a href="#" @click.prevent="restoreDatabase(scope.row)" title="Restore Database"><i class="el-icon-refresh"></i></a>
                            <a href="#" @click.prevent="downloadFile(scope.row)" title="Download Database"><i class="el-icon-download"></i></a>
                            <a href="#" @click.prevent="deleteFile(scope.row)" title="Hapus"><i class="el-icon-delete"></i></a>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="12">
                <el-table height="calc(100vh - 360px)" :data="images">
                    <el-table-column type="index" width="30px" label="#"></el-table-column>
                    <el-table-column label="Waktu Backup" show-overflow-tooltip>
                        <template slot-scope="scope">
                            {{scope.row.modified_at | asDateTime }}
                        </template>
                    </el-table-column>
                    <el-table-column prop="name" label="Backup File Snapshot" show-overflow-tooltip></el-table-column>
                    <el-table-column label="Ukuran" width="120px" header-align="right" align="right">
                        <template slot-scope="scope">
                            {{scope.row.size | formatNumber }} KB
                        </template>
                    </el-table-column>
                    <el-table-column fixed="right" width="80px" align="right">
                        <template slot-scope="scope">
                            <a href="#" @click.prevent="restoreSnapshot(scope.row)" title="Restore Snapshot"><i class="el-icon-refresh"></i></a>
                            <a href="#" @click.prevent="downloadFile(scope.row)" title="Download Snapshot"><i class="el-icon-download"></i></a>
                            <a href="#" @click.prevent="deleteFile(scope.row)" title="Hapus"><i class="el-icon-delete"></i></a>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    filters: {
        asDateTime(v) {
            return moment(v, 'X').format('DD-MMM-YYYY HH:mm:ss')
        }
    },
    data() {
        return {
            buttonLabel: 'Lakukan Backup',
            isGenerating: false,
            fileName: '',
            error: '',
            files: [],
            images: [],
            loading: false
        }
    },
    methods: {
        requestData() {
            this.loading = true
            axios.get('/backup')
                .then(r => {
                    this.files = r.data.filter(f => f.name.includes('.sql')).sort((a,b) => { return b.modified_at - a.modified_at })
                    this.images = r.data.filter(f => f.name.includes('.zip')).sort((a,b) => { return b.modified_at - a.modified_at })
                })
                .catch(e => console.log(e)).finally(() => {
                    this.loading = false
                })
        },
        createBackup() {
            if (!this.fileName) {
                this.error = 'Nama file harus diisi'
                return
            }
            this.error = ''
            this.buttonLabel = 'Generating backup file...'
            this.isGenerating = true
            this.loading = true
            axios.post('/backup', { fileName: this.fileName.replace(/ /g, '-') })
                .then(r => {
                    this.fileName = ''
                    this.requestData()
                })
                .catch(e => {
                    this.error = e.data.message
                }).finally(() => {
                    this.isGenerating = false
                    this.loading = false
                    this.buttonLabel = 'Lakukan Backup'
                })
        },
        downloadFile(file) {
            window.open('/backup?download=' + file.name + '&token=' + this.$store.state.token);
        },
        deleteFile(file) {
            this.$confirm('Anda yakin akan menghapus file ini?', 'Peringatan', { type: 'warning'}).then(() => {
                axios.delete('/backup?file=' + file.name)
                    .then(r => this.requestData())
                    .catch(e => console.log(e));
            }).catch(e => console.log(e))

        },
        restoreSnapshot(file) {
            this.$confirm('Anda yakin akan merestore file snapshot ini?', 'Peringatan', { type: 'warning'}).then(() => {
                this.loading = true
                axios.post('restoreSnapshot', { file: file.name }).then(r => {
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
                }).finally(() => {
                    this.loading = false
                })
            }).catch(e => console.log(e))
        },
        restoreDatabase(file) {
            this.$confirm('Anda yakin akan merestore file database ini?', 'Peringatan', { type: 'warning'}).then(() => {
                this.loading = true
                axios.post('restoreDatabase', { file: file.name }).then(r => {
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
                }).finally(() => {
                    this.loading = false
                })
            }).catch(e => console.log(e))
        }
    },
    mounted() {
        this.requestData()
    }
}
</script>

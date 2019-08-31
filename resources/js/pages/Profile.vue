<template>
    <el-dialog title="PROFIL SAYA" v-loading="loading" :visible="show" :show-close="false" width="500px">
        <el-alert type="error" title="ERROR"
            :description="error.message + '\n' + error.file + ':' + error.line"
            v-show="error.message"
            style="margin-bottom:15px;">
        </el-alert>
        <el-form label-width="160px" label-position="left">
            <el-form-item label="Nama" :class="formErrors.name ? 'is-error' : ''">
                <el-input placeholder="Nama" v-model="formModel.name"></el-input>
                <div class="el-form-item__error" v-if="formErrors.name">{{formErrors.name[0]}}</div>
            </el-form-item>

            <el-form-item label="Alamat Email" :class="formErrors.email ? 'is-error' : ''">
                <el-input placeholder="Alamat Email" v-model="formModel.email"></el-input>
                <div class="el-form-item__error" v-if="formErrors.email">{{formErrors.email[0]}}</div>
            </el-form-item>

            <el-form-item label="Level">
                <el-input disabled :value="formModel.role ? 'Admin' : 'Operator'"></el-input>
            </el-form-item>

            <el-form-item label="Password" :class="formErrors.password ? 'is-error' : ''">
                <el-input type="password" placeholder="Password" v-model="formModel.password"></el-input>
                <div class="el-form-item__error" v-if="formErrors.password">{{formErrors.password[0]}}</div>
            </el-form-item>

            <el-form-item label="Konfirmasi Password" :class="formErrors.password ? 'is-error' : ''">
                <el-input type="password" placeholder="Konfirmasi Password" v-model="formModel.password_confirmation"></el-input>
            </el-form-item>
        </el-form>
        <span slot="footer">
            <el-button type="primary" @click="save" icon="el-icon-success">SIMPAN</el-button>
            <el-button type="info" @click="$emit('close')" icon="el-icon-error">TUTUP</el-button>
        </span>
    </el-dialog>
</template>

<script>
export default {
    props: ['show'],
    data() {
        return {
            formModel: JSON.parse(window.localStorage.getItem('user')),
            loading: false,
            formErrors: {},
            error: {},
        }
    },
    methods: {
        save() {
            this.loading = true
            axios.put('/user/' + this.formModel.id, this.formModel).then(r => {
                this.$message({
                    message: 'Data berhasil diupdate',
                    type: 'success',
                    showClose: true
                })
                window.localStorage.setItem('user', r.data)
                this.$store.state.user = r.data
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
        }
    }
}
</script>

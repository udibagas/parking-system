<template>
    <div>
        <el-page-header @back="$emit('back')" content="SETTING"> </el-page-header>
        <el-divider></el-divider>

        <el-tabs type="card">
            <el-tab-pane lazy label="Global Setting" v-loading="loading">
                <el-card>
                    <el-form label-position="left" label-width="250px">
                        <el-form-item label="Jumlah Kendaraan Per Kartu" :class="formErrors.jml_kendaraan_per_kartu ? 'is-error' : ''">
                            <el-input type="number" placeholder="Jumlah Kendaraan Per Kartu (0 untuk tak terbatas)" v-model="formModel.jml_kendaraan_per_kartu"></el-input>
                            <div class="el-form-item__error" v-if="formErrors.jml_kendaraan_per_kartu">{{formErrors.jml_kendaraan_per_kartu[0]}}</div>
                        </el-form-item>
                        <el-form-item label="Masa Aktif Member" :class="formErrors.masa_aktif_member ? 'is-error' : ''">
                            <el-select placeholder="Masa Aktif Member" v-model="formModel.masa_aktif_member" style="width:100%">
                                <el-option v-for="(l, i) in ['24 JAM', 'LEWAT TENGAH MALAM']" :key="i" :value="i" :label="l"></el-option>
                            </el-select>
                            <div class="el-form-item__error" v-if="formErrors.masa_aktif_member">{{formErrors.masa_aktif_member[0]}}</div>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="() => { !!formModel.id ? update() : store(); }" icon="el-icon-success">SIMPAN</el-button>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-tab-pane>
            <el-tab-pane lazy label="Gate">
                <ParkingGate />
            </el-tab-pane>
            <el-tab-pane lazy label="Identitas Lokasi">
                <LocationIdentity />
            </el-tab-pane>
            <el-tab-pane lazy label="Jenis Kendaraan">
                <VehicleType />
            </el-tab-pane>
            <el-tab-pane lazy label="Group Member">
                <GroupMember />
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import ParkingGate from './ParkingGate'
import LocationIdentity from './LocationIdentity'
import VehicleType from './VehicleType'
import GroupMember from './GroupMember'

export default {
    components: { ParkingGate, LocationIdentity, VehicleType, GroupMember },
    data() {
        return {
            formModel: {},
            formErrors: {},
            loading: false
        }
    },
    methods: {
        requestData() {
            axios.get('/setting').then(r => {
                this.formModel = r.data
            }).catch(e => {
                this.$message({
                    message: e.response.data.message,
                    type: 'error',
                    showClose: true
                })
            })
        },
        store() {
            this.loading = true;
            axios.post('/setting', this.formModel).then(r => {
                this.$message({
                    message: 'Data berhasil disimpan.',
                    type: 'success',
                    showClose: true
                });
                this.requestData();
            }).catch(e => {
                if (e.response.status == 422) {
                    this.formErrors = e.response.data.errors;
                }

                if (e.response.status == 500) {
                    this.formErrors = {}
                    this.$message({
                        message: e.response.data.message,
                        type: 'error',
                        showClose: true
                    })
                }
            }).finally(() => {
                this.loading = false
            })
        },
        update() {
            this.loading = true;
            axios.put('/setting/' + this.formModel.id, this.formModel).then(r => {
                this.$message({
                    message: 'Data berhasil disimpan.',
                    type: 'success',
                    showClose: true
                });
                this.requestData()
            }).catch(e => {
                if (e.response.status == 422) {
                    this.formErrors = e.response.data.errors;
                }

                if (e.response.status == 500) {
                    this.formErrors = {}
                    this.$message({
                        message: e.response.data.message,
                        type: 'error',
                        showClose: true
                    })
                }
            }).finally(() => {
                this.loading = false
            })
        },
    },
    mounted() {
        this.requestData()
    }
}
</script>

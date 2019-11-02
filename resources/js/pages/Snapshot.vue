<template>
    <div>
        <el-page-header @back="$emit('back')" content="SNAPSHOT"> </el-page-header>
        <el-divider></el-divider>

        <el-form inline>
            <el-form-item>
                <el-date-picker
                @change="requestData"
                v-model="dateRange"
                format="dd-MMM-yyyy HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                range-separator="-"
                start-placeholder="Dari Tanggal"
                end-placeholder="Sampai Tanggal">
                </el-date-picker>
            </el-form-item>

            <!-- <el-form-item>
                <el-select v-model="gate" placeholder="Gate" clearable multiple @change="requestData">
                    <el-option v-for="(t, i) in $store.state.parkingGateList" :value="t.id" :label="t.name" :key="i"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-select v-model="vehicle_type" placeholder="Jenis Kendaraan" clearable multiple @change="requestData">
                    <el-option v-for="(t, i) in $store.state.vehicleTypeList" :value="t.id" :label="t.name" :key="i"></el-option>
                </el-select>
            </el-form-item> -->

            <el-form-item>
                <el-button type="danger" icon="el-icon-delete" @click="deleteSnapshot">HAPUS SNAPSHOT</el-button>
            </el-form-item>
        </el-form>

        <div style="height:calc(100vh - 400px);overflow:auto;" v-loading="loading">
            <span v-for="(data, index) in paginatedData" :key="index">
                <el-image
                :style="'width: ' + imgSize.active +'px; height: ' + imgSize.active + 'px;' + 'margin:5px'"
                :src="data.name"
                :preview-src-list="[data.name]"
                lazy
                fit="cover">
                    <div slot="error" class="el-image__error">
                        <i class="el-icon-picture-outline"></i>
                    </div>
                </el-image>
            </span>
        </div>

        <el-slider style="width:300px;margin:15px auto 0;" v-model="imgSize.active" :min="imgSize.min" :max="imgSize.max"></el-slider>
        <div style="text-align:center;margin-bottom:0px">
            <el-button-group>
                <el-button size="mini" plain type="primary" :disabled="imgSize.active == imgSize.min" @click="resizeImg(-imgSize.step)" icon="el-icon-zoom-out"></el-button>
                <el-button size="mini" plain type="primary" :disabled="imgSize.active == imgSize.max" @click="resizeImg(imgSize.step)" icon="el-icon-zoom-in"></el-button>
            </el-button-group>
        </div>

        <el-divider></el-divider>

        <el-pagination background
        @current-change="(p) => { page = p; }"
        @size-change="(s) => { pageSize = s; }"
        layout="prev, pager, next, sizes, total"
        :page-size="pageSize"
        :page-sizes="[10, 25, 50, 100]"
        :total="snapshots.length">
        </el-pagination>

    </div>
</template>

<script>
export default {
    computed: {
        paginatedData() {
            return this.snapshots.slice((this.page - 1) * this.pageSize, this.pageSize);
        }
    },
    data() {
        return {
            page: 1,
            pageSize: 10,
            imgSize: { min: 150, active: 150, max: 300, step: 10 },
            snapshots: [],
            dateRange: [moment().format('YYYY-MM-01 00:00:00'), moment().format('YYYY-MM-DD HH:mm:ss')],
            gate: [],
            vehicle_type: [],
            loading: false
        }
    },
    methods: {
        resizeImg(step) {
            // console.log(step)

            if (step > 0) {
                if (this.imgSize.max == this.imgSize.active) {
                    return
                }
            }

            if (step < 0) {
                if (this.imgSize.min == this.imgSize.active) {
                    return
                }
            }

            this.imgSize.active += step
        },
        requestData() {
            let params = {
                // page: this.page,
                // pageSize: this.pageSize,
                // sort: 'created_at',
                // order: 'ascending',
                dateRange: this.dateRange,
                // vehicle_type: this.vehicle_type,
                // gate: this.gate,
            }

            this.loading = true;
            axios.get('/parkingTransaction/getSnapshot', { params: params }).then(r => {
                this.snapshots = Object.values(r.data)
            }).catch(e => {
                if (e.response.status == 500) {
                    this.$message({
                        message: e.response.data.message,
                        type: 'error',
                        showClose: true
                    });
                }
            }).finally(() => {
                this.loading = false;
            })
        },
        deleteSnapshot() {
            this.$confirm('Anda yakin?', 'Peringatan', { type: 'warning' }).then(() => {
                let payload = { dateRange: this.dateRange }
                this.loading = true
                axios.delete('parkingTransaction/deleteSnapshot', { params: payload }).then(r => {
                    this.$message({
                        message: r.data.message,
                        type: 'success',
                        showClose: true
                    });
                    this.requestData();
                }).catch(e => {
                    this.$message({
                        message: e.response.data.message,
                        type: 'error',
                        showClose: true
                    });
                }).finally(() => {
                    this.loading = false
                })
            }).catch(e => console.log(e))
        }
    },
    mounted() {
        this.requestData()
        // this.$store.commit('getParkingGateList')
        // this.$store.commit('getVehicleTypeList')
    }

}
</script>

<style lang="scss" scoped>

</style>

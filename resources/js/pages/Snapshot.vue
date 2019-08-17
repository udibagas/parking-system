<template>
    <div>
        <el-page-header @back="$emit('back')" content="SNAPSHOT"> </el-page-header>
        <el-divider></el-divider>

        <el-form inline>
            <el-form-item>
                <el-date-picker
                @change="requestData"
                v-model="filter.dateRange"
                format="dd/MMM/yyyy"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date">
                </el-date-picker>
            </el-form-item>

            <el-form-item>
                <el-select v-model="filter.gate" placeholder="Gate" clearable>
                    <el-option v-for="(t, i) in $store.state.parkingGateList" :value="t.id" :label="t.name" :key="i"></el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-select v-model="filter.vehicle_type" placeholder="Vehicle Type" clearable>
                <el-option v-for="(t, i) in $store.state.vehicleTypeList" :value="t.id" :label="t.name" :key="i"></el-option>
            </el-select>
            </el-form-item>

            <el-form-item>
                <el-button-group>
                    <el-button :disabled="imgSize.active == imgSize.min" @click="resizeImg(-imgSize.step)" icon="el-icon-zoom-out"></el-button>
                    <el-button :disabled="imgSize.active == imgSize.max" @click="resizeImg(imgSize.step)" icon="el-icon-zoom-in"></el-button>
                </el-button-group>
            </el-form-item>

            <el-form-item>
                <el-button plain disabled type="danger" icon="el-icon-delete">HAPUS SNAPSHOT</el-button>
            </el-form-item>
        </el-form>

        <div style="height:calc(100vh - 320px);overflow:auto;">
            <el-image
            v-for="(image, index) in images"
            :key="index"
            :style="'width: ' + imgSize.active +'px; height: ' + imgSize.active + 'px;' + 'margin:5px'"
            :src="image"
            :preview-src-list="[image]"
            lazy
            fit="cover"></el-image>
        </div>

        <el-slider v-model="imgSize.active" :min="imgSize.min" :max="imgSize.max"></el-slider>

        <!-- <el-divider></el-divider> -->

        <el-pagination background
        @current-change="(p) => { page = p; requestData(); }"
        @size-change="(s) => { pageSize = s; requestData(); }"
        layout="prev, pager, next, sizes, total"
        :page-size="pageSize"
        :page-sizes="[10, 25, 50, 100]"
        :total="tableData.total">
        </el-pagination>

    </div>
</template>

<script>
export default {
    data() {
        return {
            page: 1,
            pageSize: 10,
            imgSize: { min: 150, active: 150, max: 300, step: 10 },
            tableData: { total: 1000 },
            filter: {
                dateRange: [moment().format('YYYY-MM-01'), moment().format('YYYY-MM-DD')]
            },
            images: [
                'images/logo.jpg',
                'images/logo.jpg',
                'images/logo.jpg',
                'images/logo.jpg',
                'images/logo.jpg',
                'images/logo.jpg',
                'images/logo.jpg',
                'images/logo.jpg',
                'images/logo.jpg',
                'images/logo.jpg',
                'images/logo.jpg',
                'images/logo.jpg',
                'images/logo.jpg',
                'images/logo.jpg',
                'images/logo.jpg',
                'images/logo.jpg',
                'images/logo.jpg',
                'images/logo.jpg',
                'images/logo.jpg',
                'images/logo.jpg',
                'images/logo.jpg',
            ]
        }
    },
    methods: {
        resizeImg(step) {
            console.log(step)

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

        }
    },
    mounted() {
        this.$store.commit('getParkingGateList')
        this.$store.commit('getVehicleTypeList')
    }

}
</script>

<style lang="scss" scoped>

</style>

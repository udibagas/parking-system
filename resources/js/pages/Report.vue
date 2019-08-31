<template>
    <div>
        <el-row>
            <el-col :span="8">
                <el-page-header @back="$emit('back')" content="LAPORAN"> </el-page-header>
            </el-col>
            <el-col :span="16" style="text-align:right">
                Pilih Tanggal :
                <el-date-picker
                @change="requestData"
                v-model="dateRange"
                format="dd/MMM/yyyy"
                value-format="yyyy-MM-dd"
                type="daterange"
                range-separator="To"
                start-placeholder="Start date"
                end-placeholder="End date">
                </el-date-picker>

                <el-button type="primary" icon="el-icon-printer" @click="printReport">PRINT LAPORAN</el-button>
            </el-col>
        </el-row>
        <el-divider></el-divider>
        <el-row :gutter="20">
            <el-col :span="8">
                <!-- jumlah transaksi -->
                <el-card class="summary-container bg-cyan">
                    <div slot="header" class="text-center text-white">
                        <span>Transaksi</span>
                    </div>
                    <el-row v-for="(t, id) in transaction" :key="id" :gutter="10">
                        <el-col :span="8" class="col-label">{{t.vehicle_type}}</el-col>
                        <el-col :span="16" class="col-value">: {{t.total | formatNumber}}</el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="8">
                <!-- total tarif -->
                <el-card class="summary-container bg-pink">
                    <div slot="header" class="text-center text-white">
                        <span>Pendapatan</span>
                    </div>
                    <el-row v-for="(t, id) in income" :key="id">
                        <el-col :span="8" class="col-label">{{t.vehicle_type}}</el-col>
                        <el-col :span="16" class="col-value">: Rp. {{t.total | formatNumber}}</el-col>
                    </el-row>
                </el-card>
            </el-col>
            <el-col :span="8">
                <!-- Kendaraan masih di dalam -->
                <el-card class="summary-container bg-teal">
                    <div slot="header" class="text-center text-white">
                        <span>Kendaraan Masih Terparkir</span>
                    </div>
                    <el-row v-for="(t, id) in parkedVehicle" :key="id">
                        <el-col :span="8" class="col-label">{{t.vehicle_type}}</el-col>
                        <el-col :span="16" class="col-value">: {{t.total | formatNumber}}</el-col>
                    </el-row>
                </el-card>
            </el-col>
        </el-row>

        <el-divider></el-divider>
        <div style="height:calc(100vh - 400px);overflow:auto;" v-html="report"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            transaction: [],
            income: [],
            parkedVehicle: [],
            dateRange: [moment().format('YYYY-MM-01'), moment().format('YYYY-MM-DD')],
            report: null
        }
    },
    methods: {
        printReport() {
            window.open(BASE_URL
                + '/report?action=print&dateRange[]='+ this.dateRange[0]
                + '&dateRange[1]=' + this.dateRange[1]
                + '&token=' + this.$store.state.token, '_blank');
        },
        getTransaction() {
            axios.get('getTransaction', { params: { dateRange: this.dateRange } }).then(r => {
                this.transaction = r.data
                let total = r.data.map(d => d.total).reduce((sum, total) => sum + parseInt(total), 0)
                this.transaction.push({ vehicle_type: 'TOTAL', total })
            })
        },
        getIncome() {
            axios.get('getIncome', { params: { dateRange: this.dateRange } }).then(r => {
                this.income = r.data
                let total = r.data.map(d => d.total).reduce((sum, total) => sum + parseInt(total), 0)
                this.income.push({ vehicle_type: 'TOTAL', total })
            })
        },
        getParkedVehicle() {
            axios.get('getParkedVehicle', { params: { dateRange: this.dateRange } }).then(r => {
                this.parkedVehicle = r.data
                let total = r.data.map(d => d.total).reduce((sum, total) => sum + parseInt(total), 0)
                this.parkedVehicle.push({ vehicle_type: 'TOTAL', total })
            })
        },
        getReport() {
            axios.get('report', { params: { dateRange: this.dateRange } }).then(r => {
                this.report = r.data
            })
        },
        requestData() {
            this.getTransaction();
            this.getIncome();
            this.getParkedVehicle();
            this.getReport();
        }
    },
    mounted() {
        this.requestData()
    }
}
</script>

<style lang="scss" scoped>
.summary-container {
    height: 150px;
}

.summary-info {
    font-size: 30px;
}

.td-value {
    background-color: #eee;
    padding: 5px 10px;
}

.col-value, .col-label {
    font-size: 16px;
    color: #fff;
}
</style>

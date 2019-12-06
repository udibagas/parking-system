<template>
    <div v-loading="loading">
        <el-form inline style="text-align:right">
            <el-form-item>
                <el-date-picker @change="requestData" v-model="date" format="dd/MMM/yyyy" value-format="yyyy-MM-dd" type="date">
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" icon="el-icon-printer" @click="printReport">PRINT LAPORAN</el-button>
            </el-form-item>
        </el-form>

        <el-table show-summary stripe :data="report" :summary-method="getSummaries">
            <el-table-column label="Tanggal" header-align="center" align="center">
                <template slot-scope="scope">
                    {{ scope.row.created_at | readableDateTime }}
                </template>
            </el-table-column>
            <el-table-column prop="parking_member.name" label="Nama"></el-table-column>
            <el-table-column prop="parking_member.card_number" label="Nomor Kartu" header-align="center" align="center"></el-table-column>
            <el-table-column label="Plat Nomor" header-align="center" align="center">
                <template slot-scope="scope">
                    {{ scope.row.parking_member.vehicles.map(v => v.plate_number).join(', ') }}
                </template>
            </el-table-column>
            <el-table-column label="Jumlah" header-align="right" align="right">
                <template slot-scope="scope">
                    Rp. {{ scope.row.amount | formatNumber }}
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    data() {
        return {
            date: moment().format('YYYY-MM-DD'),
            report: [],
            loading: false
        }
    },
    methods: {
        requestData() {
            let params = { date: this.date }
            this.loading = true

            axios.get('/memberRenewal/reportDaily', { params: params }).then(r => {
                this.report = r.data
            }).catch(e => {
                this.$message({
                    message: e.response.data.message,
                    type: 'error',
                    showClose: false
                })
            }).finally(() => {
                this.loading = false
            })
        },
        printReport() {
            let params = { date: this.date, action: 'print' }
            this.loading = true

            axios.get('/memberRenewal/reportDaily', { params: params }).then(r => {
                this.$message({
                    message: 'Silakan ambil slip',
                    type: 'success',
                    showClose: false
                })
            }).catch(e => {
                console.log(e)
                this.$message({
                    message: e.response.data.message,
                    type: 'error',
                    showClose: false
                })
            }).finally(() => {
                this.loading = false
            })
        },
        formatNumber(v) {
            try {
                v += '';
                var x = v.split('.');
                var x1 = x[0];
                var x2 = x.length > 1 ? '.' + x[1] : '';
                var rgx = /(\d+)(\d{3})/;
                while (rgx.test(x1)) {
                    x1 = x1.replace(rgx, '$1' + ',' + '$2');
                }
                return x1 + x2;
            } catch (error) {
                return 0
            }
        },
        getSummaries(param) {
            const { columns, data } = param;
            const sums = [];

            columns.forEach((column, index) => {
                if (index === 0) {
                    sums[index] = 'TOTAL';
                    return;
                }

                if (index === 1 || index === 2 || index === 3) {
                    sums[index] = '';
                    return;
                }

                if (index === 4) {
                    let amount = this.report.reduce((prev, curr) => { return prev + Number(curr.amount) }, 0)
                    sums[index] = 'Rp ' + this.formatNumber(amount)
                }
            });

            return sums;
        }
    },
    mounted() {
        this.requestData()
    }
}
</script>

<style lang="scss" scoped>

</style>

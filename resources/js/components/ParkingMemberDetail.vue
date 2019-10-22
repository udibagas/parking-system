<template>
    <el-row :gutter="20">
        <el-col :span="8">
            <table>
                <tbody>
                    <tr><td class="td-label">Group</td><td class="td-value">{{member.group}}</td></tr>
                    <tr><td class="td-label">Nama</td><td class="td-value">{{member.name}}</td></tr>
                    <tr><td class="td-label">Alamat Email</td><td class="td-value">{{member.email}}</td></tr>
                    <tr><td class="td-label">Nomor HP</td><td class="td-value">{{member.phone}}</td></tr>
                    <tr><td class="td-label">Nomor Kartu</td><td class="td-value">{{member.card_number}}</td></tr>
                    <tr><td class="td-label">Jenis</td><td class="td-value">{{member.paid ? 'Berbayar' : 'Gratis'}}</td></tr>
                    <tr><td class="td-label">Tanggal Daftar</td><td class="td-value">{{member.register_date}}</td></tr>
                    <tr><td class="td-label">Tanggal Kedaluarsa</td><td class="td-value">{{member.expiry_date}}</td></tr>
                    <tr><td class="td-label">Siklus Pembayaran</td><td class="td-value">{{member.billing_cycle}} bulan</td></tr>
                    <tr><td class="td-label">Tarif</td><td class="td-value">Rp {{member.fare | formatNumber}}</td></tr>
                    <tr><td class="td-label">Transaksi Terkahir</td><td class="td-value">{{member.last_transaction}}</td></tr>
                    <tr><td class="td-label">Status</td><td class="td-value">{{member.is_active ? 'Aktif' : 'Nonaktif'}}</td></tr>
                </tbody>
            </table>
        </el-col>
        <el-col :span="16">
            <el-tabs type="card">
                <el-tab-pane label="Kendaraan">
                    <el-table :data="member.vehicles">
                        <el-table-column prop="vehicle_type" label="Jenis Kendaraan"></el-table-column>
                        <el-table-column prop="plate_number" label="Plat Nomor"></el-table-column>
                        <el-table-column prop="merk" label="Merk"></el-table-column>
                        <el-table-column prop="type" label="Type" show-overflow-tooltip></el-table-column>
                        <el-table-column prop="tahun" label="Tahun"></el-table-column>
                        <el-table-column prop="warna" label="Warna"></el-table-column>
                    </el-table>
                </el-tab-pane>
                <!-- <el-tab-pane label="Histori Transaksi">

                </el-tab-pane>
                <el-tab-pane label="Histori Pembayaran">

                </el-tab-pane> -->
            </el-tabs>
        </el-col>
    </el-row>
</template>

<script>
export default {
    props: ['member']
}
</script>

<style lang="scss" scoped>
table {
    width: 100%;
    border: 1px solid #160047;
}

.td-label {
    width: 150px;
    font-weight: bold;
    background-color: #ddd;
    padding: 5px 10px;
}

.td-value {
    background-color: #eee;
    padding: 5px 10px;
}
</style>

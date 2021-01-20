<h3 class="text-center">LAPORAN PENDAPATAN PER JENIS KENDARAAN</h3>
<div class="text-center">TANGGAL : {{date('d-M-Y', strtotime($dateRange[0]))}} s/d {{date('d-M-Y', strtotime($dateRange[1]))}}</div>
<br>
<table class="table-auto min-w-full">
    <thead>
        <tr>
            <th class="border px-3 text-left" style="width:33%" rowspan="2">JENIS KENDARAAN</th>
            <th class="border px-3 text-center" style="width:33%" colspan="3">JUMLAH KENDARAAN</th>
            <th class="border px-3 text-right" rowspan="2">PENDAPATAN</th>
        </tr>
        <tr>
            <th class="border px-3 text-center">MEMBER</th>
            <th class="border px-3 text-center">REGULER</th>
            <th class="border px-3 text-center">TOTAL</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($perKendaraan as $d)
        <tr>
            <td class="border px-3 text-left">{{$d->jenis_kendaraan}}</td>
            <td class="border px-3 text-center">{{number_format($d->jumlah_member, 0, ',', '.')}}</td>
            <td class="border px-3 text-center">{{number_format($d->jumlah_reguler, 0, ',', '.')}}</td>
            <td class="border px-3 text-center">{{number_format($d->jumlah_member + $d->jumlah_reguler, 0, ',', '.')}}</td>
            <td class="border px-3 text-right">Rp {{number_format($d->pendapatan + $d->denda, 0, ',', '.')}}</td>
        </tr>
        @endforeach
    </tbody>
    <tfoot>
        <tr>
            <th class="border px-3 text-left">TOTAL</th>
            <th class="border px-3 text-center">{{number_format(array_reduce($perKendaraan, function($total, $current) { return $total + $current->jumlah_member; }, 0), 0, ',', '.')}}</th>
            <th class="border px-3 text-center">{{number_format(array_reduce($perKendaraan, function($total, $current) { return $total + $current->jumlah_reguler; }, 0), 0, ',', '.')}}</th>
            <th class="border px-3 text-center">{{number_format(array_reduce($perKendaraan, function($total, $current) { return $total + $current->jumlah_reguler + $current->jumlah_member; }, 0), 0, ',', '.')}}</th>
            <th class="border px-3 text-right">Rp {{number_format(array_reduce($perKendaraan, function($total, $current) { return $total + $current->pendapatan + $current->denda; }, 0), 0, ',', '.')}}</th>
        </tr>
    </tfoot>
</table>

<br><br>

<h3 style="margin-bottom:0;text-align:center;">LAPORAN PENDAPATAN PER PETUGAS</h3>
<div style="text-align:center;">TANGGAL : {{date('d-M-Y', strtotime($dateRange[0]))}} s/d {{date('d-M-Y', strtotime($dateRange[1]))}}</div>
<br>
<table class="table-auto min-w-full">
    <thead>
        <tr>
            <th class="border px-3 text-left" style="width:33%" rowspan="2">NAMA</th>
            <th class="border px-3 text-center" style="width:33%" colspan="3">JUMLAH TRANSAKSI</th>
            <th class="border px-3 text-right" rowspan="2">PENDAPATAN</th>
        </tr>
        <tr>
            <th class="border px-3 text-center">MEMBER</th>
            <th class="border px-3 text-center">REGULER</th>
            <th class="border px-3 text-center">TOTAL</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($perPetugas as $d)
        <tr>
                <td class="border px-3 text-left">{{$d->operator}}</td>
                <td class="border px-3 text-center">{{number_format($d->jumlah_member, 0, ',', '.')}}</td>
                <td class="border px-3 text-center">{{number_format($d->jumlah_reguler, 0, ',', '.')}}</td>
                <td class="border px-3 text-center">{{number_format($d->jumlah_member + $d->jumlah_reguler, 0, ',', '.')}}</td>
                <td class="border px-3 text-right">Rp {{number_format($d->pendapatan + $d->denda, 0, ',', '.')}}</td>
            </tr>
        @endforeach
    </tbody>
    <tfoot>
        <tr>
            <th class="border px-3 text-left">TOTAL</th>
            <th class="border px-3 text-center">{{number_format(array_reduce($perPetugas, function($total, $current) { return $total + $current->jumlah_member; }, 0), 0, ',', '.')}}</th>
            <th class="border px-3 text-center">{{number_format(array_reduce($perPetugas, function($total, $current) { return $total + $current->jumlah_reguler; }, 0), 0, ',', '.')}}</th>
            <th class="border px-3 text-center">{{number_format(array_reduce($perPetugas, function($total, $current) { return $total + $current->jumlah_member + $current->jumlah_reguler; }, 0), 0, ',', '.')}}</th>
            <th class="border px-3 text-right">Rp {{number_format(array_reduce($perPetugas, function($total, $current) { return $total + $current->pendapatan + $current->denda; }, 0), 0, ',', '.')}}</th>
        </tr>
    </tfoot>
</table>

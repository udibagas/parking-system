<h3 style="margin-bottom:0;text-align:center;">LAPORAN PENDAPATAN PER JENIS KENDARAAN</h3>
<div style="text-align:center;">TANGGAL : {{$dateRange[0]}} s/d {{$dateRange[1]}}</div>
<br>
<table class="table" cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <th style="text-align:left;width:33%">JENIS KENDARAAN</th>
            <th style="text-align:center;width:33%">JUMLAH KENDARAAN</th>
            <th style="text-align:right">PENDAPATAN</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($perKendaraan as $d)
        <tr>
            <td style="text-align:left">{{$d->vehicle_type}}</td>
            <td style="text-align:center">{{number_format($d->jumlah, 0, ',', '.')}}</td>
            <td style="text-align:right">Rp {{number_format($d->pendapatan, 0, ',', '.')}}</td>
        </tr>
        @endforeach
    </tbody>
    <tfoot>
        <tr>
            <th style="text-align:left">TOTAL</th>
            <th style="text-align:center">{{number_format(array_reduce($perKendaraan, function($total, $current) { return $total + $current->jumlah; }, 0), 0, ',', '.')}}</th>
            <th style="text-align:right">Rp {{number_format(array_reduce($perKendaraan, function($total, $current) { return $total + $current->pendapatan; }, 0), 0, ',', '.')}}</th>
        </tr>
    </tfoot>
</table>

<br><br>

<h3 style="margin-bottom:0;text-align:center;">LAPORAN PENDAPATAN PER PETUGAS</h3>
<div style="text-align:center;">TANGGAL : {{$dateRange[0]}} s/d {{$dateRange[1]}}</div>
<br>
<table class="table" cellpadding="0" cellspacing="0">
    <thead>
        <tr>
            <th style="text-align:left;width:33%">NAMA</th>
            <th style="text-align:center;width:33%">JUMLAH TRANSAKSI</th>
            <th style="text-align:right">PENDAPATAN</th>
        </tr>
    </thead>
    <tbody>
        @foreach ($perPetugas as $d)
        <tr>
                <td style="text-align:left">{{$d->operator}}</td>
                <td style="text-align:center">{{number_format($d->jumlah, 0, ',', '.')}}</td>
                <td style="text-align:right">Rp {{number_format($d->pendapatan, 0, ',', '.')}}</td>
            </tr>
        @endforeach
    </tbody>
    <tfoot>
        <tr>
            <th style="text-align:left">TOTAL</th>
            <th style="text-align:center">{{number_format(array_reduce($perPetugas, function($total, $current) { return $total + $current->jumlah; }, 0), 0, ',', '.')}}</th>
            <th style="text-align:right">Rp {{number_format(array_reduce($perPetugas, function($total, $current) { return $total + $current->pendapatan; }, 0), 0, ',', '.')}}</th>
        </tr>
    </tfoot>
</table>

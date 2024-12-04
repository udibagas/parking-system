@extends('layouts.print')

@section('content')
    <h3 class="text-center text-2xl mb-3">DAFTAR MEMBER PARKIR {{$setting->nama_lokasi}} </h3>

    <table class="table-auto min-w-full">
        <thead>
            <tr>
                <th class="border px-3">#</th>
                <th class="border px-3">Nama</th>
                <th class="border px-3">Nomor Kartu</th>
                <th class="border px-3">Plat Nomor</th>
                <th class="border px-3 text-center">Berlaku Sampai</th>
                <th class="border px-3 text-center">Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($data as $d)
            <tr>
                <td class="border px-3 text-center">{{$loop->index + 1}}</td>
                <td class="border px-3">{{$d->nama}}</td>
                <td class="border px-3 text-center">{{$d->nomor_kartu}}</td>
                <td class="border px-3 text-center">{{ implode(', ', array_map(function($v) { return $v['plat_nomor']; }, $d->vehicles->toArray())) }}</td>
                <td class="border px-3 text-center">{{date('d-M-Y', strtotime($d->expiry_date))}}</td>
                <td class="border px-3 text-center {{$d->expired ? 'text-red-700' : 'text-green-700'}}">{{$d->expired ? 'KEDALUARSA' : 'BERLAKU'}}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
@endsection

@extends('layouts.print')

@section('content')
    <h3 class="text-center">DAFTAR MEMBER PARKIR {{$setting->location_name}} </h3>

    <table class="table">
        <thead>
            <tr>
                <th>#</th>
                <th>Nama</th>
                <th>Nomor Katu</th>
                <th>Plat Nomor</th>
                <th class="text-center">Berlaku Sampai</th>
                <th class="text-center">Status</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($data as $d)
            <tr>
                <td class="text-center">{{$loop->index + 1}}</td>
                <td>{{$d->name}}</td>
                <td class="text-center">{{$d->card_number}}</td>
                <td class="text-center">{{ implode(', ', array_map(function($v) { return $v['plate_number']; }, $d->vehicles->toArray())) }}</td>
                <td class="text-center">{{date('d-M-Y', strtotime($d->expiry_date))}}</td>
                <td class="text-center {{$d->expired ? 'text-danger' : 'text-success'}}">{{$d->expired ? 'KEDALUARSA' : 'BERLAKU'}}</td>
            </tr>
            @endforeach
        </tbody>
    </table>
@endsection

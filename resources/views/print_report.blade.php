@extends('layouts.print')

@section('content')
    <div style="width:900px;margin: 40px auto;">
        <h2 style="text-align:center;">{{$setting->location_name}}</h2>
        <hr>
        <br><br>

        @include('report')
    </div>
@endsection

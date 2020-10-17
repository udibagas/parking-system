<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }}</title>
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
</head>
<body>
    <div style="width:900px;margin: 40px auto;">
        <h1 class="text-center text-3xl">{{$setting->nama_lokasi}}</h1>
        <hr>
        <br><br>
        @include('report')
    </div>
    <script type="text/javascript">
        window.print()
    </script>
</body>
</html>

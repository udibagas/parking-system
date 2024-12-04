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
    <div id="app"></div>
    <script type="text/javascript">
        const BASE_URL = '{{url("")}}';
        const APP_LOGO = '{{env('APP_LOGO', 'logo.jpeg')}}';
        const APP_NAME = '{{config('app.name')}}';
        const HIDE_PRINT_REPORT = '{{env('HIDE_PRINT_REPORT', false)}}';
    </script>
    <script src="{{ asset('js/app.js') }}"></script>
</body>
</html>

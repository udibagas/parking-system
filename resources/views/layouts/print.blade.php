<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>{{ config('app.name') }}</title>
    <style media="all">
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, Helvetica, sans-serif;
        }
        .text-right {
            text-align: right;
        }
        .text-center {
            text-align: center;
        }

        .text-red,
        .text-danger {
            color: red;
        }
        .text-green,
        .text-success {
            color: green;
        }
        table {
            border-spacing: 0px;
            border-collapse: separate;
        }
        .table {
            width: 100%;
            border-top: 2px solid #ddd;
        }
        .table th,
        .table td {
            padding: 10px;
            border-bottom: 1px solid #ddd;
        }
    </style>
</head>
<body>
    <div style="width:900px;margin: 40px auto;">
        @yield('content')
    </div>
    <script type="text/javascript">
        window.print()
    </script>
</body>
</html>

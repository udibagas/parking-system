<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AppController extends Controller
{
    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Contracts\Support\Renderable
     */
    public function index()
    {
        return view('layouts.app');
    }

    public function checkAuth(Request $request)
    {
        $operatorPath = [ '/home', '/parking-transaction', '/member', '/report', '/snapshot' ];

        if ($request->user()->role == 0 && !in_array($request->route, $operatorPath)) {
            return response(['message' => 'Anda tidak berhak mengakses halaman ini'], 401);

        }

        return ['message' => 'ok'];
    }

    public function getNavigation()
    {
        return [

        ];
    }
}

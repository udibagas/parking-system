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

    public function checkAuth()
    {
        return ['message' => 'ok'];
    }

    public function getNavigation()
    {
        return [

        ];
    }
}

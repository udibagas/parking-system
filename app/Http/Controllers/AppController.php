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
        $operatorPath = ['/home', '/transaksi', '/member'];

        if ($request->user()->role == 0 && !in_array($request->route, $operatorPath)) {
            return response(['message' => 'Anda tidak berhak mengakses halaman ini'], 401);
        }

        return ['message' => 'ok'];
    }

    public function getNavigation(Request $request)
    {
        $nav = [
            ['label' => 'Home', 'icon' => 'el-icon-s-home', 'icon2' => 'HomeFilled', 'path' => '/'],
            ['label' => 'Transaksi', 'icon' => 'el-icon-document-copy', 'icon2' => 'DocumentCopy',  'path' => '/transaksi'],
            ['label' => 'Keanggotaan', 'icon' => 'el-icon-bank-card', 'icon2' => 'CreditCard',  'path' => '/member'],
        ];

        $adminNav = [
            ['label' => 'Laporan', 'icon' => 'el-icon-data-analysis', 'icon2' => 'DataAnalysis', 'path' => '/report'],
            ['label' => 'User', 'icon' => 'el-icon-user', 'icon2' => 'User',  'path' => '/user'],
            ['label' => 'Log', 'icon' => 'el-icon-bell', 'icon2' => 'Bell',  'path' => '/notification'],
            ['label' => 'Pengaturan', 'icon' => 'el-icon-setting', 'icon2' => 'Operation', 'path' => '/setting'],
            ['label' => 'Perangkat', 'icon' => 'el-icon-printer', 'icon2' => 'Setting', 'path' => '/device'],
        ];

        return $request->user()->role == 1 ? array_merge($nav, $adminNav) : $nav;
    }
}

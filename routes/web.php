<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('login', 'AuthController@login');

Route::group(['middleware' => 'auth'], function () {
    Route::get('checkAuth', 'AppController@checkAuth');
    Route::get('getNavigation', 'AppController@getNavigation');
    Route::post('logout', 'AuthController@logout');
    Route::resource('user', 'UserController')->except(['create', 'edit']);

    // untuk dropdown
    Route::get('member/getList', 'MemberController@getList');
    Route::resource('gateIn', 'GateInController')->except(['create', 'show', 'edit']);
    Route::resource('gateOut', 'GateOutController')->except(['create', 'edit']);
    Route::get('printer/test/{printer}', 'PrinterController@test');
    Route::resource('printer', 'PrinterController')->except(['create', 'show', 'edit']);
    Route::get('kamera/test/{kamera}', 'KameraController@test');
    Route::resource('kamera', 'KameraController')->except(['create', 'show', 'edit']);
    Route::resource('pos', 'PosController')->except(['create', 'show', 'edit']);
    Route::resource('jenisKendaraan', 'JenisKendaraanController')->except(['create', 'show', 'edit']);

    Route::get('member/search', 'MemberController@search');
    Route::resource('member', 'MemberController')->except(['create', 'edit']);
    Route::resource('groupMember', 'GroupMemberController')->except(['create', 'edit', 'show']);

    Route::post('parkingTransaction/printTicketOut/{parkingTransaction}', 'ParkingTransactionController@printTicketOut');
    Route::post('parkingTransaction/takeSnapshot/{parkingTransaction}', 'ParkingTransactionController@takeSnapshot');
    Route::post('parkingTransaction/printReport', 'ParkingTransactionController@printReport');
    Route::post('parkingTransaction/printLastTransaction', 'ParkingTransactionController@printLastTransaction');
    Route::post('parkingTransaction/hitungTarif', 'ParkingTransactionController@hitungTarif');
    Route::put('parkingTransaction/setSudahKeluarSemua', 'ParkingTransactionController@setSudahKeluarSemua');
    Route::put('parkingTransaction/setSudahKeluar/{parkingTransaction}', 'ParkingTransactionController@setSudahKeluar');
    Route::get('parkingTransaction/search', 'ParkingTransactionController@search');
    Route::resource('parkingTransaction', 'ParkingTransactionController')->except(['create', 'edit']);

    Route::resource('manualOpenLog', 'ManualOpenLogController')->except(['create', 'edit']);

    Route::get('notification/unreadNotification', 'NotificationController@unreadNotification');
    Route::put('notification/markAllAsRead', 'NotificationController@markAllAsRead');
    Route::put('notification/markAsRead/{id}', 'NotificationController@markAsRead');
    Route::delete('notification/clearNotification', 'NotificationController@clearNotification');
    Route::resource('notification', 'NotificationController')->only(['index', 'update', 'destroy']);

    Route::resource('setting', 'SettingController')->only(['index', 'update', 'store']);
    Route::delete('memberVehicle/{memberVehicle}', 'MemberVehicleController@destroy');

    Route::post('memberRenewal/printSlip/{memberRenewal}', 'MemberRenewalController@printSlip');
    Route::get('memberRenewal/report', 'MemberRenewalController@report');
    Route::get('memberRenewal/reportDaily', 'MemberRenewalController@reportDaily');
    Route::resource('memberRenewal', 'MemberRenewalController')->except(['create', 'edit']);

    Route::get('userLog', 'UserLogController@index');
    Route::delete('userLog', 'UserLogController@clear');

    Route::get('snapshot', 'SnapshotController@index');
    Route::delete('snapshot', 'SnapshotController@delete');

    Route::post('backup', 'BackupController@store');
    Route::get('backup', 'BackupController@index');
    Route::delete('backup', 'BackupController@destroy');
    Route::post('restoreDatabase', 'BackupController@restoreDatabase');
    Route::post('restoreSnapshot', 'BackupController@restoreSnapshot');

    // Report
    Route::get('getIncome', 'ReportController@getIncome');
    Route::get('getTransaction', 'ReportController@getTransaction');
    Route::get('getParkedVehicle', 'ReportController@getParkedVehicle');
    Route::get('getVehicleIn', 'ReportController@getVehicleIn');
    Route::get('report', 'ReportController@pendapatan');

    Route::get('controller-log', function () {
        $output = shell_exec('tail -n 250 /var/log/parking.log');
        return nl2br($output);
    });
});

Route::get('serverInformation', 'ServerInformationController@index');

Route::get('/{any}', 'AppController@index')->where('any', '.*');

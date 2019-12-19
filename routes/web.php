<?php

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

Route::group(['middleware' => 'auth.jwt'], function () {
    Route::get('checkAuth', 'AppController@checkAuth');
    Route::get('getNavigation', 'AppController@getNavigation');
    Route::post('logout', 'AuthController@logout');
    Route::resource('user', 'UserController')->except(['create', 'edit']);
    // Route::resource('locationIdentity', 'LocationIdentityController')->except(['create', 'edit', 'show']);

    // untuk dropdown
    Route::get('parkingGate/getList', 'ParkingGateController@getList');
    Route::get('vehicleType/getList', 'VehicleTypeController@getList');
    Route::get('parkingMember/getList', 'ParkingMemberController@getList');
    Route::get('groupMember/getList', 'GroupMemberController@getList');

    Route::post('parkingGate/openGate/{parkingGate}', 'ParkingGateController@openGate');
    Route::post('parkingGate/testPrinter/{parkingGate}', 'ParkingGateController@testPrinter');
    Route::post('parkingGate/testCamera/{parkingGate}', 'ParkingGateController@testCamera');
    Route::resource('parkingGate', 'ParkingGateController')->except(['create', 'edit']);

    Route::resource('vehicleType', 'VehicleTypeController')->except(['create', 'edit']);

    Route::get('parkingMember/search', 'ParkingMemberController@search');
    Route::resource('parkingMember', 'ParkingMemberController')->except(['create', 'edit']);
    Route::resource('groupMember', 'GroupMemberController')->except(['create', 'edit', 'show']);

    Route::post('parkingTransaction/printReport', 'ParkingTransactionController@printReport');
    Route::post('parkingTransaction/takeSnapshot/{parkingTransaction}', 'ParkingTransactionController@takeSnapshot');
    Route::post('parkingTransaction/printTicket/{parkingTransaction}', 'ParkingTransactionController@printTicket');
    Route::put('parkingTransaction/setSudahKeluarSemua', 'ParkingTransactionController@setSudahKeluarSemua');
    Route::put('parkingTransaction/setSudahKeluar/{parkingTransaction}', 'ParkingTransactionController@setSudahKeluar');
    Route::get('parkingTransaction/search', 'ParkingTransactionController@search');
    Route::resource('parkingTransaction', 'ParkingTransactionController')->except(['create', 'edit']);

    Route::resource('manualOpenLog', 'ManualOpenLogController')->except(['create', 'edit']);

    Route::get('notification/unreadNotification', 'NotificationController@unreadNotification');
    Route::put('notification/markAllAsRead', 'NotificationController@markAllAsRead');
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

    Route::get('snapshots', 'SnapshotsController@index');
    Route::delete('snapshots', 'SnapshotsController@delete');

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
});

Route::get('serverInformation', 'ServerInformationController@index');


Route::get('/{any}', 'AppController@index')->where('any', '.*');

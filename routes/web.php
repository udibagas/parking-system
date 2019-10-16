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
    Route::get('locationIdentity/search', 'LocationIdentityController@search');
    Route::resource('locationIdentity', 'LocationIdentityController')->except(['create', 'edit', 'show']);
    Route::post('parkingGate/openGate/{parkingGate}', 'ParkingGateController@openGate');
    Route::post('parkingGate/testPrinter/{parkingGate}', 'ParkingGateController@testPrinter');
    Route::post('parkingGate/testCamera/{parkingGate}', 'ParkingGateController@testCamera');
    Route::get('parkingGate/getList', 'ParkingGateController@getList');
    Route::resource('parkingGate', 'ParkingGateController')->except(['create', 'edit']);
    Route::get('vehicleType/getList', 'VehicleTypeController@getList');
    Route::resource('vehicleType', 'VehicleTypeController')->except(['create', 'edit']);
    Route::get('parkingMember/getList', 'ParkingMemberController@getList');
    Route::get('parkingMember/search', 'ParkingMemberController@search');
    Route::resource('parkingMember', 'ParkingMemberController')->except(['create', 'edit']);
    Route::get('groupMember/getList', 'GroupMemberController@getList');
    Route::resource('groupMember', 'GroupMemberController')->except(['create', 'edit', 'show']);
    Route::post('parkingTransaction/takeSnapshot/{parkingTransaction}', 'ParkingTransactionController@takeSnapshot');
    Route::post('parkingTransaction/printTicket/{parkingTransaction}', 'ParkingTransactionController@printTicket');
    Route::put('parkingTransaction/setSudahKeluarSemua', 'ParkingTransactionController@setSudahKeluarSemua');
    Route::put('parkingTransaction/setSudahKeluar/{parkingTransaction}', 'ParkingTransactionController@setSudahKeluar');
    Route::get('parkingTransaction/search', 'ParkingTransactionController@search');
    Route::resource('parkingTransaction', 'ParkingTransactionController')->except(['create', 'edit']);
    Route::delete('notification/clearNotification', 'NotificationController@clearNotification');
    Route::resource('notification', 'NotificationController')->only(['index', 'update', 'destroy']);
    Route::resource('setting', 'SettingController')->only(['index', 'update', 'store']);
    Route::delete('memberVehicle/{memberVehicle}', 'MemberVehicleController@destroy');
    Route::post('memberRenewal/printSlip/{memberRenewal}', 'MemberRenewalController@printSlip');
    Route::resource('memberRenewal', 'MemberRenewalController')->except(['create', 'edit']);

    // Report
    Route::get('getIncome', 'ReportController@getIncome');
    Route::get('getTransaction', 'ReportController@getTransaction');
    Route::get('getParkedVehicle', 'ReportController@getParkedVehicle');
    Route::get('report', 'ReportController@pendapatan');
});

Route::get('serverInformation', 'ServerInformationController@index');


Route::get('/{any}', 'AppController@index')->where('any', '.*');

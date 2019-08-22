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
    Route::post('logout', 'AuthController@logout');
    Route::resource('user', 'UserController')->except(['create', 'edit']);
    Route::get('locationIdentity/search', 'LocationIdentityController@search');
    Route::resource('locationIdentity', 'LocationIdentityController')->except(['create', 'edit']);
    Route::get('parkingGate/getList', 'ParkingGateController@getList');
    Route::resource('parkingGate', 'ParkingGateController')->except(['create', 'edit']);
    Route::get('vehicleType/getList', 'VehicleTypeController@getList');
    Route::resource('vehicleType', 'VehicleTypeController')->except(['create', 'edit']);
    Route::get('parkingMember/search', 'ParkingMemberController@search');
    Route::resource('parkingMember', 'ParkingMemberController')->except(['create', 'edit']);
    Route::post('parkingTransaction/takeSnapshot/{parkingTransaction}', 'ParkingTransactionController@takeSnapshot');
    Route::post('parkingTransaction/printTicket/{parkingTransaction}', 'ParkingTransactionController@printTicket');
    Route::post('parkingTransaction/openGate/{parkingGate}', 'ParkingTransactionController@openGate');
    Route::put('parkingTransaction/setSudahKeluar/{parkingTransaction}', 'ParkingTransactionController@setSudahKeluar');
    Route::get('parkingTransaction/search', 'ParkingTransactionController@search');
    Route::resource('parkingTransaction', 'ParkingTransactionController')->except(['create', 'edit']);
    Route::resource('notification', 'NotificationController')->only(['index', 'update', 'destroy']);
    // Route::resource('memberRenewal', 'MemberRenewalController')->except(['create', 'edit']);

    // Report
    Route::get('getIncome', 'ReportController@getIncome');
    Route::get('getTransaction', 'ReportController@getTransaction');
    Route::get('getParkedVehicle', 'ReportController@getParkedVehicle');
    Route::get('report', 'ReportController@pendapatan');
});

Route::get('serverInformation', 'ServerInformationController@index');


Route::get('/{any}', 'AppController@index')->where('any', '.*');

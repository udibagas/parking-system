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

use Illuminate\Support\Facades\Route;

Route::post('login', 'AuthController@login');

Route::group(['middleware' => 'auth'], function () {
    Route::get('checkAuth', 'AppController@checkAuth');
    Route::get('getNavigation', 'AppController@getNavigation');
    Route::post('logout', 'AuthController@logout');
    // untuk dropdown
    Route::get('vehicleType/getList', 'VehicleTypeController@getList');
    Route::get('parkingMember/getList', 'ParkingMemberController@getList');
    Route::get('groupMember/getList', 'GroupMemberController@getList');
    Route::get('parkingMember/search', 'ParkingMemberController@search');
    Route::post('parkingTransaction/printReport', 'ParkingTransactionController@printReport');
    Route::post('parkingTransaction/takeSnapshot/{parkingTransaction}', 'ParkingTransactionController@takeSnapshot');
    Route::post('parkingTransaction/printTicket/{parkingTransaction}', 'ParkingTransactionController@printTicket');
    Route::get('parkingTransaction/search', 'ParkingTransactionController@search');
    Route::delete('memberVehicle/{memberVehicle}', 'MemberVehicleController@destroy');
    Route::post('memberRenewal/printSlip/{memberRenewal}', 'MemberRenewalController@printSlip');
    Route::get('memberRenewal/report', 'MemberRenewalController@report');
    Route::get('memberRenewal/reportDaily', 'MemberRenewalController@reportDaily');
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
    Route::get('getVehicleIn', 'ReportController@getVehicleIn');
    Route::get('report', 'ReportController@pendapatan');

    Route::post('testPrinter/{pos}', 'PosController@testPrinter');
    Route::post('testCamera/{camera}', 'CameraController@test');

    Route::apiResources([
        'camera' => 'CameraController',
        'pos' => 'PosController',
        'user' => 'UserController',
        'vehicleType' => 'VehicleTypeController',
        'parkingMember' => 'ParkingMemberController',
        'groupMember' => 'GroupMemberController',
        'parkingTransaction' => 'ParkingTransactionController',
        'memberRenewal' => 'MemberRenewalController',
        'setting' => 'SettingController'
    ]);
});

Route::get('/{any}', 'AppController@index')->where('any', '.*');

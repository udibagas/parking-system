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
    Route::resource('parkingGate', 'ParkingGateController')->except(['create', 'edit']);
    Route::resource('parkingMember', 'ParkingMemberController')->except(['create', 'edit']);
    Route::resource('parkingTransaction', 'ParkingTransactionController')->except(['create', 'edit']);
    Route::resource('memberRenewal', 'MemberRenewalController')->except(['create', 'edit']);
});

Route::get('/{any}', 'AppController@index')->where('any', '.*');

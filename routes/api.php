<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BackupController;
use App\Http\Controllers\GroupMemberController;
use App\Http\Controllers\MemberRenewalController;
use App\Http\Controllers\MemberVehicleController;
use App\Http\Controllers\ParkingMemberController;
use App\Http\Controllers\ParkingTransactionController;
use App\Http\Controllers\PosController;
use App\Http\Controllers\PrintController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\SnapshotController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserLogController;
use App\Http\Controllers\VehicleTypeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::get('getNavigation', [AppController::class, 'getNavigation']);
    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('parkingMember/search', [ParkingMemberController::class, 'search']);
    Route::post('printReport', [PrintController::class, 'report']);
    Route::post('takeSnapshot/{parkingTransaction}', [ParkingTransactionController::class,  'takeSnapshot']);
    Route::get('parkingTransaction/search', [ParkingTransactionController::class, 'search']);
    Route::delete('memberVehicle/{memberVehicle}', [MemberVehicleController::class, 'destroy']);

    Route::prefix('memberRenewal')->group(function () {
        Route::post('printSlip/{memberRenewal}', [MemberRenewalController::class, 'printSlip']);
        Route::get('report', [MemberRenewalController::class, 'report']);
        Route::get('reportDaily', [MemberRenewalController::class, 'reportDaily']);
    });

    Route::get('userLog', [UserLogController::class, 'index']);
    Route::delete('userLog', [UserLogController::class, 'clear']);
    Route::get('snapshots', [SnapshotController::class, 'index']);
    Route::delete('snapshots', [SnapshotController::class, 'delete']);
    Route::post('backup', [BackupController::class, 'store']);
    Route::get('backup', [BackupController::class, 'index']);
    Route::delete('backup', [BackupController::class, 'destroy']);
    Route::post('restoreDatabase', [BackupController::class, 'restoreDatabase']);
    Route::post('restoreSnapshot', [BackupController::class, 'restoreSnapshot']);

    // Report
    Route::get('getIncome', [ReportController::class, 'getIncome']);
    Route::get('getTransaction', [ReportController::class, 'getTransaction']);
    Route::get('getVehicleIn', [ReportController::class, 'getVehicleIn']);
    Route::get('report', [ReportController::class, 'pendapatan']);

    Route::post('testPrinter/{pos}', [PosController::class, 'testPrinter']);
    Route::get('testCamera/{pos}', [PosController::class, 'testCamera']);
    Route::get('getPosByIp', [PosController::class, 'getPosByIp']);

    Route::get('snapshot', [SnapshotController::class, 'index']);
    Route::post('snapshot/delete', [SnapshotController::class, 'destroy']);

    Route::apiResources([
        'pos' => PosController::class,
        'user' => UserController::class,
        'vehicleType' => VehicleTypeController::class,
        'parkingMember' => ParkingMemberController::class,
        'groupMember' => GroupMemberController::class,
        'parkingTransaction' => ParkingTransactionController::class,
        'memberRenewal' => MemberRenewalController::class,
        'setting' => SettingController::class
    ]);
});

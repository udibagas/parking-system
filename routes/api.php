<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\AreaParkirController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BackupController;
use App\Http\Controllers\GateInController;
use App\Http\Controllers\GateOutController;
use App\Http\Controllers\GroupMemberController;
use App\Http\Controllers\JenisKendaraanController;
use App\Http\Controllers\KameraController;
use App\Http\Controllers\ManualOpenLogController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\MemberRenewalController;
use App\Http\Controllers\MemberVehicleController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\ParkingTransactionController;
use App\Http\Controllers\PosController;
use App\Http\Controllers\PrinterController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\ServerInformationController;
use App\Http\Controllers\SettingController;
use App\Http\Controllers\ShiftController;
use App\Http\Controllers\SnapshotController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserLogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('me', [AuthController::class, 'me']);
    Route::get('checkAuth', [AppController::class, 'checkAuth']);
    Route::get('getNavigation', [AppController::class, 'getNavigation']);
    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('printer/test/{printer}', [PrinterController::class, 'test']);
    Route::get('kamera/test/{kamera}', [KameraController::class, 'test']);
    Route::get('member/search', [MemberController::class, 'search']);

    Route::group(['prefix' => 'parkingTransaction'], function () {
        Route::post('printTicketOut/{parkingTransaction}', [ParkingTransactionController::class, 'printTicketOut']);
        Route::post('takeSnapshot/{parkingTransaction}', [ParkingTransactionController::class, 'takeSnapshot']);
        Route::post('printReport', [ParkingTransactionController::class, 'printReport']);
        Route::post('printLastTransaction', [ParkingTransactionController::class, 'printLastTransaction']);
        Route::post('hitungTarif', [ParkingTransactionController::class, 'hitungTarif']);
        Route::put('setSudahKeluarSemua', [ParkingTransactionController::class, 'setSudahKeluarSemua']);
        Route::put('setSudahKeluar/{parkingTransaction}', [ParkingTransactionController::class, 'setSudahKeluar']);
        Route::get('search', [ParkingTransactionController::class, 'search']);
        Route::post('apiStore', [ParkingTransactionController::class, 'apiStore']);
        Route::apiResource('', ParkingTransactionController::class);
    });

    Route::group(['prefix' => 'notification'], function () {
        Route::get('unreadNotification', [NotificationController::class, 'unreadNotification']);
        Route::put('markAllAsRead', [NotificationController::class, 'markAllAsRead']);
        Route::put('markAsRead/{id}', [NotificationController::class, 'markAsRead']);
        Route::delete('clearNotification', [NotificationController::class, 'clearNotification']);
    });

    Route::delete('memberVehicle/{memberVehicle}', [MemberVehicleController::class, 'destroy']);

    Route::group(['prefix' => 'memberRenewal'], function () {
        Route::get('report', [MemberRenewalController::class, 'report']);
        Route::get('reportDaily', [MemberRenewalController::class, 'reportDaily']);
        Route::post('printSlip/{memberRenewal}', [MemberRenewalController::class, 'printSlip']);
        Route::apiResource('', MemberRenewalController::class, ['except' => 'show']);
    });

    Route::apiResources([
        'areaParkir' => AreaParkirController::class,
        'gateIn' => GateInController::class,
        'gateOut' => GateOutController::class,
        'groupMember' => GroupMemberController::class,
        'jenisKendaraan' => JenisKendaraanController::class,
        'kamera' => KameraController::class,
        'manualOpenLog' => ManualOpenLogController::class,
        'member' => MemberController::class,
        'notification' => NotificationController::class,
        'printer' => PrinterController::class,
        'pos' => PosController::class,
        'setting' => SettingController::class,
        'shift' => ShiftController::class,
        'user' => UserController::class,
    ], ['except' => 'show']);

    Route::get('userLog', [UserLogController::class, 'index']);
    Route::delete('userLog', [UserLogController::class, 'clear']);

    Route::get('snapshot', [SnapshotController::class, 'index']);
    Route::post('snapshot/delete', [SnapshotController::class, 'destroy']);

    Route::group(['prefix' => 'backup'], function () {
        Route::get('', [BackupController::class, 'index']);
        Route::post('', [BackupController::class, 'store']);
        Route::put('', [BackupController::class, 'restore']);
        Route::delete('', [BackupController::class, 'destroy']);
    });

    // Report
    Route::get('getIncome', [ReportController::class, 'getIncome']);
    Route::get('getTransaction', [ReportController::class, 'getTransaction']);
    Route::get('getParkedVehicle', [ReportController::class, 'getParkedVehicle']);
    Route::get('getVehicleIn', [ReportController::class, 'getVehicleIn']);
    Route::get('report', [ReportController::class, 'pendapatan']);
    Route::get('summary', [ReportController::class, 'summary']);

    Route::get('controller-log', function () {
        $output = shell_exec('tail -n 250 /var/log/parking.log');
        return nl2br($output);
    });

    Route::post('gateIn/notification/{gateIn}', [GateInController::class, 'notification']);
    Route::get('getPosByIp', [PosController::class, 'getPosByIp']);
});


Route::get('serverInformation', [ServerInformationController::class, 'index']);

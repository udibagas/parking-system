<?php

namespace App\Http\Controllers;

use App\GateOut;
use App\Jobs\TakeSnapshotManualOpen;
use App\ManualOpenLog;
use App\User;
use Illuminate\Http\Request;
use GuzzleHttp\Client;

class ManualOpenLogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $sort = $request->sort ? $request->sort : 'updated_at';
        $order = $request->order == 'ascending' ? 'asc' : 'desc';

        return ManualOpenLog::selectRaw('manual_open_logs.*, users.name AS operator')
            ->join('users', 'users.id', '=', 'manual_open_logs.user_id')
            ->when($request->keyword, function ($q) use ($request) {
                return $q->where(function ($qq) use ($request) {
                    return $qq->where('users.name', 'LIKE', '%' . $request->keyword . '%')
                        ->orWhere('alasan', 'LIKE', '%' . $request->keyword . '%');
                });
            })->when($request->dateRange, function ($q) use ($request) {
                return $q->whereRaw('DATE(manual_open_logs.updated_at) BETWEEN "' . $request->dateRange[0] . '" AND "' . $request->dateRange[1] . '"');
            })->orderBy($sort, $order)->paginate($request->pageSize);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'alasan' => 'required',
            'gate_out_id' => 'required',
            'password' => ['required', function ($attribute, $value, $fail) {
                $admin = User::admin()->first();

                if (!$admin) {
                    $fail('Tidak ada user admin');
                }

                if (!password_verify($value, $admin->password)) {
                    $fail('Password yang Anda masukkan salah.');
                }
            }]
        ], [], [
            'alasan' => 'Alasan harus diisi',
            'gate_out_id' => 'Gate keluar harus diisi'
        ]);

        $manualOpenLog = ManualOpenLog::create(array_merge($request->all(), [
            'user_id' => $request->user()->id
        ]));

        TakeSnapshotManualOpen::dispatch($manualOpenLog);

        return [
            'message' => 'Data telah disimpan',
            'data' => $manualOpenLog
        ];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ManualOpenLog $manualOpenLog)
    {
        $manualOpenLog->delete();
        // TODO: hapus snapshots
    }
}

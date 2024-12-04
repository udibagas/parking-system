<?php

namespace App\Http\Controllers;

use App\Jobs\TakeSnapshotManualOpen;
use App\Models\ManualOpenLog;
use App\Models\User;
use Illuminate\Http\Request;

class ManualOpenLogController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return ManualOpenLog::with(['user', 'gateOut'])
            ->when($request->keyword, function ($q) use ($request) {
                $q->where('alasan', 'LIKE', "%{$request->keyword}%");
            })->when($request->dateRange, function ($q) use ($request) {
                $q->whereRaw('DATE(manual_open_logs.updated_at) BETWEEN ? AND ?', $request->dateRange);
            })->orderBy($request->sort_prop ?: 'updated_at', $request->sort_order ?: 'desc')
            ->paginate($request->pageSize);
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

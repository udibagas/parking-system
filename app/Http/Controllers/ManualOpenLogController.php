<?php

namespace App\Http\Controllers;

use App\GateOut;
use App\ManualOpenLog;
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
            // 'password' => ['required', function($attribute, $value, $fail) {
            //     if (!password_verify($value, auth()->user()->password)) {
            //         $fail('Password yang Anda masukkan salah.');
            //     }
            // }]
        ]);

        $input = $request->all();
        $input['user_id'] = $request->user()->id;
        $input['snapshot'] = $this->takeSnapshot($request->gateOutId);
        return ManualOpenLog::create($input);
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
        if (file_exists($manualOpenLog->snapshot)) {
            unlink($manualOpenLog->snapshot);
        }
    }

    protected function takeSnapshot($gateOutId)
    {
        $gate = GateOut::find($gateOutId);

        if (!$gate || !$gate->camera_status || !$gate->camera_image_snapshot_url) {
            return '';
        }

        $client = new Client(['timeout' => 3]);

        $fileName = 'snapshot/' . date('Y/m/d/H/') . $gate->name . '-' . date('YmdHis') . '.jpg';

        if (!is_dir('snapshot/' . date('Y/m/d/H'))) {
            mkdir('snapshot/' . date('Y/m/d/H'), 0777, true);
        }

        try {
            $response = $client->request('GET', $gate->camera_image_snapshot_url, [
                'auth' => [
                    $gate->camera_username,
                    $gate->camera_password,
                    $gate->camera_auth_type == 'digest' ? 'digest' : null
                ]
            ]);
            file_put_contents($fileName, $response->getBody());
        } catch (\Exception $e) {
            return '';
        }

        return $fileName;
    }
}

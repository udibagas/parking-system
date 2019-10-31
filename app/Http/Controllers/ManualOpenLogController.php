<?php

namespace App\Http\Controllers;

use App\ManualOpenLog;
use Illuminate\Http\Request;
use App\ParkingGate;
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
        return ManualOpenLog::paginate();
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
            'password' => ['required', function($attribute, $value, $fail) {
                if (!password_verify($value, auth()->user()->password)) {
                    $fail('Password yang Anda masukkan salah.');
                }
            }]
        ]);

        $input = $request->all();
        $input['user_id'] = $request->user()->id;
        $input['snapshot'] = $this->takeSnapshot($request->parking_gate_id);
        return ManualOpenLog::create($input);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
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

    protected function takeSnapshot($parking_gate_id)
    {
        $gate = ParkingGate::find($parking_gate_id);

        if (!$gate || !$gate->camera_status || !$gate->camera_image_snapshot_url) {
            return '';
        }

        $client = new Client(['timeout' => 3]);
        $fileName = 'snapshot/'.date('YmdHis').'.jpg';

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

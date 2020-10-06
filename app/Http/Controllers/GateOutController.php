<?php

namespace App\Http\Controllers;

use App\GateOut;
use App\Http\Requests\GateOutRequest;
use Illuminate\Http\Request;

class GateOutController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return GateOut::orderBy('nama', 'asc')->get()->map(function ($item) {
            return array_merge($item->toArray(), [
                'pos' => $item->pos->nama
            ]);
        });
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GateOutRequest $request)
    {
        $gateOut = GateOut::create($request->all());

        return ['message' => 'Data telah disimpan', 'data' => $gateOut];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\GateOut  $gateOut
     * @return \Illuminate\Http\Response
     */
    public function update(GateOutRequest $request, GateOut $gateOut)
    {
        $gateOut->update($request->all());

        return ['message' => 'Data telah disimpan', 'data' => $gateOut];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\GateOut  $gateOut
     * @return \Illuminate\Http\Response
     */
    public function destroy(GateOut $gateOut)
    {
        $gateOut->delete();
        return ['message' => 'Data telah dihapus'];
    }

    public function test(GateOut $gateOut)
    {
        $connection = \ssh2_connect($gateOut->pos->ip_address);
        \ssh2_auth_password($connection, $gateOut->pos->username, $gateOut->pos->password);

        $openCommand = "echo {$gateOut->open_command} > {$gateOut->device}";
        $closeCommand = "echo {$gateOut->close_command} > {$gateOut->device}";

        \ssh2_exec($connection, $openCommand);

        if ($gateOut->close_command) {
            sleep(1);
            \ssh2_exec($connection, $closeCommand);
        }

        return [
            'open_command' => $openCommand,
            'close_command' => $closeCommand,
            'message' => 'GATE BERHASIL DIBUKA'
        ];
    }
}

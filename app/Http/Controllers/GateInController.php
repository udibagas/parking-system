<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\GateInRequest;
use App\Models\GateIn;
use App\Notifications\GateInNotification;

class GateInController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:1')->except(['index', 'notification']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $data = GateIn::with(['printer'])
            ->orderBy('nama', 'asc')
            ->when($request->status, function ($q) use ($request) {
                $q->where('status', $request->status);
            });

        // ->get()->map(function ($item) {
        //     return array_merge($item->toArray(), ['kameraList' => $item->kameraList]);
        // });

        return $request->paginated ? $data->paginate($request->pageSize) : $data->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GateInRequest $request)
    {
        $gateIn = GateIn::create($request->all());
        shell_exec('sudo systemctl restart parking');
        return ['message' => 'Data telah disimpan', 'data' => $gateIn];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(GateInRequest $request, GateIn $gateIn)
    {
        $gateIn->update($request->all());

        if (!!$gateIn->getChanges()) {
            shell_exec('sudo systemctl restart parking');
        }

        return ['message' => 'Data telah disimpan', 'data' => $gateIn];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(GateIn $gateIn)
    {
        $gateIn->delete();
        shell_exec('sudo systemctl restart parking');
        return ['message' => 'Data telah dihapus'];
    }

    public function notification(Request $request, GateIn $gateIn)
    {
        $request->validate(['message' => 'required']);
        $gateIn->notify(new GateInNotification($request->message));
        return ['message' => 'Notifikasi telah disimpan'];
    }
}

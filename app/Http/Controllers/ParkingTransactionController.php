<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\ParkingTransaction;
use App\Models\Pos;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Storage;

class ParkingTransactionController extends Controller
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

        return ParkingTransaction::selectRaw('
                parking_transactions.*,
                parking_members.name as `member`,
                pos.name as `pos`
            ')
            ->join('parking_members', 'parking_members.id', '=', 'parking_transactions.parking_member_id', 'LEFT')
            ->join('pos', 'pos.id', '=', 'parking_transactions.pos_id')
            ->when($request->dateRange, function ($q) use ($request) {
                return $q->whereBetween('parking_transactions.time_in', $request->dateRange);
            })->when($request->keyword, function ($q) use ($request) {
                return $q->where(function ($qq) use ($request) {
                    return $qq->where('parking_transactions.barcode_number', 'LIKE', '%' . $request->keyword . '%')
                        ->orWhere('parking_transactions.plate_number', 'LIKE', '%' . $request->keyword . '%')
                        ->orWhere('parking_transactions.card_number', 'LIKE', '%' . $request->keyword . '%')
                        ->orWhere('parking_transactions.operator', 'LIKE', '%' . $request->keyword . '%');
                });
            })->when($request->is_member, function ($q) use ($request) {
                return $q->whereIn('parking_transactions.is_member', $request->is_member);
            })->when($request->drive_thru, function ($q) use ($request) {
                return $q->whereIn('parking_transactions.drive_thru', $request->drive_thru);
            })->when($request->vehicle_type, function ($q) use ($request) {
                return $q->whereIn('parking_transactions.vehicle_type', $request->vehicle_type);
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
        $input = $request->all();

        if (auth()->check()) {
            $input['operator'] = auth()->user()->name;
        }

        $pos = Pos::where('ip_address', $request->ip())->first();

        if ($pos) {
            $input['pos_id'] = $pos->id;
        }

        return ParkingTransaction::create($input);
    }

    public function takeSnapshot(ParkingTransaction $parkingTransaction)
    {
        $pos = $parkingTransaction->pos;

        if (!$pos) {
            return response(['message' => 'POS TIDAK TERDAFTAR'], 404);
        }

        $client = new Client(['timeout' => 3]);

        try {
            $response = $client->request('GET', $pos->camera_snapshot_url, [
                'auth' => [
                    $pos->camera_username,
                    $pos->camera_password,
                    'digest'
                ]
            ]);

            $fileName = 'snapshots/' . date('Y/m/d/H/') . $pos->name . date('-YmdHis') . '.jpeg';
            Storage::put($fileName, $response->getBody());
        } catch (\Exception $e) {
            return response(['message' => 'GAGAL MENGAMBIL GAMBAR. ' . $e->getMessage()], 500);
        }

        $parkingTransaction->update(['snapshot_in' => $fileName]);
        $parkingTransaction->refresh();
        return $parkingTransaction;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(ParkingTransaction $parkingTransaction)
    {
        $parkingTransaction->delete();
        return ['message' => 'Transaksi telah dihapus'];
    }
}

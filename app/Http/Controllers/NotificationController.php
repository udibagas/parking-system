<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class NotificationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return DB::table('notifications')->when($request->keyword, function ($q) use ($request) {
            return $q->whereJsonContains('message', 'LIKE', '%' . $request->keyword . '%');
        })->when($request->read == 0, function ($q) {
            return $q->whereNull('read_at');
        })->when($request->dateRange, function ($q) use ($request) {
            return $q->whereRaw('DATE(updated_at) BETWEEN "' . $request->dateRange[0] . '" AND "' . $request->dateRange[1] . '"');
        })->orderBy($request->sort ? $request->sort : 'created_at', $request->order == 'ascending' ? 'asc' : 'desc')
            ->paginate($request->pageSize);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function markAsRead($id)
    {
        DB::table('notifications')->where('id', $id)->update(['read_at' => now()]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table('notifications')->where('id', $id)->delete();
        return ['message' => 'Data telah dihapus.'];
    }

    public function clearNotification()
    {
        DB::table('notifications')->truncate();
        return ['message' => 'Data telah dihapus.'];
    }

    public function unreadNotification()
    {
        return DB::table('notifications')->whereNull('read_at')->orderBy('created_at', 'desc')->get();
    }

    public function markAllAsRead()
    {
        DB::table('notifications')->update(['read_at' => now()]);
        return ['message' => 'Data telah disimpan'];
    }
}

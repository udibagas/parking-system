<?php

namespace App\Http\Controllers;

use App\Models\UserLog;
use Illuminate\Http\Request;

class UserLogController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:1');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        return UserLog::selectRaw('user_logs.*, users.name AS user')
            ->join('users', 'users.id', '=', 'user_logs.user_id')
            ->where('users.name', '!=', 'controller')
            ->when($request->keyword, function ($q) use ($request) {
                $q->where(function ($q) use ($request) {
                    $q->where('users.name', 'LIKE', '%' . $request->keyword . '%')
                        ->orWhere('action', 'LIKE', '%' . $request->keyword . '%');
                });
            })->when($request->dateRange, function ($q) use ($request) {
                $q->whereRaw('DATE(user_logs.updated_at) BETWEEN "' . $request->dateRange[0] . '" AND "' . $request->dateRange[1] . '"');
            })->orderBy($request->sort_prop ?: 'updated_at', $request->sort_order ?: 'desc')
            ->paginate($request->pageSize);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function clear()
    {
        UserLog::truncate();
        return ['message' => 'Log berhasil dihapus'];
    }
}

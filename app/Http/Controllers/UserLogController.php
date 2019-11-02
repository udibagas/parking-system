<?php

namespace App\Http\Controllers;

use App\UserLog;
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
        $sort = $request->sort ? $request->sort : 'updated_at';
        $order = $request->order == 'ascending' ? 'asc' : 'desc';

        return UserLog::selectRaw('user_logs.*, users.name AS user')
            ->join('users', 'users.id', '=', 'user_logs.user_id')
            ->when($request->keyword, function($q) use ($request) {
                return $q->where(function($qq) use ($request) {
                    return $qq->where('users.name', 'LIKE', '%'.$request->keyword.'%')
                        ->orWhere('action', 'LIKE', '%'.$request->keyword.'%');
                });
            })->when($request->dateRange, function($q) use ($request) {
                return $q->whereRaw('DATE(user_logs.updated_at) BETWEEN "'.$request->dateRange[0].'" AND "'.$request->dateRange[1].'"');
            })->orderBy($sort, $order)->paginate($request->pageSize);
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

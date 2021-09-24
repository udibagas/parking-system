<?php

namespace App\Http\Controllers;

use App\Models\AbsensiOperator;
use Illuminate\Http\Request;

class AbsensiOperatorController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return AbsensiOperator::with(['user:id,name'])->when($request->keyword, function ($q) use ($request) {
            $q->whereHas('user', function ($q) use ($request) {
                $q->where('name', 'LIKE', "%{$request->keyword}%");
            });
        })->when($request->date, function ($q) use ($request) {
            $q->whereRaw('DATE(login) BETWEEN ? AND ? OR DATE(logout) BETWEEN ? AND ?', [...$request->date, ...$request->date]);
        })->orderBy($request->sort_prop ?: 'updated_at', $request->sort_order ?: 'desc')
            ->paginate($request->pageSize);
    }
}

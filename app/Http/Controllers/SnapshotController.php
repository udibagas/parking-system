<?php

namespace App\Http\Controllers;

use App\Snapshot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class SnapshotController extends Controller
{
    public function index(Request $request)
    {
        // year
        if ($request->level == 0) {
            return DB::table('snapshots')
                ->selectRaw("DISTINCT(YEAR(created_at)) AS y")
                ->get()->map(function ($i) {
                    return $i->y;
                })->flatten();
        }

        // month
        if ($request->level == 1) {
            return DB::table('snapshots')
                ->selectRaw("DISTINCT(MONTH(created_at)) AS m")
                ->whereRaw("YEAR(created_at) = ?", [$request->year])
                ->get()->map(function ($i) {
                    return $i->m;
                })->flatten();
        }

        // date
        if ($request->level == 2) {
            return DB::table('snapshots')
                ->selectRaw("DISTINCT(DAY(created_at)) AS d")
                ->whereRaw("YEAR(created_at) = ? AND MONTH(created_at) = ?", [$request->year, $request->month])
                ->get()->map(function ($i) {
                    return $i->d;
                })->flatten();
        }

        // hour
        if ($request->level == 3) {
            return DB::table('snapshots')
                ->selectRaw("DISTINCT(HOUR(created_at)) AS h")
                ->whereRaw(
                    "YEAR(created_at) = ? AND MONTH(created_at) = ? AND DAY(created_at) = ?",
                    [$request->year, $request->month, $request->day]
                )
                ->get()->map(function ($i) {
                    return $i->h;
                })->flatten();
        }

        // file
        if ($request->level == 4) {
            return DB::table('snapshots')
                ->whereRaw(
                    "YEAR(created_at) = ? AND MONTH(created_at) = ? AND DAY(created_at) = ? AND HOUR(created_at) = ?",
                    [$request->year, $request->month, $request->day, $request->hour]
                )
                ->get()->map(function ($i) {
                    return [
                        'filename' => $i->filename,
                        'url' => Storage::url($i->path)
                    ];
                });
        }

        return [];
    }

    public function delete(Request $request)
    {
        $data = Snapshot::when($request->year, function ($q) use ($request) {
            $q->whereYear('created_at', $request->year);
        })->when($request->month, function ($q) use ($request) {
            $q->whereMonth('created_at', $request->month);
        })->when($request->day, function ($q) use ($request) {
            $q->whereRaw('DAY(created_at) = ?', [$request->day]);
        })->when($request->hour, function ($q) use ($request) {
            $q->whereRaw('HOUR(created_at) = ?', [$request->hour]);
        })->when($request->filename, function ($q) use ($request) {
            $q->where('filename', $request->filename);
        })->get();

        foreach ($data as $d) {
            Storage::delete([$d->path]);
            $d->delete();
        }

        return ['message' => 'Snapshot berhasil dihapus'];
    }
}

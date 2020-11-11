<?php

namespace App\Http\Controllers;

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
        $this->deleteFiles('storage/snapshots/' . $request->target);
        return ['message' => 'Snapshot berhasil dihapus'];
    }

    protected function deleteFiles($target)
    {
        if (is_dir($target)) {
            $files = glob($target . '*', GLOB_MARK);

            foreach ($files as $file) {
                $this->deleteFiles($file);
            }

            rmdir($target);
        } elseif (is_file($target)) {
            unlink($target);
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class SnapshotsController extends Controller
{
    public function index(Request $request)
    {
        // year
        if ($request->level == 0) {
            return scandir('snapshot');
        }

        // month
        if ($request->level == 1 && is_dir('snapshot/'.$request->year)) {
            return scandir('snapshot/'.$request->year);
        }

        // date
        if ($request->level == 2 && is_dir('snapshot/'.$request->year.'/'.$request->month)) {
            return scandir('snapshot/'.$request->year.'/'.$request->month);
        }

        // hour
        if ($request->level == 3 && is_dir('snapshot/'.$request->year.'/'.$request->month.'/'.$request->day)) {
            return scandir('snapshot/'.$request->year.'/'.$request->month.'/'.$request->day);
        }

        // file
        if ($request->level == 4 && is_dir('snapshot/'.$request->year.'/'.$request->month.'/'.$request->day.'/'.$request->hour)) {
            return scandir('snapshot/'.$request->year.'/'.$request->month.'/'.$request->day.'/'.$request->hour);
        }

        return [];
    }

    public function delete(Request $request)
    {
        $this->deleteFiles('snapshot/'.$request->target);
        return ['message' => 'Snapshot berhasil dihapus'];
    }

    protected function deleteFiles($target)
    {
        if (is_dir($target)) {
            $files = glob($target . '*', GLOB_MARK);

            foreach($files as $file) {
                $this->deleteFiles($file);
            }

            rmdir($target);
        } elseif (is_file($target)) {
            unlink($target);
        }
    }
}

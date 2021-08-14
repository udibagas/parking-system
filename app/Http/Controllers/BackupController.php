<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Ifsnop\Mysqldump as IMysqldump;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class BackupController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:1');
    }

    public function index()
    {
        return array_reverse(array_map(function ($file) {
            return [
                'size' => round(Storage::size($file) / 1024) . 'KB',
                'tanggal' => date('d-M-Y H:i:s', Storage::lastModified($file)),
                'file' => $file,
                'url' => Storage::url($file)
            ];
        }, Storage::files('/backup')));
    }

    public function store(Request $request)
    {
        if ($file = $request->file('file')) {
            if ($file->getClientOriginalExtension() != 'sql') {
                return response(['message' => 'File harus dalam format sql'], 500);
            }

            $file->storeAs('backup', $file->getClientOriginalName());
            return response(['message' => 'File backup telah diupload']);
        }

        // masih gak kebaca environment-nya
        try {
            $dump = new IMysqldump\Mysqldump(
                'mysql:host=' . config('database.host') . ';dbname=parking_system',
                env('DB_USERNAME'),
                env('DB_PASSWORD'),
                ['add-drop-table' => true]
            );

            $dump->start(Storage::path('backup/access_gate_backup_' . date('Y-m-d-H-i-s') . '.sql'));
        } catch (\Exception $e) {
            return response(['message' => $e->getMessage()], 500);
        }

        return ['message' => 'Database telah dibackup'];
    }

    public function destroy(Request $request)
    {
        $request->validate(['file' => 'required']);
        Storage::delete($request->file);
        return ['message' => 'File telah dihapus'];
    }

    public function restore(Request $request)
    {
        $request->validate(['file' => 'required']);

        if ($file = $request->file('file')) {
            if ($file->getClientOriginalExtension() != 'sql') {
                return response(['message' => 'File harus dalam format sql'], 500);
            }

            $fileContent = $file->getContent();
        } else {
            $fileContent = Storage::get($request->file);
        }

        try {
            DB::unprepared($fileContent);
        } catch (\Exception $e) {
            return response(['message' => 'Gagal me-restore database.' . $e->getMessage()], 500);
        }

        return ['message' => 'Database telah di restore'];
    }
}

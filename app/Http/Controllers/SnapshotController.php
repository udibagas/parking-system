<?php

namespace App\Http\Controllers;

use App\Models\Snapshot;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SnapshotController extends Controller
{
    public function index(Request $request)
    {
        $dirs   = Storage::directories($request->directory);
        $files  = Storage::files($request->directory);

        return array_map(function ($node) {
            $nodes  = explode('/', $node);
            $isFile = strpos($node, '.') !== false;

            return [
                'label'     => $nodes[count($nodes) - 1],
                'path'      => $node,
                'isFile'    => $isFile,
                'url'       => url(Storage::url($node))
            ];
        }, array_merge($dirs, $files));
    }

    public function destroy(Request $request)
    {
        $request->validate(['checkedNodes' => 'required']);

        foreach ($request->checkedNodes as $node) {
            if ($node['isFile']) {
                Storage::delete($node['path']);
                Snapshot::where('path', $node['path'])->delete();
            } else {
                Storage::deleteDirectory($node['path']);
            }
        }

        return ['message' => 'Data telah dihapus'];
    }
}

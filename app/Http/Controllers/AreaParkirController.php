<?php

namespace App\Http\Controllers;

use App\Models\AreaParkir;
use App\Http\Requests\AreaParkirRequest;
use Illuminate\Http\Request;

class AreaParkirController extends Controller
{
    public function index(Request $request)
    {
        $data = AreaParkir::when($request->keyword, function ($q) use ($request) {
            $q->where('nama', 'LIKE', "%{$request->keyword}%")
                ->orWhere('keterangan', 'LIKE', "%{$request->keyword}%");
        })->orderBy('nama', 'asc');

        return $request->paginated ? $data->paginate($request->pageSize) : $data->get();
    }

    public function store(AreaParkirRequest $request)
    {
        AreaParkir::create($request->all());
        return ['message' => 'Data telah disimpan'];
    }

    public function update(AreaParkirRequest $request, AreaParkir $areaParkir)
    {
        $areaParkir->update($request->all());
        return ['message' => 'Data telah disimpan'];
    }

    public function destroy(AreaParkir $areaParkir)
    {
        $areaParkir->delete();
        return ['message' => 'Data telah dihapus'];
    }
}

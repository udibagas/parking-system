<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\GroupMemberRequest;
use App\GroupMember;

class GroupMemberController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:1')->except(['index']);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        return GroupMember::when($request->keyword, function ($q) use ($request) {
            return $q->where('nama', 'LIKE', "%{$request->keyword}%")
                ->orWhere('keterangan', 'LIKE', "%{$request->keyword}%");
        })->orderBy('nama', 'asc')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(GroupMemberRequest $request)
    {
        $groupMember = GroupMember::create($request->all());
        return ['message' => "Data telah disimpan", 'data' => $groupMember];
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(GroupMemberRequest $request, GroupMember $groupMember)
    {
        $groupMember->update($request->all());
        return ['message' => "Data telah disimpan", 'data' => $groupMember];
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(GroupMember $groupMember)
    {
        $groupMember->delete();
        return ['message' => 'Data telah dihapus'];
    }
}

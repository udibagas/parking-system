<?php

namespace App\Http\Controllers;

use App\Http\Requests\SettingRequest;
use App\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:1');
    }

    public function index()
    {
        $setting = Setting::first();

        if (!$setting) {
            return response(['message' => 'Belum ada setting'], 404);
        }

        return $setting;
    }

    public function store(SettingRequest $request)
    {
        return Setting::create($request->all());
    }

    public function update(SettingRequest $request, Setting $setting)
    {
        $setting->update($request->all());
        return $setting;
    }
}

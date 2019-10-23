<?php

namespace App\Http\Controllers;

use App\Http\Requests\SettingRequest;
use App\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function __construct()
    {
        $this->middleware('role:1')->except(['index']);
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
        $setting = Setting::create($request->all());
        shell_exec('sudo systemctl restart parking');
        return $setting;
    }

    public function update(SettingRequest $request, Setting $setting)
    {
        $setting->update($request->all());

        if (!!$setting->getChanges()) {
            shell_exec('sudo systemctl restart parking');
        }

        return $setting;
    }
}

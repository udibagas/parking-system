<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserLog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $user = User::where('status', 1)
            ->where(function ($q) use ($request) {
                return $q->where('name', $request->email)
                    ->orWhere('email', $request->email);
            })->first();

        if ($user && password_verify($request->password, $user->password)) {
            // simpan log
            UserLog::create([
                'user_id' => $user->id,
                'action' => 'LOGIN'
            ]);

            Auth::login($user);

            return response()->json([
                'token' => $user->createToken($request->device_name ?: 'web')->plainTextToken,
                'user' => $user
            ]);
        }

        return response()->json([
            'message' => 'Username atau password salah',
        ], 403);
    }

    public function logout()
    {
        UserLog::create([
            'user_id' => auth()->user()->id,
            'action' => 'LOGOUT'
        ]);

        return response('', 204);
    }

    public function me()
    {
        return auth()->user();
    }
}

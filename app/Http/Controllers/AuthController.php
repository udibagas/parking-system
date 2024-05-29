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

        if ($user && Auth::attempt(['email' => $user->email, 'password' => $request->password], true)) {
            // simpan log
            UserLog::create([
                'user_id' => $user->id,
                'action' => 'LOGIN'
            ]);

            $request->session()->regenerate();
            // Auth::login($user, true);

            return response()->json([
                'token' => $user->createToken($request->device_name ?: 'web')->plainTextToken,
                'user' => $user
            ]);
        }

        return response()->json([
            'message' => 'Username atau password salah',
        ], 401);
    }

    public function logout(Request $request)
    {
        UserLog::create([
            'user_id' => auth()->user()->id,
            'action' => 'LOGOUT'
        ]);

        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return 'OK';
    }

    public function me(Request $request)
    {
        return response()->json($request->user());
    }
}

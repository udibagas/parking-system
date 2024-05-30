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

            try {
                // $request->session()->regenerate();
                Auth::login($user, true);
                $token = $user->createToken($request->device_name ?: 'web', ['*'], now()->addDay())->plainTextToken;
                return response()->json(['token' => $token, 'user' => $user]);
            } catch (\Throwable $th) {
                return response()->json(['message' => $th->getMessage()], 500);
            }
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

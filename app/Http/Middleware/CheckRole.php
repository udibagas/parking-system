<?php

namespace App\Http\Middleware;

use Closure;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next, $role)
    {
        if ($request->user()->role != $role) {
            return response([
                'success' => false,
                'message' => 'You are not allowed to acces this service'
            ], 403);
        }

        return $next($request);
    }
}

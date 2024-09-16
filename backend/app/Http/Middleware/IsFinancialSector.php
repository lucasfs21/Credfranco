<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use App\Enums\UserRole;

class IsFinancialSector
{
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->user() && $request->user()->role_id == UserRole::FINANCIAL->value) {
            return $next($request);
        }

        return response()->json(['message' => 'Unauthorized'], Response::HTTP_UNAUTHORIZED);
    }
}

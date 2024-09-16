<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use App\Enums\UserRole;


class UserController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware(["auth:sanctum", "is_financial_sector"])
        ];
    }

    public function index(Request $request)
    {

        $users = User::where('role_id', UserRole::COMMERCIAL->value)->get();
        return response()->json($users, Response::HTTP_OK);
    }
}

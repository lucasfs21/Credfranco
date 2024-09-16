<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommissionRequest;
use App\Http\Requests\UpdateCommissionRequest;
use App\Models\Commission;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;


class CommissionToReceiveController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware(["auth:sanctum", "is_commercial_sector"])
        ];
    }

    public function index(Request $request)
    {

        $commissions = Commission::with('user')
            ->where('user_id', auth()->user()->id)
            ->select('user_id', 'reference_month', 'commission_value')
            ->get();
        return response()->json($commissions, Response::HTTP_OK);
    }
}

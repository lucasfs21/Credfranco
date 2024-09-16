<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreCommissionRequest;
use App\Http\Requests\UpdateCommissionRequest;
use App\Models\Commission;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;


class CommissionController extends Controller implements HasMiddleware
{
    public static function middleware()
    {
        return [
            new Middleware(["auth:sanctum", "is_financial_sector"])
        ];
    }

    public function index(Request $request)
    {
        $validated = $request->validate([
            'referenceMonth' => 'required|integer|between:1,12',
        ]);

        $referenceMonth = $validated['referenceMonth'];

        $commissions = Commission::with('user')
            ->where('reference_month', $referenceMonth)
            ->get();
        return response()->json($commissions, Response::HTTP_OK);
    }

    public function store(StoreCommissionRequest $request)
    {
        $validated = $request->validated();

        $totalSales = $validated['total_sales'];

        $calculated = Commission::calculateCommission($totalSales);
        $commissionPercentage = $calculated['percentage'];
        $commissionValue = $calculated['value'];

        $commissionValue = $totalSales * ($commissionPercentage / 100);

        $commission = Commission::create([
            'user_id' => $validated['user_id'],
            'total_sales' => $totalSales,
            'commission_percentage' => $commissionPercentage,
            'commission_value' => $commissionValue,
            'reference_month' => $validated['reference_month'],
        ]);

        return response()->json($commission, Response::HTTP_CREATED);
    }

    public function destroy($id)
    {
        try {
            $commission = Commission::findOrFail($id);
            $commission->delete();

            return response()->json(['message' => 'Commission deleted successfully.']);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Commission not found.'], Response::HTTP_NOT_FOUND);
        }
    }

    public function update(UpdateCommissionRequest $request, $id)
    {
        $validated = $request->validated();

        $commission = Commission::findOrFail($id);

        $totalSales = $validated['total_sales'];

        $calculated = Commission::calculateCommission($totalSales);
        $commissionPercentage = $calculated['percentage'];
        $commissionValue = $calculated['value'];

        $commission->update([
            'reference_month' => $validated['reference_month'],
            'total_sales' => $totalSales,
            'commission_percentage' => $commissionPercentage,
            'commission_value' => $commissionValue,
        ]);

        return response()->json($commission, Response::HTTP_OK);
    }

    public function showByUser($userId)
    {
        $commissions = Commission::where('user_id', $userId)->get();

        if ($commissions->isEmpty()) {
            return response()->json(['message' => 'No commissions found for this user.'], Response::HTTP_NOT_FOUND);
        }

        return response()->json($commissions, Response::HTTP_OK);
    }
}

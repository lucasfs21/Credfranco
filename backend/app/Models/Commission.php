<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Commission extends Model
{
    use HasFactory;

    protected $table = 'commissions';

    protected $fillable = [
        'user_id',
        'total_sales',
        'commission_percentage',
        'commission_value',
        'reference_month'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public static function calculateCommission($totalSales)
    {
        $commissionPercentage = 0;

        if ($totalSales > 5000000) {
            $commissionPercentage = 0.9;
        } elseif ($totalSales >= 4000000) {
            $commissionPercentage = 0.8;
        } elseif ($totalSales >= 3000000) {
            $commissionPercentage = 0.7;
        } elseif ($totalSales >= 2000000) {
            $commissionPercentage = 0.6;
        } elseif ($totalSales >= 1000000) {
            $commissionPercentage = 0.5;
        }

        $commissionValue = $totalSales * ($commissionPercentage / 100);

        return [
            'percentage' => $commissionPercentage,
            'value' => $commissionValue
        ];
    }

    public static function boot()
    {
        parent::boot();

        static::creating(function ($commission) {
            if ($commission->user->role_id !== 1) {
                throw new \Exception('Only users from the finance department can have commissions.');
            }
        });
    }
}

<?php

namespace App\Http\Requests;

use App\Enums\UserRole;
use App\Models\Commission;
use App\Models\User;
use Illuminate\Foundation\Http\FormRequest;

class StoreCommissionRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules()
    {
        return [
            'user_id' => [
                'required',
                'exists:users,id',
                function ($attribute, $value, $fail) {
                    $user = User::find($value);
                    if ($user && $user->role_id != UserRole::COMMERCIAL->value) {
                        $fail('The user must belong to the commercial sector.');
                    }
                }
            ],
            'total_sales' => 'required|numeric',
            'reference_month' => 'required|integer|between:1,12',
        ];
    }

    public function messages()
    {
        return [
            'user_id.exists' => 'The specified user does not exist.',
            'total_sales.required' => 'The sales total is required.',
            'commission_percentage.required' => 'The commission percentage is required.',
            'commission_value.required' => 'The commission value is required.',
            'reference_month.required' => 'The reference month is required.',
            'reference_month.between' => 'The reference month must be between 1 and 12.',
        ];
    }

    public function withValidator($validator)
    {
        $validator->after(function ($validator) {
            $userId = $this->input('user_id');
            $referenceMonth = $this->input('reference_month');

            $exists = Commission::where('user_id', $userId)
                ->where('reference_month', $referenceMonth)
                ->exists();

            if ($exists) {
                $validator->errors()->add('reference_month', 'A commission already exists for this user in the specified month.');
            }
        });
    }
}

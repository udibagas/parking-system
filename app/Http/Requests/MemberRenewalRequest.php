<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MemberRenewalRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'parking_member_id' => 'required|exists:parking_members,id',
            'from_date' => 'required|date',
            'to_date' => 'required|date',
            'billing_cycle' => 'numeric|required',
            'billing_cycle_unit' => 'required|in:days,weeks,months,years',
        ];
    }

    public function attributes()
    {
        return [
            'parking_member_id' => 'Member',
            'from_date' => 'Dari Tanggal',
            'to_date' => 'Sampai Tanggal',
            'billing_cycle' => 'Siklus Pembayaran',
            'billing_cycle_unit' => 'Siklus Pembayaran',
        ];
    }
}

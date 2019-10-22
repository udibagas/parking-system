<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ParkingMemberRequest extends FormRequest
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
            'name' => 'required',
            'card_number' => 'required',
            'is_active' => 'boolean',
            'expiry_date' => 'required|date',
            'phone' => 'required',
            'email' => 'required|email',
            'group_member_id' => 'required',
            'paid' => 'boolean',
            'register_date' => 'required|date',
            'billing_cycle' => 'numeric|required',
            'billing_cycle_unit' => 'required|in:days,weeks,months,years',
            'fare' => 'numeric'
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'Nama',
            'card_number' => 'Nomor Kartu',
            'is_active' => 'Aktif',
            'expiry_date' => 'Tanggal Kedaluarsa',
            'phone' => 'Nomor HP',
            'email' => 'ALamat Email',
            'group_member_id' => 'Group',
            'paid' => 'Berbayar',
            'register_date' => 'Tanggal Daftar',
            'billing_cycle' => 'Siklus Pembayaran',
            'billing_cycle_unit' => 'Siklus Pembayaran',
            'fare' => 'Tarif'
        ];
    }
}

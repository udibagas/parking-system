<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MemberRequest extends FormRequest
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
            'nama' => 'required',
            'nomor_kartu' => 'required',
            'status' => 'boolean',
            'expiry_date' => 'required|date',
            'phone' => 'required',
            // 'email' => 'required|email',
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
            'nama' => 'Nama',
            'nomor_kartu' => 'Nomor Kartu',
            'is_active' => 'Aktif',
            'expiry_date' => 'Tanggal Kedaluarsa',
            'phone' => 'Nomor HP',
            'email' => 'Alamat Email',
            'group_member_id' => 'Group',
            'paid' => 'Berbayar',
            'register_date' => 'Tanggal Daftar',
            'billing_cycle' => 'Siklus Pembayaran',
            'billing_cycle_unit' => 'Siklus Pembayaran',
            'fare' => 'Tarif'
        ];
    }
}

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
            'berbayar' => 'boolean',
            'register_date' => 'required|date',
            'siklus_pembayaran' => 'numeric|required',
            'siklus_pembayaran_unit' => 'required|in:days,weeks,months,years',
            'tarif' => 'numeric'
        ];
    }

    public function attributes()
    {
        return [
            'nama' => 'Nama',
            'nomor_kartu' => 'Nomor Kartu',
            'status' => 'Status',
            'expiry_date' => 'Tanggal Kedaluarsa',
            'phone' => 'Nomor HP',
            'email' => 'Alamat Email',
            'group_member_id' => 'Group',
            'berbayar' => 'Berbayar',
            'register_date' => 'Tanggal Daftar',
            'siklus_pembayaran' => 'Siklus Pembayaran',
            'siklus_pembayaran_unit' => 'Siklus Pembayaran',
            'tarif' => 'Tarif'
        ];
    }
}

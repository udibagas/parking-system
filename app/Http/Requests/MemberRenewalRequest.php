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
            'member_id' => 'required|exists:members,id',
            'dari_tanggal' => 'required|date',
            'sampai_tanggal' => 'required|date',
            'siklus_pembayaran' => 'numeric|required',
            'siklus_pembayaran_unit' => 'required|in:days,weeks,months,years',
        ];
    }

    public function attributes()
    {
        return [
            'member_id' => 'Member',
            'dari_tanggal' => 'Dari Tanggal',
            'sampai_tanggal' => 'Sampai Tanggal',
            'siklus_pembayaran' => 'Siklus Pembayaran',
            'siklus_pembayaran_unit' => 'Siklus Pembayaran',
        ];
    }
}

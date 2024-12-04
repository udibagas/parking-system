<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ParkingTransactionRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'is_member' => 'boolean',
            'jenis_kendaraan' => 'required',
            'gate_in_id' => 'sometimes|exists:gate_ins,id',
            'gate_out_id' => 'exists:gate_outs,id',
            'member_id' => 'exists:members,id',
        ];
    }

    public function attributes()
    {
        return [
            'jenis_kendaraan' => 'Jenis Kendaraan',
            'gate_in_id' => 'Gate Masuk',
            'gate_out_id' => 'Gate Keluar'
        ];
    }
}

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
            // 'vehicle_type' => 'required',
            'gate_in_id' => 'sometimes|exists:parking_gates,id',
            'gate_out_id' => 'exists:parking_gates,id',
            'member_id' => 'exists:parking_members,id',
        ];
    }

    public function attributes()
    {
        return [
            'vehicle_type' => 'Jenis Kendaraan',
            'gate_in_id' => 'Gate Masuk',
            'gate_out_id' => 'Gate Keluar'
        ];
    }
}

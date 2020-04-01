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
            'vehicle_type' => 'required',
            'member_id' => 'exists:parking_members,id',
        ];
    }

    public function attributes()
    {
        return [
            'vehicle_type' => 'Jenis Kendaraan',
        ];
    }
}

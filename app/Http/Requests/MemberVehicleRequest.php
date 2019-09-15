<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MemberVehicleRequest extends FormRequest
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
            'vehicle_type' => 'required',
            'plate_number' => 'required',
            'merk' => 'required',
            'type' => 'required',
            'tahun' => 'required|digits:4',
            'warna' => 'required',
        ];
    }
}

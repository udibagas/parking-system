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
            'plate_number' => 'required',
            'vehicle_type' => 'required|in:MOBIL,MOTOR',
            'is_active' => 'boolean',
            'expiry_date' => 'required|date',
            'phone' => 'required',
            'email' => 'required|email'
        ];
    }
}

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
            'gate_in_id' => 'sometimes|exists:parking_gates,id',
            'gate_out_id' => 'exists:parking_gates,id',
            'user_id' => 'exists:users,id',
            'member_id' => 'exists:parking_members,id',
            'time_in' => 'sometimes|required|date',
            'time_out' => 'sometimes|required|date',
            'card_number' => 'exists:parking_members,card_number'
        ];
    }
}

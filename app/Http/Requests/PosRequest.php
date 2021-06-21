<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PosRequest extends FormRequest
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
            'ip_address' => 'required',
            'printer_device' => 'required',
            'camera_snapshot_url' => 'required|url',
            'camera_username' => 'required',
            'camera_password' => 'required',
            'gate_device_name' => 'required',
            'gate_device_baudrate' => 'required|numeric',
            'gate_command_open' => 'required'
        ];
    }
}

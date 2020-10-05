<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GateInRequest extends FormRequest
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
            'jenis_kendaraan' => 'required',
            'controller_ip_address' => 'required',
            'controller_port' => 'required|numeric',
            'status' => 'boolean',
            'shortcut_key' => 'required|numeric',
        ];
    }

    public function attributes()
    {
        return [
            'nama' => 'Nama',
            'jenis_kendaraan' => 'Jenis Kendaraan',
            'controller_ip_address' => 'Alamat IP Kontroller',
            'controller_port' => 'Port Kontroller',
            'status' => 'Status',
            'shortcut_key' => 'Tombol Shortcut',
        ];
    }
}

<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PrinterRequest extends FormRequest
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
            'ip_address' => 'required|ipv4',
            'port' => 'required|numeric',
            'status' => 'boolean'
        ];
    }

    public function attributes()
    {
        return [
            'nama' => 'Nama',
            'ip_address' => 'Alamat IP',
            'port' => 'Port',
            'status' => 'Status'
        ];
    }
}

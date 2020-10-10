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
            'nama' => 'required',
            'ip_address' => 'required|ipv4',
        ];
    }

    public function attributes()
    {
        return [
            'nama' => 'Nama',
            'ip_address' => 'IP Address',
        ];
    }
}

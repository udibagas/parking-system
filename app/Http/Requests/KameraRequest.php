<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class KameraRequest extends FormRequest
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
            'snapshot_url' => 'required|url',
            'username' => 'required',
            'password' => 'required',
            'auth_type' => 'required',
            'status' => 'required|in:0,1'
        ];
    }

    public function attributes()
    {
        return [
            'nama' => 'Nama',
            'ip_address' => 'Alamat IP',
            'snapshot_url' => 'Snapshot URL',
            'username' => 'Username',
            'password' => 'Password',
            'auth_type' => 'Jenis Auth',
            'status' => 'Status'
        ];
    }
}

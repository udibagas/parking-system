<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserRequest extends FormRequest
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
            // 'email' => 'required|email',
            'password' => 'sometimes|required|alpha_num|confirmed|min:6',
            'is_active' => 'boolean',
            'role' => 'required|numeric|in:0,1'
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'Nama',
            'email' => 'Alamat Email',
            'password' => 'Password',
            'is_active' => 'Aktif',
            'role' => 'Level'
        ];
    }
}

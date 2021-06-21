<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CameraRequest extends FormRequest
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
            'url' => 'required|url',
            'username' => 'required',
            'password' => 'required'
        ];
    }
}

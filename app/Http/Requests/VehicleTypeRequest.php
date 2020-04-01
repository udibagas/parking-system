<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VehicleTypeRequest extends FormRequest
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
            'shortcut_key' => 'required|max:1',
            'tarif_flat' => 'numeric',
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'Nama',
            'shortcut_key' => 'Shortcut Key',
            'tarif_flat' => 'Tarif Flat',
        ];
    }
}

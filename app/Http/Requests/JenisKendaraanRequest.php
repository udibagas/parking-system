<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class JenisKendaraanRequest extends FormRequest
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
            'shortcut_key' => 'required|max:1',
            'tarif_flat' => 'numeric',
            'denda_tiket_hilang' => 'numeric'
        ];
    }

    public function attributes()
    {
        return [
            'nama' => 'Nama',
            'shortcut_key' => 'Shortcut Key',
            'tarif_flat' => 'Tarif Flat',
            'denda_tiket_hilang' => 'Denda Tiket Hilang'
        ];
    }
}

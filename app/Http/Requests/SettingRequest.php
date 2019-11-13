<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SettingRequest extends FormRequest
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
            'jml_kendaraan_per_kartu' => 'required|numeric',
            // 'masa_aktif_member' => 'required|boolean',
            'location_name' => 'required',
            'must_checkout' => 'required|boolean'
        ];
    }

    public function attributes()
    {
        return [
            'jml_kendaraan_per_kartu' => 'Jumlah kendaraan per kartu',
            'location_name' => 'Nama lokasi',
            'must_checkout' => 'Kartu tap in harus check out'
        ];
    }
}

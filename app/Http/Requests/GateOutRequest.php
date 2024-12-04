<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class GateOutRequest extends FormRequest
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
            'shortcut_key' => 'required:max,1',
            'nama' => 'required',
            'jenis_kendaraan' => 'required',
            'device' => 'required',
            'baudrate' => 'required',
            'open_command' => 'required',
            'pos_id' => 'required'
        ];
    }

    public function attributes()
    {
        return [
            'shortcut_key' => 'Shortcut',
            'nama' => 'nama',
            'jenis_kendaraan' => 'Jenis Kendaraan',
            'device' => 'device',
            'baudrate' => 'Baudrate',
            'open_command' => 'Perintah Buka',
            'pos' => 'Pos'
        ];
    }
}

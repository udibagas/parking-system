<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ParkingGateRequest extends FormRequest
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
            'type' => 'required|in:IN,OUT',
            'vehicle_type' => 'required|in:MOBIL,MOTOR,MOBIL/MOTOR',
            // 'controller_ip_address' => 'required',
            // 'controller_port' => 'required|numeric',
            'printer_type' => 'required|in:network,local',
            'printer_device' => 'required_if:printer_type,local',
            'printer_ip_address' => 'required_if:printer_type,network|ipv4',
            'camera_ip_address' => 'required|ipv4',
            'camera_username' => 'required',
            'camera_password' => 'required',
            'camera_image_snapshot_url' => 'required|url',
            // 'camera_video_snapshot_url' => 'required|url',
            'camera_auth_type' => 'required|in:basic,digest',
            'active' => 'boolean'
        ];
    }

    public function attributes()
    {
        return [
            'name' => 'Nama',
            'type' => 'Jenis',
            'vehicle_type' => 'Jenis Kendaraan',
            'controller_ip_address' => 'Alamat IP Kontroller',
            'controller_port' => 'Port Kontroller',
            'printer_type' => 'Jenis Printer',
            'printer_device' => 'Device Printer',
            'printer_ip_address' => 'Alamat IP Printer',
            'camera_ip_address' => 'Alamat IP Kamera',
            'camera_username' => 'Username Kamera',
            'camera_password' => 'Password Kamera',
            'camera_image_snapshot_url' => 'URL Snapshot Kamera',
            'camera_auth_type' => 'Tipe Otentifikasi Kamera',
            'active' => 'Aktif'
        ];
    }
}

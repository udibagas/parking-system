<?php

namespace App\Jobs;

use App\Http\Controllers\MemberController;
use App\Http\Controllers\ParkingTransactionController;
use App\Models\GateIn;
use Error;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Request;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class GateInJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     */
    public function __construct(public GateIn $gate)
    {
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        while (true) {
            $socket = socket_create(AF_INET, SOCK_STREAM, 0);;
            $connected = socket_connect($socket, $this->gate->controller_ip_address, $this->gate->controller_port);

            while ($connected) {
                try {
                    $data = socket_read($socket, 1024);

                    if ($data === false) {
                        throw new Error("Failed to read data");
                    }

                    Log::info("{$this->gate->nama} : {$data}");

                    if (strpos($data, 'IN1ON')) {
                        Log::info("{$this->gate->nama}: Vehicle detected!");
                        // play selamat datang
                        $sent = socket_write($socket, "\xa6MT00007\xa9");

                        if ($sent === false) {
                            throw new Error('Failed to play selamat datang');
                        }

                        // re-read socket to get another data
                        $data = socket_read($socket, 1024);

                        if ($data === false) {
                            throw new Error("Failed to read data");
                        }

                        if (strpos($data, 'W') || strpos($data, 'X') || strpos($data, 'PT')) {
                            $position = 0;

                            if ($position = strpos($data, 'W')) {
                                $delimiter = 'W';
                                $card_type = 'RFID';
                            }

                            if ($position = strpos($data, 'X')) {
                                $delimiter = 'X';
                                $card_type = 'UHF';
                            }

                            if ($position = strpos($data, 'PT')) {
                                $delimiter = 'PT';
                                $card_type = 'RFID';
                            }

                            $nomor_kartu = substr($data, $position); // masih blm sesuai
                            $nomor_kartu = explode("\xa9", $nomor_kartu)[0];

                            if (strpos($data, 'PT')) {
                                $nomor_kartu = hexdec((int) $nomor_kartu);
                            }

                            Log::info("{$this->gate->nama}: {$nomor_kartu}");

                            $request = new Request([
                                'nomor_kartu' => $nomor_kartu,
                                'status' => 1,
                                'card_type' => $card_type
                            ]);

                            $response = app(MemberController::class)->search($request);

                            if ($response->statusText != 'OK') {
                                // play kartu tidak terdaftar
                                $sent = socket_write($socket, "\xa6MT00003\xa9");

                                if ($sent === false) {
                                    throw new Error('Failed to play kartu tidak terdaftar');
                                }
                                continue;
                            }

                            $member = json_decode($response->getContent());

                            if ($member->expired) {
                                $sent = socket_write($socket, "\xa6MT00013\xa9");

                                if ($sent === false) {
                                    throw new Error('Failed to play kartu expired');
                                }

                                continue;
                            }

                            if ($member->unclosed) {
                                $sent = socket_write($socket, "\xa6MT00014\xa9");

                                if ($sent === false) {
                                    throw new Error('Failed to play transaction unclosed');
                                }

                                continue;
                            }

                            if ($member->expired_in == 5) {
                                $sent = socket_write($socket, "\xa6MT00011\xa9");

                                if ($sent === false) {
                                    throw new Error('Failed to play kartu expired in 5 days');
                                }
                            }

                            if ($member->expired_in == 1) {
                                $sent = socket_write($socket, "\xa6MT00012\xa9");

                                if ($sent === false) {
                                    throw new Error('Failed to play kartu expired in 1 day');
                                }
                            }

                            $status = $this->saveData([
                                'is_member' => 1,
                                'nomor_kartu' => $nomor_kartu,
                                'member_id' => $member->id
                            ]);

                            if ($status) {
                                // open gate
                                $sent = socket_write($socket, "\xa6TRIG1\xa9");

                                if ($sent === false) {
                                    throw new Error('Failed to open gate');
                                }
                            } else {
                                Log::error("Failed to save data");
                                continue;
                            }
                        }
                    }
                } catch (\Exception $e) {
                    Log::error("{$this->gate->nama}: {$e->getMessage()}");
                    $connected = false;
                }
            }
        }
    }

    protected function saveData($data)
    {
        $request = new Request($data);
        $response = app(ParkingTransactionController::class)->apiStore($request);
        return $response->statusText == 'OK';
    }
}

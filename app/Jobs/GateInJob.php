<?php

namespace App\Jobs;

use App\Http\Controllers\MemberController;
use App\Models\GateIn;
use App\Models\ParkingTransaction;
use App\Models\Setting;
use Exception;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Http\Request;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class GateInJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    public $socket;

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
            Log::info("{$this->gate->nama} : connecting to {$this->gate->controller_ip_address}:{$this->gate->controller_port}");
            $this->socket = socket_create(AF_INET, SOCK_STREAM, 0);;
            $connected = socket_connect($this->socket, $this->gate->controller_ip_address, $this->gate->controller_port);

            if (!$connected) {
                Log::info("{$this->gate->nama} : Connection failed!");
            }

            while ($connected) {
                Log::info("{$this->gate->nama} connected");
                try {
                    $data = socket_read($this->socket, 1024);

                    if ($data === false) {
                        throw new Exception("Failed to read data");
                    }

                    Log::info("{$this->gate->nama} : {$data}");

                    // Vehicle detected sequence
                    if (strpos($data, 'IN1ON')) {
                        Log::info("{$this->gate->nama}: Vehicle detected!");
                        // play selamat datang
                        $sent = socket_write($this->socket, "\xa6MT00007\xa9");

                        if ($sent === false) {
                            throw new Exception('Failed to play selamat datang');
                        }

                        // re-read socket to get another data
                        $data = socket_read($this->socket, 1024);

                        if ($data === false) {
                            throw new Exception("Failed to read data");
                        }

                        // member tap sequence
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
                                $sent = socket_write($this->socket, "\xa6MT00003\xa9");

                                if ($sent === false) {
                                    throw new Exception('Failed to play kartu tidak terdaftar');
                                }
                                continue;
                            }

                            $member = json_decode($response->getContent());

                            if ($member->expired) {
                                $sent = socket_write($this->socket, "\xa6MT00013\xa9");

                                if ($sent === false) {
                                    throw new Exception('Failed to play kartu expired');
                                }

                                continue;
                            }

                            if ($member->unclosed) {
                                $sent = socket_write($this->socket, "\xa6MT00014\xa9");

                                if ($sent === false) {
                                    throw new Exception('Failed to play transaction unclosed');
                                }

                                continue;
                            }

                            if ($member->expired_in == 5) {
                                $sent = socket_write($this->socket, "\xa6MT00011\xa9");

                                if ($sent === false) {
                                    throw new Exception('Failed to play kartu expired in 5 days');
                                }
                            }

                            if ($member->expired_in == 1) {
                                $sent = socket_write($this->socket, "\xa6MT00012\xa9");

                                if ($sent === false) {
                                    throw new Exception('Failed to play kartu expired in 1 day');
                                }
                            }

                            $transactionData = [
                                'is_member' => 1,
                                'nomor_kartu' => $member->nomor_kartu,
                                'member_id' => $member->id,
                            ];
                        }

                        // tombol tiket sequence
                        if (strpos($data, 'IN2ON')) {
                            $transactionData = ['is_member' => 0];
                        }

                        $transactionData = [
                            ...$transactionData,
                            'gate_in_id' => $this->gate->id,
                            'jenis_kendaraan' => $this->gate->jenis_kendaraan
                        ];

                        $this->saveData($transactionData);

                        if (!$transactionData['is_member']) {
                            // play silakan ambil tiket
                            $sent = socket_write($this->socket, "\xa6MT00002\xa9");
                            if ($sent === false) {
                                throw new Exception("Failed to play silakan ambil tiket");
                            }
                        }

                        // play terimakasih
                        $sent = socket_write($this->socket, "\xa6MT00006\xa9");
                        if ($sent === false) {
                            throw new Exception("Failed to play terimakasih");
                        }

                        sleep(1);

                        // open gate
                        $sent = socket_write($this->socket, "\xa6TRIG1\xa9");
                        if ($sent === false) {
                            throw new Exception('Failed to open gate');
                        }

                        // wait until vehicle in
                        for ($i = 0; $i < 5; $i++) {
                            $data = socket_read($this->socket, 1024);
                            if ($data === false) {
                                throw new Exception('Failed to read data');
                            }

                            if (strpos($data, 'IN3OFF')) {
                                Log::info("{$this->gate->nama}: Vehicle in");
                                break;
                            }
                        }

                        if (strpos($data, 'IN1OFF')) {
                            Log::info("{$this->gate->nama}: Vehicle turn back");
                            continue;
                        }

                        if (strpos($data, 'IN3')) {
                            Log::info("{$this->gate->nama}: Reset");
                            continue;
                        }

                        if (strpos($data, 'IN4ON')) {
                            // play mohon tunggu
                            $sent = socket_write($this->socket, "\xa6MT00005\xa9");
                            if ($sent === false) {
                                throw new Exception("{$this->gate->nama}: Failed to send data");
                            }
                            // TODO: send notification
                            continue;
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
        $timeIn = now();

        $input = [
            ...$data,
            'nomor_barcode' => Str::random(5),
            'shift_id' => ParkingTransaction::setShift($timeIn),
            'time_in' => $timeIn
        ];

        $parkingTransaction = ParkingTransaction::create($input);
        TakeSnapshot::dispatch($parkingTransaction->gateIn, $parkingTransaction);

        if (!$parkingTransaction->is_member) {
            if ($this->gate->printer->type == 'local') {
                $this->printTicket($parkingTransaction);
            } else {
                PrintTicketIn::dispatchSync($parkingTransaction);
            }
        }
    }

    protected function printTicket(ParkingTransaction $data)
    {
        $gate = $this->gate;
        $setting = Setting::first();

        $command = [
            "\xa6PR3",  # start print command, baudrate 9600
            "\x1b\x61\x01TIKET PARKIR\n",  # align center
            "\x1b\x21\x10" . $setting->location_name . "\n\n",  # double height
            "\x1b\x21\x00",  # normal height
            "\x1b\x61\x00",  # align left
            "GATE         : " . $gate->nama . "/" . $gate->vehicle_type . "\n",
            "TANGGAL      : " . $data->time_in->format('d-M-Y') . "\n",
            "JAM          : " . $data->time_in->format('H:i:s') . "\n\n",
            "\x1b\x61\x01",  # align center
            "\x1dhd",  # set barcode height = 100, GS h 100
            "\x1dH\x02",  # set barcode text = below, GS H 2
            "\x1dkE",  # GS k 69
            strlen($data->barcode_number),  # barcode length
            $data->barcode_number,  # barcode content
            "\n" . $setting->additional_info_ticket . "\n",
            "\x1d\x56A",  # full cut, add 3 lines: GS V 65
            "\xa9"  # end command
        ];

        $sent = socket_write($this->socket, implode('', $command));

        if ($sent === false) {
            Log::error("{$this->gate->nama}: Failed to print ticket {$data->nomor_barcode}");
        }
    }
}

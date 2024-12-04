<?php

namespace App\Console\Commands;

use App\Jobs\GateInJob;
use App\Models\GateIn;
use Illuminate\Console\Command;

class ParkingCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'parking:start';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Start Parking Command';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $gates = GateIn::active()->get();
        foreach ($gates as $gate) {
            GateInJob::dispatch($gate);
        }
    }
}

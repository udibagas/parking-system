<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use PhpSerial\PhpSerial;

class GateCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'gate:open {device}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command untuk buka gate';

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * Execute the console command.
     *
     * @return mixed
     */
    public function handle()
    {
        try {
            $serial = new PhpSerial;
            $serial->deviceSet($this->argument('device'));
            $serial->confBaudRate(2400);
            $serial->confParity("none");
            $serial->confCharacterLength(8);
            $serial->confStopBits(1);
            $serial->confFlowControl("none");
            $serial->deviceOpen();
            $serial->sendMessage("AZ123");
        } catch (\Exception $e) {
            $this->error($e->getMessage());
            return;
        } finally {
            $serial->deviceClose();
        }

        $this->info('Gate berhasil dibuka');
    }
}

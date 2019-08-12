<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Mike42\Escpos\PrintConnectors\NetworkPrintConnector;
use Mike42\Escpos\PrintConnectors\FilePrintConnector;
use Mike42\Escpos\Printer;

class PrintCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'print:test {printer} {--type=network} {--port=9100}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command untuk test print';

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
            if ($this->option('type') == 'serial') {
                $connector = new FilePrintConnector($this->argument('printer'));
            } else {
                $connector = new NetworkPrintConnector($this->argument('printer'), $this->option('port'));
            }

            $printer = new Printer($connector);
        } catch (\Exception $e) {
            $this->error($e->getMessage());
            return;
        }

        try {
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->text("STRUK PARKIR\n");
            $printer->text("TOSERBA MAJU LANCAR" . "\n");
            $printer->text("Jl. Jendral Soedirman No. 555 Cirebon\n\n");

            $printer->text('Rp. ' . number_format(3000, 0, ',', '.') . ",-\n");
            $printer->text("H 3329 CQ/MOTOR/GATE-1\n\n");

            $printer->setJustification(Printer::JUSTIFY_LEFT);
            $printer->text(str_pad('WAKTU MASUK', 15, ' ') . ": 2019-10-10 08:30:21\n");
            $printer->text(str_pad('WAKTU KELUAR', 15, ' ') . ": 2019-10-10 10:23:13\n");
            $printer->text(str_pad('DURASI', 15, ' ') . ": 02:02:32\n");
            $printer->text(str_pad('PETUGAS', 15, ' ') . ": BAGAS\n\n");
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->text("TERIMAKASIH ATAS KUNJUNGAN ANDA\n");

            $printer->cut();
            $printer->close();
        } catch (\Exeption $e) {
            $this->error($e->getMessage());
            return;
        }

        $this->info('Print success!');
    }
}

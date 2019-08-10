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
    protected $signature = 'print:test {printer} {--type=network}';

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
                $connector = new NetworkPrintConnector($this->argument('printer'), 9100);
            }

            $printer = new Printer($connector);
        } catch (\Exception $e) {
            $this->error($e->getMessage());
            return;
        }

        try {
            $printer->setJustification(Printer::JUSTIFY_CENTER);
            $printer->text("STRUK PARKIR\n");
            $printer->setTextSize(2, 2);
            $printer->text("TOSERBA MAJU LANCAR" . "\n");
            $printer->setTextSize(1, 1);
            $printer->text("Jl. Jendral Soedirman No. 555 Cirebon\n\n");

            $printer->setTextSize(2, 2);
            $printer->text("H 3329 CQ\n");
            $printer->text('Rp. ' . number_format(3000, 0, ',', '.') . "-\n");

            $printer->setTextSize(1, 1);
            $printer->setJustification(Printer::JUSTIFY_LEFT);
            $printer->text(str_pad('Gate', 20, ' ') . ": GATE-IN-01/MOTOR\n");
            $printer->text(str_pad('Waktu Masuk', 20, ' ') . ": 2019-10-10 08:30:21\n");
            $printer->text(str_pad('Waktu Keluar', 20, ' ') . ": 2019-10-10 10:23:13\n");
            $printer->text(str_pad('Durasi', 20, ' ') . ": 02:02:32\n");
            $printer->text(str_pad('Petugas', 20, ' ') . ": Bagas\n\n\n");
            $printer->text("TERIMAKASIH. SELAMAT JALAN.\n");

            $printer->cut();
            $printer->close();
        } catch (\Exeption $e) {
            $this->error($e->getMessage());
            return;
        }

        $this->info('Print success!');
    }
}

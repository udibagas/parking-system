<?php

namespace App\Console\Commands;

use App\JenisKendaraan;
use Carbon\Carbon;
use Illuminate\Console\Command;

class HitungTarif extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'tarif:hitung {time_in} {time_out} {jenis_kendaraan}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cek hitung tarif';

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
        $in = new Carbon($this->argument('time_in'));
        $out = $this->argument('time_out') ? new Carbon($this->argument('time_out')) : Carbon::now();
        $durasiMenit = $out->diffInMinutes($in);
        $this->line('Durasi dalam menit = ' . $durasiMenit);
        $this->line(round($durasiMenit / 60) . ' jam ' . ($durasiMenit % 60) . ' menit');

        $jenisKendaraan = JenisKendaraan::where('nama', $this->argument('jenis_kendaraan'))->first();

        if (!$jenisKendaraan) {
            $this->error('Tarif tidak ditemukan untuk jenis kendaraan ' . $this->argument('jenis_kendaraan'));
            return;
        }

        $tarifMenitPertama = $jenisKendaraan->tarif_menit_pertama;
        $this->line('Tarif menit pertama = ' . $tarifMenitPertama);

        // tak peduli flat atau progressif berlaku seperti ini
        if ($durasiMenit <= $jenisKendaraan->menit_pertama) {
            $ret = $tarifMenitPertama;
            return;
        }

        $durasiReal = $durasiMenit - $jenisKendaraan->menit_pertama;
        $this->line('Durasi real = ' . $durasiReal);

        if ($jenisKendaraan->mode_menginap == JenisKendaraan::MODE_MENGINAP_24JAM) {
            $hariParkir = ceil($durasiMenit / (60 * 24));

            if ($hariParkir == 0 && $jenisKendaraan->mode_tarif == JenisKendaraan::MODE_TARIF_FLAT) {
                $hariParkir = 1;
            }
        }

        if ($jenisKendaraan->mode_menginap == JenisKendaraan::MODE_MENGINAP_TENGAH_MALAM) {
            $hariIn = new Carbon($in->format('Y-m-d'));
            $hariOut = new Carbon($out->format('Y-m-d'));
            $hariParkir = $hariOut->diffInDays($hariIn) + 1;
        }

        $hariMenginap = $hariParkir >= 1 ? $hariParkir - 1 : 0;
        $tarifMenginap = $hariMenginap * $jenisKendaraan->tarif_menginap;

        $this->line('Hari parkir = ' . $hariParkir);
        $this->line('Hari menginap = ' . $hariMenginap);
        $this->line('Tarif menginap = ' . $tarifMenginap);

        // tarif flat per hari, kena tarif menginap, kena tarif maximal
        if ($jenisKendaraan->mode_tarif == JenisKendaraan::MODE_TARIF_FLAT) {
            $ret = $tarifMenitPertama + ($hariParkir * $jenisKendaraan->tarif_flat) + $tarifMenginap;
        }

        if ($jenisKendaraan->mode_tarif == JenisKendaraan::MODE_TARIF_PROGRESIF) {
            $tarifMaksimum = $hariMenginap * $jenisKendaraan->tarif_maksimum;

            if ($jenisKendaraan->mode_menginap == JenisKendaraan::MODE_MENGINAP_24JAM) {
                $tarifHariTerakhir = ceil(($durasiMenit % (60 * 24)) / $jenisKendaraan->menit_selanjutnya) * $jenisKendaraan->tarif_menit_selanjutnya;

                if ($tarifHariTerakhir > $jenisKendaraan->tarif_maksimum) {
                    $tarifHariTerakhir = $jenisKendaraan->tarif_maksimum;
                }

                $this->info('Tarif hari terakhir = ' . $tarifHariTerakhir);
                $ret = $tarifMenitPertama + $tarifMaksimum + $tarifHariTerakhir + $tarifMenginap;
            }

            if ($jenisKendaraan->mode_menginap == JenisKendaraan::MODE_MENGINAP_TENGAH_MALAM) {
                if ($hariParkir > 1) {
                    $menitHariPertama = (new Carbon($in->format('Y-m-d') . ' 24:00:00'))->diffInMinutes($in) - $jenisKendaraan->menit_pertama;
                    $menitHariTerakhir = $out->diffInMinutes((new Carbon($out->format('Y-m-d') . ' 00:00:00')));
                    $tarifHariPertama = ceil($menitHariPertama / $jenisKendaraan->menit_selanjutnya) * $jenisKendaraan->tarif_menit_selanjutnya;
                    $tarifHariTerakhir = ceil($menitHariTerakhir / $jenisKendaraan->menit_selanjutnya) * $jenisKendaraan->tarif_menit_selanjutnya;

                    if ($tarifHariPertama > $jenisKendaraan->tarif_maksimum) {
                        $tarifHariPertama = $jenisKendaraan->tarif_maksimum;
                    }

                    if ($tarifHariTerakhir > $jenisKendaraan->tarif_maksimum) {
                        $tarifHariTerakhir = $jenisKendaraan->tarif_maksimum;
                    }


                    $this->info('Menit hari pertama = ' . $menitHariPertama);
                    $this->info('Menit hari terakhir = ' . $menitHariTerakhir);
                    $this->info('Tarif hari pertama = ' . $tarifHariPertama);
                    $this->info('Tarif hari terakhir = ' . $tarifHariTerakhir);
                    $ret = $tarifMenitPertama + $tarifMaksimum + $tarifHariPertama + $tarifHariTerakhir + $tarifMenginap;
                } else {
                    $tarifHariPertama = ceil($durasiReal / $jenisKendaraan->menit_selanjutnya) * $jenisKendaraan->tarif_menit_selanjutnya;

                    if ($tarifHariPertama > $jenisKendaraan->tarif_maksimum) {
                        $tarifHariPertama = $jenisKendaraan->tarif_maksimum;
                    }

                    $this->info('Tarif hari pertama = ' . $tarifHariPertama);

                    $ret = $tarifMenitPertama + $tarifHariPertama;
                }
            }
        }

        $this->info('Tarif  = ' . $ret);
    }
}

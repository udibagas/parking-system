<?php

namespace App\Console;

use App\Setting;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * The Artisan commands provided by your application.
     *
     * @var array
     */
    protected $commands = [
        //
    ];

    /**
     * Define the application's command schedule.
     *
     * @param  \Illuminate\Console\Scheduling\Schedule  $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('telescope:prune')->daily();

        try {
            $age = Setting::first()->hapus_snapshot_dalam_hari;

            if ($age > 0) {
                $schedule->command('snapshot:delete ' . $age)->dailyAt('12:00');
            }

            $age = Setting::first()->hapus_transaksi_dalam_hari;

            if ($age > 0) {
                $schedule->command('trx:delete ' . $age)->dailyAt('12:00');
            }
        } catch (\Exception $e) {
            // nothing todo
        }
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}

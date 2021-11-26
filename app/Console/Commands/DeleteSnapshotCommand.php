<?php

namespace App\Console\Commands;

use App\Models\Snapshot;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Storage;

class DeleteSnapshotCommand extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'snapshot:delete {age}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Hapus snapshot';

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
        $data = Snapshot::whereRaw('DATEDIFF(NOW(), created_at) >= :age', [
            ':age' => $this->argument('age')
        ])->get();

        foreach ($data as $d) {
            Storage::delete([$d->path]);
            $d->delete();
        }
    }
}

<?php

namespace App\Providers;

use App\Events\KendaraanKeluarEvent;
use App\Events\KendaraanMasukEvent;
use App\Listeners\KendaraanKeluarListener;
use App\Listeners\KendaraanMasukListener;
use Illuminate\Support\Facades\Event;
use Illuminate\Auth\Events\Registered;
use Illuminate\Auth\Listeners\SendEmailVerificationNotification;
use Illuminate\Foundation\Support\Providers\EventServiceProvider as ServiceProvider;

class EventServiceProvider extends ServiceProvider
{
    /**
     * The event listener mappings for the application.
     *
     * @var array
     */
    protected $listen = [
        Registered::class => [
            SendEmailVerificationNotification::class,
        ],
        KendaraanMasukEvent::class => [
            KendaraanMasukListener::class
        ],
        KendaraanKeluarEvent::class => [
            KendaraanKeluarListener::class
        ]
    ];

    /**
     * Register any events for your application.
     *
     * @return void
     */
    public function boot()
    {
        parent::boot();

        //
    }
}

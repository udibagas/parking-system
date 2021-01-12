<?php

namespace App\Events;

use App\ParkingTransaction;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class KendaraanKeluarEvent
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $parkingTransaction;

    /**
     * Create a new event instance.
     *
     * @return void
     */
    public function __construct(ParkingTransaction $parkingTransaction)
    {
        $this->parkingTransaction = $parkingTransaction;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return \Illuminate\Broadcasting\Channel|array
     */
    public function broadcastOn()
    {
        return new PrivateChannel('channel-name');
    }
}

<?php

namespace App\Notifications;

use App\Models\ParkingTransaction;
use Illuminate\Broadcasting\Channel;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;

class PrintStrukFailedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $parkingTransaction;

    public $message;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(ParkingTransaction $parkingTransaction, $error)
    {
        $this->parkingTransaction = $parkingTransaction;
        $this->message = "Gagal print tiket di {$this->parkingTransaction->gateIn->nama}. {$error}";
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['broadcast'];
    }

    public function toABroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage(['message' => $this->message]);
    }

    public function broadcastOn()
    {
        return new Channel('notification');
    }
}

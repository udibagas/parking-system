<?php

namespace App\Notifications;

use App\Models\ParkingTransaction;
use Illuminate\Broadcasting\Channel;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;

class PrintTicketFailedNotification extends Notification implements ShouldQueue
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
        $this->message = "Pengunjung di {$this->parkingTransaction->gateIn->nama} gagal print tiket. Informasikan nomor barcode kepada pengunjung. {$this->parkingTransaction->nomor_barcode}. {$error}";
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

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'message' => $this->message,
            'transaction' => $this->parkingTransaction
        ]);
    }

    public function broadcastOn()
    {
        return new Channel('notification');
    }
}

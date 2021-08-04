<?php

namespace App\Notifications;

use App\Models\ParkingTransaction;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;

class PrintTicketFailedNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $parkingTransaction;

    public $error;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(ParkingTransaction $parkingTransaction, $error)
    {
        $this->parkingTransaction = $parkingTransaction;

        $this->error = $error;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return [
            'message' => "Pengunjung di {$this->parkingTransaction->gateIn->nama} gagal print tiket. Informasikan nomor barcode kepada pengunjung. {$this->parkingTransaction->nomor_barcode}. {$this->error}",
        ];
    }
}

<?php

namespace App\Notifications;

use App\Kamera;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;

class KameraErrorNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $kamera;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Kamera $kamera)
    {
        $this->kamera = $kamera;
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
            'message' => "Kamera {$this->kamera->nama} gagal mengambil snapshot"
        ];
    }
}

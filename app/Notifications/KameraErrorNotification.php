<?php

namespace App\Notifications;

use App\Models\Kamera;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\BroadcastMessage;

class KameraErrorNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public $kamera;

    public $message;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(Kamera $kamera)
    {
        $this->kamera = $kamera;
        $this->message = "Kamera {$this->kamera->nama} gagal mengambil snapshot";
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return ['database', 'broadcast'];
    }

    /**
     * Get the array representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function toArray($notifiable)
    {
        return ['message' => $this->message];
    }

    /**
     * Get the broadcastable representation of the notification.
     *
     * @param  mixed  $notifiable
     * @return BroadcastMessage
     */
    public function toBroadcast($notifiable)
    {
        return new BroadcastMessage(['message' => $this->message]);
    }
}

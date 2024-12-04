<?php

namespace App\Notifications;

use App\Models\Kamera;
use Illuminate\Broadcasting\Channel;
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
        return ['broadcast'];
    }

    public function toBroadcast(object $notifiable): BroadcastMessage
    {
        return new BroadcastMessage([
            'message' => $this->message,
            'kamera' => $this->kamera
        ]);
    }

    public function broadcastOn()
    {
        return new Channel('notification');
    }
}

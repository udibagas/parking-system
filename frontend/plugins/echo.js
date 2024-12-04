import Echo from 'laravel-echo'
window.Pusher = require('pusher-js')

export default ({ app, $axios }, inject) => {
  inject('echo', (config) => {
    return new Echo({
      broadcaster: 'pusher',
      key: config.key,
      wsHost: config.host,
      wsPort: config.port,
      forceTLS: false,
      disableStats: true,
      authorizer: (channel, options) => {
        return {
          authorize: (socketId, callback) => {
            $axios
              .$post('/api/broadcasting/auth', {
                socket_id: socketId,
                channel_name: channel.name,
              })
              .then((response) => callback(false, response))
              .catch((error) => callback(true, error))
          },
        }
      },
    })
  })
}

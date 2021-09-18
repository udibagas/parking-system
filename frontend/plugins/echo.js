import Echo from 'laravel-echo'
window.Pusher = require('pusher-js')

export default ({ app }, inject) => {
  inject('echo', (config) => {
    return new Echo({
      broadcaster: 'pusher',
      key: config.key,
      wsHost: config.host,
      wsPort: config.port,
      forceTLS: false,
      disableStats: true,
    })
  })
}

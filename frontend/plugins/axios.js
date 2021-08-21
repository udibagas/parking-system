import { Message } from 'element-ui'

export default function ({ $axios, redirect }) {
  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code) {
      Message({
        message: error.response.data.message,
        type: 'error',
        center: true,
        showClose: true,
        duration: 5000,
      })
    }
  })
}

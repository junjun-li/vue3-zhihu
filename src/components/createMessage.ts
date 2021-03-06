import { createApp } from 'vue'
import Message from '@/components/Message.vue'

export type MessageType = 'success' | 'error' | 'default'

const createMessage = (message: string, type: MessageType, time = 2000) => {
  const messageInstance = createApp(Message, {
    message,
    type
  })
  const node = document.createElement('div')
  document.body.appendChild(node)
  messageInstance.mount(node)
  setTimeout(() => {
    messageInstance.unmount(node)
    document.body.removeChild(node)
  }, time)
}

export default createMessage

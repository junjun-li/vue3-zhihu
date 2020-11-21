<template>
  <!--
    alert-success
    alert-danger
    alert-primary
  -->
  <teleport to="#message">
    <div
      v-if="isVisible"
      class="alert-primary alert message-info fixed center mx-auto d-flex justify-content-between mt-2">
      <span>{{ message }}</span>
      <button
        aria-label="Close"
        class="btn-close"
        data-dismiss="alert"
        style="margin-left: 20px"
        type="button"
        @click="hide"></button>
    </div>
  </teleport>
</template>

<script lang="ts">
import {
  defineComponent,
  PropType,
  ref
} from 'vue'
import useDOMCreate from '@/hooks/useDOMCreate'
import { MessageType } from '@/components/createMessage'

export default defineComponent({
  name: 'Message',
  props: {
    message: String,
    type: {
      type: String as PropType<MessageType>,
      default: 'default'
    }
  },
  emits: ['close-message'],
  setup (props, context) {
    const isVisible = ref(true)
    useDOMCreate('message')
    const hide = () => {
      isVisible.value = false
      context.emit('close-message', true)
    }
    return {
      hide,
      isVisible
    }
  }

})
</script>

<style
  lang="scss"
  scoped>
.alert {
  position: fixed;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
}
</style>

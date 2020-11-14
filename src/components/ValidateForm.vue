<template>
  <form class="validate-form-container">
    <slot/>
    <div
      class="submit-area"
      @click.prevent="submitForm">
      <slot name="submit">
        <button
          class="btn btn-primary"
          type="submit">submit
        </button>
      </slot>
    </div>
  </form>
</template>

<script lang="ts">
import {
  defineComponent,
  onUnmounted
} from 'vue'
import mitt from 'mitt'

type ValidateAllFunc = () => boolean
export const emitter = mitt()
export default defineComponent({
  name: 'ValidateForm',
  emits: ['submit-form'],
  // 点击submit, 将验证结果传递到父组件
  setup (props, context) {
    let validateAllFunc: ValidateAllFunc[] = []
    const submitForm = () => {
      // 在这里循环调用 validateAllFunc 的方法
      // 并且使用 context.emit('submit-form', true) 把最后的结果返回出去
      const result = validateAllFunc.map(func => func())
      // .every(res => res)
      context.emit('submit-form', result)
    }
    // 监听器的回调函数
    const callback = (func: any) => {
      validateAllFunc.push(func)
    }
    emitter.on('form-item-created', callback)

    onUnmounted(() => {
      validateAllFunc = []
      emitter.off('form-item-created', callback)
    })

    return {
      submitForm
    }
  }
})
</script>

<style scoped>

</style>

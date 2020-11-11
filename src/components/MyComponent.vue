<template>
  <div class="my-component">
    <input :value="val"
           type="text"
           @input="updateVal">
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MyComponent',
  props: {
    modelValue: String
  },
  setup (props, context) {
    const val = ref<undefined | string>(undefined)
    const updateVal = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      val.value = targetValue
      context.emit('update:modelValue', targetValue)
    }
    return {
      val,
      updateVal
    }
  }
})
</script>

<style scoped>

</style>

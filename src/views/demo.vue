<template>
  <div class="demo">
    <!--@input="$emit('update:modelValue', $event.target.value)"-->
    <!--@input="updateInput"-->
    <!--
    <input
      :model-value="modelValue"
      type="text"
      @input="$emit('update:modelValue', $event.target.value)"
    >
    -->
    <input type="text" v-model="value">
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'

export default defineComponent({
  name: 'demo',
  props: ['modelValue'],
  setup (props, context) {
    const value = computed({
      get: () => props.modelValue,
      set: value => context.emit('update:modelValue', value)
    })
    const updateInput = (e) => {
      console.log(e)
    }
    return {
      updateInput,
      value
    }
  }
})
</script>

<style
  lang="scss"
  scoped>
.demo {
  width: calc(100vw - 50%);
  padding: 5px;
  border: 1px solid #000
}
</style>

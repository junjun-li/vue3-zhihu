<template>
  <div class="validate-input-container pb-3">
    <input
      v-bind="$attrs"
      :class="{'is-invalid': inputRef.error}"
      :value="inputRef.val"
      class="form-control"
      @blur="validateInput"
      @input="updateValue">
    <span
      v-if="inputRef.error"
      v-bind="$attrs"
      class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import {
  PropType,
  defineComponent,
  reactive,
  onMounted
} from 'vue'
import { emitter } from '@/components/ValidateForm.vue'

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

interface RuleProp {
  type?: 'email';
  required?: boolean;
  message?: string;
  max?: string | number;
  min?: string | number;
}

interface InputRef {
  val: any;
  error: boolean;
  message: undefined | string;
}

export type RulesProp = RuleProp[]

export default defineComponent({
  inheritAttrs: false,
  name: 'ValidateInput',
  props: {
    // 规定父组件传递过来的规则
    rules: Array as PropType<RulesProp>,
    // 1. 让组件支持v-model
    modelValue: String
  },
  setup (props, context) {
    const inputRef: InputRef = reactive({
      val: props.modelValue || '',
      error: false,
      message: ''
    })
    const updateValue = (e: KeyboardEvent) => {
      const targetValue = (e.target as HTMLInputElement).value
      inputRef.val = targetValue
      // 2.
      context.emit('update:modelValue', targetValue)
    }
    const validateInput = () => {
      if (props.rules) {
        const allPassed = props.rules.every(ruleItem => {
          let passed = true
          inputRef.message = ruleItem.message
          if (ruleItem.required) {
            passed = inputRef.val !== ''
          } else if (ruleItem.type === 'email') {
            passed = emailReg.test(inputRef.val)
          } else if (ruleItem.min) {
            passed = inputRef.val.length >= +ruleItem.min
          } else if (ruleItem.max) {
            passed = inputRef.val.length <= +ruleItem.max
          }
          return passed
        })
        inputRef.error = !allPassed
        return allPassed
      }
      return true
    }

    onMounted(() => {
      emitter.emit('form-item-created', validateInput)
    })
    return {
      inputRef,
      validateInput,
      updateValue
    }
  }
})
</script>

<style scoped>

</style>

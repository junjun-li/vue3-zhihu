<template>
  <div class="validate-input-container pb-3">
    <input v-bind="$attrs"
           :class="{'is-invalid': inputRef.error}"
           :value="inputRef.val"
           class="form-control"
           @blur="validateEmail"
           @input="updateValue">
    <span v-if="inputRef.error"
          class="invalid-feedback" v-bind="$attrs">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, reactive } from 'vue'

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

interface RuleProp {
  type: 'required' | 'email' | 'max' | 'min';
  message: string;
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
    const inputRef = reactive({
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
    const validateEmail = () => {
      if (props.rules) {
        const allPassed = props.rules.every(ruleItem => {
          let passed = true
          inputRef.message = ruleItem.message
          if (ruleItem.type === 'required') {
            passed = inputRef.val !== ''
          } else if (ruleItem.type === 'email') {
            passed = emailReg.test(inputRef.val)
          } else if (ruleItem.type === 'min') {
            passed = inputRef.val.length > 3
          } else if (ruleItem.type === 'max') {
            passed = inputRef.val.length < 20
          }

          return passed
        })
        inputRef.error = !allPassed
      }
    }
    return {
      inputRef,
      validateEmail,
      updateValue
    }
  }
})
</script>

<style scoped>

</style>

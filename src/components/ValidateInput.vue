<template>
  <div class="validate-input-container pb-3">
    <input v-model="inputRef.val"
           class="form-control" :class="{'is-invalid': inputRef.error}"
           @blur="validateEmali">
    <span v-if="inputRef.error"
          class="invalid-feedback">{{ inputRef.message }}</span>
  </div>
</template>

<script lang="ts">
import { PropType, defineComponent, reactive } from 'vue'

const emailReg = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/

interface RuleProp {
  type: 'required' | 'email';
  message: string;
}

export type RulesProp = RuleProp[]

export default defineComponent({
  name: 'ValidateInput',
  props: {
    // 规定父组件传递过来的规则
    rules: Array as PropType<RulesProp>
  },
  setup (props) {
    const inputRef = reactive({
      val: '',
      error: false,
      message: ''
    })
    const validateEmali = () => {
      if (props.rules) {
        const allPassed = props.rules.every(ruleItem => {
          let passed = true
          inputRef.message = ruleItem.message
          // if (ruleItem.type === 'required') {
          //   passed = inputRef.val !== ''
          // } else if (ruleItem.type === 'email') {
          //   passed = emailReg.test(inputRef.val)
          // }
          switch (ruleItem.type) {
            case 'required':
              passed = inputRef.val !== ''
              break
            case 'email':
              passed = emailReg.test(inputRef.val)
              break
            default:
              break
          }
          return passed
        })
        inputRef.error = !allPassed
      }
    }
    return {
      inputRef,
      validateEmali
    }
  }
})
</script>

<style scoped>

</style>

<template>
  <div class="validate-input-container pb-3">
    <textarea
      v-if="tag === 'textarea'"
      v-bind="$attrs"
      :class="{'is-invalid': inputRef.error}"
      class="form-control"
      @blur="validateInput"
      v-model="inputRef.val"
    />
    <!--
    @blur:这个用于校验
    @input 这个用于更新事件
    :value="inputRef.val"
    @input="updateValue"
    -->
    <input
      v-else
      v-bind="$attrs"
      :class="{'is-invalid': inputRef.error}"
      v-model="inputRef.val"
      class="form-control"
      @blur="validateInput"
    />
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
  onMounted,
  watch,
  computed
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
export type TagType = 'input' | 'textarea'

export default defineComponent({
  inheritAttrs: false,
  name: 'ValidateInput',
  props: {
    // 规定父组件传递过来的规则
    rules: Array as PropType<RulesProp>,
    // 1. 让组件支持v-model
    modelValue: String,
    tag: {
      type: String as PropType<TagType>,
      default: 'input'
    }
  },
  setup (props, context) {
    const inputRef: InputRef = reactive({
      // val: props.modelValue || '',
      // 使用computed来改写它
      val: computed({
        get: () => props.modelValue,
        set: value => context.emit('update:modelValue', value)
      }),
      error: false,
      message: ''
    })
    // watch(() => props.modelValue, (newVal, oldVal) => {
    //   console.log(newVal)
    //   console.log('watch => ')
    //   inputRef.val = newVal
    // })
    // const updateValue = (e: KeyboardEvent) => {
    //   debugger
    //   console.log('updateValue => ')
    //   const targetValue = (e.target as HTMLInputElement).value
    //   inputRef.val = targetValue
    //   // 2. 触发这个事件, 并且传参, 父组件就可以通过v-model拿到值
    //   context.emit('update:modelValue', targetValue)
    // }
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
      validateInput
    }
  }
})
</script>

<style scoped>

</style>

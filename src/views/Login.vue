<template>
  <ValidateForm @submitForm="submitForm">
    <div class="mb-3">
      <label class="form-label">邮箱地址
      </label>
      <ValidateInput
        v-model="emailVal"
        :rules="emailRules"
        placeholder="请输入邮箱"
        type="text"></ValidateInput>
    </div>
    <div class="mb-3">
      <label class="form-label">
        密码
      </label>
      <ValidateInput
        v-model="passwordVal"
        :rules="passwordRules"
        placeholder="请输入密码"
        type="password"
      />
    </div>
    <template #submit>
      <button
        class="btn btn-primary"
        type="submit">Submit
      </button>
    </template>
  </ValidateForm>
</template>

<script lang="ts">
import {
  defineComponent,
  ref
} from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import { login } from '@/api'

interface ResProps {
  code: number;
  data: {
    token: string;
  };
  msg: string;
}

export default defineComponent({
  name: 'Login',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const emailVal = ref<string>('11776174@qq.com')
    const passwordVal = ref<string>('123456')
    const router = useRouter()
    const store = useStore()
    const emailRules: RulesProp = [
      { required: true, message: '电子邮件不能为空' },
      { type: 'email', message: '请输入正确的邮箱格式' },
      { min: 3, message: '邮箱最少为3位数' },
      { max: 20, message: '邮箱最多为20位数' }
    ]
    const passwordRules: RulesProp = [
      { required: true, message: '请输入密码' },
      { min: 6, message: '密码最少为6位数' },
      { max: 20, message: '密码最多为20位数' }
    ]
    const submitForm = async (result: boolean) => {
      if (result) {
        const res: any = await login({
          email: emailVal.value,
          password: passwordVal.value
        })
        if (res.code === 0) {
          await router.push('/')
        } else {
          console.log(1)
        }
      }
    }
    return {
      emailRules,
      passwordRules,
      emailVal,
      passwordVal,
      submitForm
    }
  }
})
</script>

<style
  lang="scss"
  scoped>

</style>

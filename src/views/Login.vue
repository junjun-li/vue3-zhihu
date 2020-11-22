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
import {
  getUserInfo,
  login
} from '@/api'
import createMessage from '@/components/createMessage'

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
        login({
          email: emailVal.value,
          password: passwordVal.value
        }).then(async (res: any) => {
          if (res.code === 0) {
            localStorage.setItem('token', res.data.token)
            createMessage('登录成功', 'success')
            await router.push('/')
          }
        }).catch(e => {
          createMessage('用户名或密码错误', 'error')
        })
        // else {
        //   createMessage(res.error, 'error')
        // }
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

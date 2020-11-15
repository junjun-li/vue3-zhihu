<template>
  <div class="container">
    <GlobalHeader :user="currentUser"/>
    <router-view />
    <!--<ColumnList :list="list"/>-->
    <!--    <ValidateForm @submitForm="submitForm">-->
    <!--      <div class="mb-3">-->
    <!--        <label class="form-label">邮箱地址-->
    <!--        </label>-->
    <!--        <ValidateInput-->
    <!--          v-model="emailVal"-->
    <!--          :rules="emailRules"-->
    <!--          placeholder="请输入邮箱"-->
    <!--          type="text"></ValidateInput>-->
    <!--      </div>-->
    <!--      <div class="mb-3">-->
    <!--        <label class="form-label">-->
    <!--          密码-->
    <!--        </label>-->
    <!--        <ValidateInput-->
    <!--          v-model="passwordVal"-->
    <!--          :rules="passwordRules"-->
    <!--          placeholder="请输入密码"-->
    <!--          type="password"-->
    <!--        />-->
    <!--      </div>-->
    <!--      <template #submit>-->
    <!--        <button-->
    <!--          class="btn btn-primary"-->
    <!--          type="submit">Submit-->
    <!--        </button>-->
    <!--      </template>-->
    <!--    </ValidateForm>-->
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 知乎专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系我</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  ref
} from 'vue'
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'

const testData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 2,
    title: 'test2的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 3,
    title: 'test3的专栏',
    description: '这是的test1专栏，有一段非常有意思的简介，可以更新一下欧 这是的test1专栏，有一段非常有意思的简介，可以更新一下欧'
    // avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  },
  {
    id: 4,
    title: 'test4的专栏',
    description: '这是的test2专栏，有一段非常有意思的简介，可以更新一下欧',
    avatar: 'http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5ee22dd58b3c4520912b9470.jpg?x-oss-process=image/resize,m_pad,h_100,w_100'
  }
]
const currentUser: UserProps = {
  isLogin: false,
  name: 'ljj'
}

export default defineComponent({
  name: 'App',
  components: {
    ColumnList,
    GlobalHeader,
    ValidateInput,
    ValidateForm
  },
  setup () {
    const emailVal = ref<undefined | string>(undefined)
    const passwordVal = ref<undefined | string>(undefined)

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
    const submitForm = (result: boolean) => {
      console.log(result)
    }
    return {
      list: testData,
      currentUser,
      emailRules,
      emailVal,
      submitForm,
      passwordVal,
      passwordRules
    }
  }
})
</script>

<style lang="scss">
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}

/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, menu, nav, section {
  display: block;
}

body {
  line-height: 1;
}

ol, ul {
  list-style: none;
}

blockquote, q {
  quotes: none;
}

blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}
</style>

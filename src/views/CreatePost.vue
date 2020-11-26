<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <Uploader
      :before-upload="beforeUpload"
      :uploaded="uploadedData"
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      @on-success="onSuccess"
      @on-error="onError">
      <h2>点击上传头图</h2>
      <!--      ="dataProps"-->
      <!--
        作用域插槽
        https://cn.vuejs.org/v2/guide/components-slots.html
      -->
      <template #uploaded="slotProps">
        <img
          :src="slotProps.uploadedData.data.url"
          width="500">
      </template>
    </Uploader>
    <ValidateForm @submit-form="submitForm">
      <div class="mb-3">
        <label class="form-label">文章标题:</label>
        <ValidateInput
          v-model="titleVal"
          :rules="titleRules"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情:</label>
        <ValidateInput
          v-model="contentVal"
          :rules="contentRules"
          placeholder="请输入文章详情"
          rows="10"
          tag="textarea"
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
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted
} from 'vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
import Uploader from '@/components/Uploader.vue'
import createMessage from '@/components/createMessage'
import {
  PostProps,
  ResponseType
} from '@/store'
import { imgFormatAndSizeCheck } from '@/utils/utils'
import { useStore } from 'vuex'
import {
  getPostById,
  posts
} from '@/api'
import {
  useRouter,
  useRoute
} from 'vue-router'

export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateInput,
    ValidateForm,
    Uploader
  },
  setup () {
    const store = useStore()
    const router = useRouter()
    const route = useRoute()
    const titleVal = ref<string>('')
    const contentVal = ref<string>('')
    const imgResponse = ref<any>({})
    const uploadedData = ref()
    const titleRules = [
      { required: true, message: '文章标题不能为空' }
    ]
    const contentRules = [
      { required: true, message: '文章标题不能为空' }
    ]
    const beforeUpload = (file: File) => {
      // const isLt1M = file.size / 1024 / 1024 < 1
      // const isJPG = file.type === 'image/jpeg'
      // if (!isLt1M) {
      //   createMessage('图片必须小于1M', 'error')
      // }
      // if (!isJPG) {
      //   createMessage('图片必须是jpeg格式', 'error')
      // }
      // return isLt1M && isJPG
      const { passed, errorType } = imgFormatAndSizeCheck(file, {
        format: ['image/jpeg', 'image/png'], size: 1
      })
      if (errorType === 'format') {
        createMessage('图片必须是jpeg格式', 'error')
      } else if (errorType === 'size') {
        createMessage('图片必须小于1M', 'error')
      }
      return passed
    }

    const onSuccess = (res: ResponseType<{
      createdAt: string;
      extname: string;
      filename: string;
      url: string;
      _id: string;
    }>) => {
      imgResponse.value = res.data
    }
    const onError = (res: ResponseType) => {
      console.log(res)
    }
    const submitForm = (result: boolean) => {
      // 提交文章
      if (result) {
        const { column, _id } = store.state.user
        const newPost: PostProps = {
          title: titleVal.value,
          content: contentVal.value,
          column,
          author: _id
        }
        if (imgResponse.value._id) {
          newPost.image = imgResponse.value._id
        }
        posts(newPost).then(res => {
          createMessage('发表成功，2秒后跳转到文章', 'success', 2000)
          setTimeout(() => {
            router.push(`/column/${ res.data.column }`)
          }, 2000)
        })
      }
    }
    console.log(route.query.id)
    onMounted(() => {
      if (route.query.id) {
        getPostById(route.query.id as string).then((res) => {
          const currentPost = res.data
          if (currentPost.image) {
            uploadedData.value = { data: currentPost.image }
          }
          titleVal.value = currentPost.title
          contentVal.value = currentPost.content || ''
        })
      }
    })
    return {
      titleRules,
      contentRules,
      titleVal,
      contentVal,
      beforeUpload,
      onSuccess,
      onError,
      submitForm,
      uploadedData
    }
  }
})
</script>

<style lang="scss">
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
}

.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>

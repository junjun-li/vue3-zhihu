<template>
  <div class="container">
    <Uploader
      :before-upload="beforeUpload"
      @on-success="onSuccess"
      @on-error="onError"
    >
<!--      <h1>点击上传</h1>-->
      <template #uploaded="dataProps">
        <img :src="dataProps.uploadedData.url" width="500">
      </template>
    </Uploader>
    <global-header :user="currentUser"></global-header>
    <router-view></router-view>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <small>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2020 者也专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </small>
    </footer>
    <Loading
      v-if="isLoading"
      text="加载中..."/>
  </div>
</template>

<script lang="ts">
import { message } from 'ant-design-vue'
import {
  defineComponent,
  computed
} from 'vue'
import { useStore } from 'vuex'
import 'bootstrap/dist/css/bootstrap.min.css'
import GlobalHeader from '@/components/GlobalHeader.vue'
import Loading from '@/components/Loading.vue'
import Uploader from '@/components/Uploader.vue'
import createMessage from '@/components/createMessage'
import { ResponseType } from '@/store'

export default defineComponent({
  name: 'App',
  components: {
    GlobalHeader,
    Loading,
    Uploader
  },
  setup () {
    const store = useStore()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    // watch(isLoading, (newVal, oldVal) => {
    //   console.log(newVal)
    //   console.log(oldVal)
    // })
    // const btnClick = () => {
    //   debugger
    //   message.info('This is a normal message')
    // }
    const closeMessage = (params: any) => {
      console.log(params)
    }
    //
    const beforeUpload = (file: File) => {
      const isLt1M = file.size / 1024 / 1024 < 1
      const isJPG = file.type === 'image/jpeg'
      if (!isLt1M) {
        createMessage('图片必须小于1M', 'error')
      }
      if (!isJPG) {
        createMessage('图片必须是jpeg格式', 'error')
      }
      return isLt1M && isJPG
    }
    const onSuccess = (res: ResponseType<{
      createdAt: string;
      extname: string;
      filename: string;
      url: string;
      _id: string;
    }>) => {
      console.log(res)
    }
    const onError = (res: ResponseType) => {
      console.log(res)
    }
    return {
      currentUser,
      isLoading,
      closeMessage,
      beforeUpload,
      onSuccess,
      onError
      // btnClick
    }
  },
  methods: {
    btnClick () {
      message.info('This is a normal message')
    }
  }
})
</script>

<style>

</style>

<template>
  <div class="file-upload">
    <div
      v-bind="$attrs"
      class="file-upload-container"
      @click.prevent="triggerUpload">
      <slot
        v-if="fileStatus === 'loading'"
        name="loading">
        <button
          class="btn btn-primary"
          disabled
          type="button">
          上传中
        </button>
      </slot>
      <slot
        v-else-if="fileStatus === 'success'"
        :uploadedData="uploadedData"
        name="uploaded">
        上传成功
      </slot>
      <slot v-else>
        <button
          class="btn btn-primary"
          type="button">
          点击上传
        </button>
      </slot>
    </div>
    <input
      ref="fileInput"
      class="d-none"
      type="file"
      @change="handleFileChange"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  PropType
} from 'vue'
import { uploadFile } from '@/api'

type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type beforeUpload = (file: File) => boolean

export default defineComponent({
  inheritAttrs: false,
  name: 'Uploader',
  props: {
    beforeUpload: {
      type: Function as PropType<beforeUpload>
    }
  },
  emits: ['on-success', 'on-error'],
  setup (props, context) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const uploadedData = ref()
    const triggerUpload = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      if (currentTarget.files && currentTarget.files[0]) {
        // 上传文件之前的 函数 如果返回false, 阻止文件继续上传
        if (props.beforeUpload) {
          const result = props.beforeUpload(currentTarget.files[0])
          if (!result) {
            return
          }
        }
        fileStatus.value = 'loading'
        const formData = new FormData()
        formData.append('file', currentTarget.files[0])
        formData.append('icode', 'C2DE5B1DAC48EF5B')
        uploadFile(formData).then(res => {
          fileStatus.value = 'success'
          context.emit('on-success', res)
          uploadedData.value = res.data
        }).catch((err) => {
          context.emit('on-error', err)
          fileStatus.value = 'error'
        }).finally(() => {
          if (fileInput.value) {
            fileInput.value.value = ''
          }
        })
      }
    }
    return {
      triggerUpload,
      fileInput,
      handleFileChange,
      fileStatus,
      uploadedData
    }
  }
})
</script>

<style scoped>

</style>

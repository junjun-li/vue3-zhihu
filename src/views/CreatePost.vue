<template>
  <div class="create-post-page">
    <h4>新建文章</h4>
    <ValidateForm>
      <div class="mb-3">
        <label class="form-label">文章标题: </label>
        <ValidateInput
          v-model="titleVal"
          :rules="titleRules"
          placeholder="请输入文章标题"
          type="text"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情: </label>
        <ValidateInput
          v-model="contentVal"
          :rules="contentRules"
          placeholder="请输入文章详情"
          type="password"
          tag="textarea"
          rows="10"
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
import { defineComponent, ref } from 'vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'

export default defineComponent({
  name: 'CreatePost',
  components: {
    ValidateInput,
    ValidateForm
  },
  setup () {
    const titleVal = ref<undefined | string>(undefined)
    const contentVal = ref<undefined | string>(undefined)
    const titleRules = [
      { required: true, message: '文章标题不能为空' }
    ]
    const contentRules = [
      { required: true, message: '文章标题不能为空' }
    ]
    return {
      titleRules,
      contentRules,
      titleVal,
      contentVal
    }
  }
})
</script>

<style scoped>

</style>

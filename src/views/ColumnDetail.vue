<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      v-if="column"
      class="column-info row mb-4 border-bottom pb-4 align-items-center">
      <div class="col-3 text-center">
        <img
          v-if="column.avatar"
          :alt="column.title"
          :src="column.avatar && column.avatar.url"
          class="rounded-circle border w-100">
        <img
          v-else
          src="@/assets/logo.png"
          class="rounded-circle border w-100">
      </div>
      <div class="col-9">
        <h4>{{ column.title }}</h4>
        <p class="text-muted">{{ column.description }}</p>
      </div>
    </div>
    <post-list :list="list"></post-list>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  ref
} from 'vue'
import { useRoute } from 'vue-router'
import PostList from '@/components/PostList.vue'
import {
  getColumnsById,
  getPostsById
} from '@/api'

export default defineComponent({
  components: {
    PostList
  },
  setup () {
    const route = useRoute()
    const currentId = route.params.id as string
    const column = ref(undefined)
    const list = ref(undefined)
    const _getColumns = async () => {
      const res = await getColumnsById(currentId)
      column.value = res.data
    }
    const _getPostsById = async () => {
      const res = await getPostsById(currentId)
      list.value = res.data.list
      console.log(list.value)
    }
    onMounted(() => {
      _getColumns()
      _getPostsById()
    })
    return {
      column,
      list
    }
  }
})
</script>

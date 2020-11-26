<template>
  <div class="post-detail-page">
    <article
      v-if="currentPost"
      class="w-75 mx-auto mb-5 pb-3">
      <img
        v-if="currentImageUrl"
        :src="currentImageUrl"
        alt="currentPost.title"
        class="rounded-lg img-fluid my-4">
      <h2 class="mb-4">{{ currentPost.title }}</h2>
      <div class="user-profile-component border-top border-bottom py-3 mb-5 align-items-center row g-0">
        <div class="col">
          <user-profile
            v-if="typeof currentPost.author === 'object'"
            :user="currentPost.author"></user-profile>
        </div>
        <span class="text-muted col text-right font-italic">发表于：{{ currentPost.createdAt }}</span>
      </div>
      <div v-html="currentPost.content"></div>
      <!--:to="{name: 'create', query: { id: currentPost._id}}"-->
      <div
        class="btn-group mt-5">
        <router-link
          class="btn btn-success"
          type="button"
          :to="{path: '/create', query: {id: currentPost._id}}"
        >
          编辑
        </router-link>
        <button
          class="btn btn-danger"
          type="button">删除
        </button>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  computed,
  ref
} from 'vue'
import MarkdownIt from 'markdown-it'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import {
  GlobalDataProps,
  PostProps
} from '../store'
import { getPostById } from '@/api'

// import UserProfile from '../components/UserProfile.vue'

export interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
  fitUrl?: string;
}

export default defineComponent({
  name: 'post-detail',
  components: {
    // UserProfile
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const route = useRoute()
    const currentPost = ref()
    const currentId = route.params.id as string
    const md = new MarkdownIt()
    const _getPostById = async () => {
      console.log(currentId)
      const res = await getPostById(currentId)
      currentPost.value = res.data
    }
    onMounted(() => {
      _getPostById()
    })
    // const currentHTML = computed(() => {
    //   // if (currentPost.value && currentPost.value.content) {
    //   //   return md.render(currentPost.value.content)
    //   // }
    //   return md.render('# 你好 ' +
    //     '## markdown-it rulezz!')
    // })
    const currentImageUrl = computed(() => {
      if (currentPost.value && currentPost.value.image) {
        const { image } = currentPost.value
        return (image as ImageProps).url + '?x-oss-process=image/resize,w_850'
      } else {
        return null
      }
    })
    return {
      currentPost,
      currentImageUrl
      // currentHTML
    }
  }
})
</script>

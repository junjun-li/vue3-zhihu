<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <a
      class="navbar-brand"
      href="#">知乎专栏
    </a>
    <ul
      v-if="!user.isLogin"
      class="list-inline mb-0">
      <li class="list-inline-item">
        <a
          class="btn btn-outline-light my-2"
          @click.prevent="goToLogin">登陆
        </a>
      </li>
      <li class="list-inline-item">
        <router-link
          class="btn btn-outline-light my-2"
          to="/login">注册
        </router-link>
      </li>
    </ul>
    <ul
      v-else
      class="list-inline mb-0">
      <li class="list-inline-item">
        <Dropdown title="你好, 111junjun">
          <template #dropdown>
            <DropdownItem>
              <router-link
                class="dropdown-item"
                to="/create">
                新建文章
              </router-link>
            </DropdownItem>
            <DropdownItem disabled>
              <a
                class="dropdown-item"
                href="#">
                编辑资料
              </a>
            </DropdownItem>
          </template>
        </Dropdown>
      </li>
    </ul>
  </nav>
</template>

<script lang="ts">
import {
  defineComponent,
  computed
} from 'vue'
import Dropdown from '@/components/Dropdown.vue'
import DropdownItem from '@/components/DropdownItem.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store'

export interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
}

export default defineComponent({
  name: 'GlobalHeader',
  // props: {
  //   user: {
  //     type: Object as PropType<UserProps>,
  //     required: true
  //   }
  // },
  components: {
    Dropdown,
    DropdownItem
  },
  setup () {
    const router = useRouter()
    const store = useStore<GlobalDataProps>()
    const goToLogin = () => {
      router.push('login')
    }
    const user = computed(() => store.state.user)
    return {
      goToLogin,
      user
    }
  }
})
</script>

<style scoped>

</style>

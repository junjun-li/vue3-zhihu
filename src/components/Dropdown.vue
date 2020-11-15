<template>
  <div
    ref="dropdownRef"
    class="dropdown">
    <!--    <slot @click.prevent="toggleOpen" />-->
    <a
      class="btn btn-outline-light my-2 dropdown-toggle"
      href="#"
      @click.prevent="toggleOpen">
      {{ title }}
    </a>
    <ul
      v-if="isOpen"
      :style="{display: 'block'}"
      aria-labelledby="dropdownMenuButton"
      class="dropdown-menu">
      <slot name="dropdown"></slot>
    </ul>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  watch
} from 'vue'
import useClickOutside from '@/hooks/useClickOutside'

export default defineComponent({
  name: 'Dropdown',
  props: {
    title: String
  },
  setup () {
    const isOpen = ref(false)
    const dropdownRef = ref<null | HTMLElement>(null)
    const toggleOpen = () => {
      isOpen.value = !isOpen.value
    }
    const isClickOutside = useClickOutside(dropdownRef)
    // 还有一个问题, 就是hooks这个函数只触发一次, debugger打不进去
    watch(isClickOutside, (newVal) => {
      if (isOpen.value && isClickOutside.value) {
        isOpen.value = false
      }
    })
    // const handler = (e: MouseEvent) => {
    //   if (dropdownRef.value) {
    //     if (!dropdownRef.value.contains(e.target as HTMLElement) && isOpen.value) {
    //       isOpen.value = false
    //     }
    //   }
    // }
    // onMounted(() => {
    //   // 这里有一个问题 为什么这里可以获取到dom节点
    //   document.addEventListener('click', handler)
    // })
    // onUnmounted(() => {
    //   document.removeEventListener('click', handler)
    // })

    return {
      isOpen,
      toggleOpen,
      dropdownRef
    }
  }
})
</script>

<style
  lang="scss"
  scoped>

</style>

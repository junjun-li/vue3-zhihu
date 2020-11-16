<template>
  <div class="row">
    <div
      v-for="column in columnList"
      :key="column._id"
      class="col-4 mb-4">
      <div class="card h-100 shadow-sm">
        <div class="card-body text-center">
          <img
            :alt="column.title"
            :src="column.avatar && column.avatar.url"
            class="rounded-circle border border-light my-3">
          <h5 class="card-title">{{ column.title }}</h5>
          <p class="card-text text-left">{{ column.description }}</p>
          <router-link
            :to="`/column/${column._id}`"
            class="btn btn-outline-primary">进入专栏
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import {
  defineComponent,
  PropType,
  computed,
  onMounted,
  ref
} from 'vue'
import { ColumnProps } from '@/store'
import { getColumns } from '@/api'
//
// interface IColumnList {
//   author?: string;
//   // avatar?: {_id: "5f3e41a8b7d9c60b68cdd1ec", url: "http://vue-maker.oss-cn-hangzhou.aliyuncs.com/vue-marker/5f3e41a8b7d9c60b68cdd1ec.jpg"}
//   createdAt?: string;
//   description?: string;
//   featured?: boolean;
//   key?: number;
//   title?: string;
//   _id?: string;
// }

export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = ref(undefined)
    const _getColumns = async () => {
      const res = await getColumns()
      columnList.value = res.data.list.map((item: any) => {
        if (!item.avatar) {
          item.avatar = {
            url: require('@/assets/column.jpg')
          }
        } else {
          item.avatar.url = item.avatar.url + '?x-oss-process=image/resize,m_pad,h_50,w_50'
        }
        return item
      })
    }
    onMounted(() => {
      _getColumns()
    })
    return {
      columnList
    }
  }
})
</script>
<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>

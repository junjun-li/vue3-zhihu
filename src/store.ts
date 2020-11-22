/*eslint-disable*/
import {
  createStore,
  Commit
} from 'vuex'
import {
  getColumns,
  getPostsById
} from '@/api'

export interface ResponseType<T = {}> {
  code: number;
  message: string;
  data: T;
}

interface UserProps {
  isLogin: boolean;
  nickName?: string;
  _id?: string;
  column?: string;
  email?: string;
}

interface ImageProps {
  _id?: string;
  url?: string;
  createdAt?: string;
}

export interface ColumnProps {
  _id: string;
  title: string;
  avatar?: ImageProps;
  description: string;
}

export interface PostProps {
  _id: string;
  title: string;
  excerpt?: string;
  content?: string;
  image?: ImageProps;
  createdAt: string;
  column: string;
}

export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
  loading: boolean;
}

const store = createStore<GlobalDataProps>({
  state: {
    columns: [],
    posts: [],
    user: {
      isLogin: false,
      column: '',
      email: '',
      nickName: '',
      _id: ''
    },
    loading: false
  },
  mutations: {
    setUser (state, userInfo) {
      state.user = userInfo
    },
    setLoading (state, loadingState) {
      state.loading = loadingState
    }
  },
  actions: {},
  getters: {}
})

export default store

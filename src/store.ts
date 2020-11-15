import { createStore } from 'vuex'

interface UserProps {
  isLogin: boolean;
  id?: string;
  name?: string;
}

export interface GlobalDataProps {
  user: UserProps;
}

const store = createStore<GlobalDataProps>({
  state: {
    user: {
      isLogin: false
    }
  },
  mutations: {
    setUser (state, payload) {
      state.user = payload
    }
  },
  getters: {
    isLogin: (state) => state.user.isLogin
  }
})

export default store

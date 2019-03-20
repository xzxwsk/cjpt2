import Vue from 'vue'
import vuex from 'vuex'
import mutations from './mutations'

Vue.use(vuex)

const store = new vuex.Store({
    state: {
    },
    mutations: mutations
})

export default store

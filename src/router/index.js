import Vue from 'vue'
import Router from 'vue-router'
// import main from '@/components/main'
import index from '@/components/index'
import reg from '@/components/views/regist'
import comm from '@/components/views/comm'

Vue.use(Router)

export default new Router({
    // mode: 'history',
    // base: '/',
    routes: [
        {
            path: '/',
            component: index
        },
        {
            path: '/recommend/:role/:memberRecommendCode',
            name: 'recommend',
            component: reg
        },
        {
            path: '/comm',
            component: comm
        }
    ]
})

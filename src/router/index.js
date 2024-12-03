import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import ProblemSet from '@/views/ProblemSet/index.vue'
import ProblemList from '@/views/ProblemList/index.vue'
import Discussion from '@/views/Discussion/index.vue'
import Problem from '@/views/Problem/index.vue'
import NotFound from '@/views/General/NotFound.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home
        },
        {
          path: '/problemset',
          component: ProblemSet
        },
        {
          path: '/problemlist',
          component: ProblemList
        },
        {
          path: '/discussion',
          component: Discussion
        }
      ]
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/problem/:id',
      component: Problem,
    },
    {
      path: '/:patchMatch(.*)*',
      component: NotFound
    }
  ],
})

export default router

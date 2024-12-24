import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import ProblemSet from '@/views/ProblemSet/index.vue'
import ProblemList from '@/views/ProblemList/index.vue'
import Discussion from '@/views/Discussion/index.vue'
import Problem from '@/views/Problem/index.vue'
import NotFound from '@/views/General/NotFound.vue'
import Description from '@/views/Problem/components/description.vue'
import Submissions from '@/views/Problem/components/submissions.vue'
import Solutions from '@/views/Problem/components/solutions.vue'
import Detail from '@/views/Discussion/detail.vue'
import User from '@/views/User/index.vue'
import CreateSolution from '@/views/Solution/createSolution.vue'
import ProblemlistDetail from '@/views/ProblemList/problemlistDetail.vue'


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
          component: Discussion,

        },
      ]
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/problem/:id',
      component: Problem,
      children: [
        // {
        //   path: '/problem/:id/',
        //   component: Description
        // },
        {
          path: '/problem/:id/description',
          component: Description,
        },
        {
          path: '/problem/:id/submissions',
          component: Submissions,
        },
        {
          path: '/problem/:id/solutions',
          component: Solutions,
        }
      ]
    },
    {
      path: '/problemlist/:id',
      component: ProblemlistDetail
    },
    {
      path: '/user/:id',
      component: User,
    },
    {
      path: '/solution/create',
      component: CreateSolution
    },
    {
      path: '/discussion/:id',
      component: Detail,
    },
    {
      path: '/:patchMatch(.*)*',
      component: NotFound
    },
  ],
})

export default router

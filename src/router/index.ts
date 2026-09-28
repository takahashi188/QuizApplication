import Hello from '@/Hello.vue'
import InputForm from '@/InputForm.vue'
import QuizHome from '@/quiz/QuizHome.vue'
import QuizProblem from '@/quiz/QuizProblem.vue'
import QuizResult from '@/quiz/QuizResult.vue'
import TodoList from '@/tasks/TodoList.vue'
import type { Component } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'

type Route = {
  path: string,
  name: string,
  component: Component,
  meta?: {

  }
}

const routes: Route[] = [
  {
    path: "/",
    name: "Home",
    component: QuizHome
  },
  {
    path: "/quiz",
    name: "Quiz",
    component: QuizProblem
  },
  {
    path: "/quiz/result",
    name: "Result",
    component: QuizResult
  },
  {
    path: "/zip",
    name: "Zip",
    component: InputForm
  },
  {
    path: "/todo",
    name: "Todo",
    component: TodoList
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

export default router

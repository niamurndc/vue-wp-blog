import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/components/Home.vue'
import Post from '@/components/Post.vue'
import Category from '@/components/Category.vue'
import Author from '@/components/Author.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/post/:post_id',
    name: 'Post',
    component: Post
  },
  {
    path: '/category/:cat_id',
    name: 'Category',
    component: Category
  },
  {
    path: '/author/:auth_id',
    name: 'Author',
    component: Author
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

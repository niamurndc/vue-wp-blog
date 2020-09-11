<template>
  <div class="hello">
    <h2>Category</h2>
      <div class="row">
        <div class="col-md-3" v-for="post in posts" v-bind:key="post.id">
          <PostItem v-bind:post="post" />
        </div><br>
      </div>
      <div class="text-center">
        <button v-on:click="loadMore" class="btn btn-success mb-5">Load More</button>
      </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import PostItem from './PostItem'

Vue.use(VueAxios, axios)
export default {
  name: 'Category',
  components: {
    PostItem
  },

  data(){
    return{
      posts: [],
      page: 2,
      query: '',
      url: 'http://localhost/wordpress/',
      catId: this.$route.params.cat_id
    }
  },

  methods: {
    loadMore(){
      console.log(this.page)
      Vue.axios.get(`${this.url}wp-json/wp/v2/posts/?categories=${this.catId}&per_page=4&page=${this.page}`)
      .then(res => {
        const more = res.data
        more.forEach(post => {
          this.posts = [...this.posts, post]
        })
      })
      .catch(err => console.log(err))
      this.page = this.page + 1
      
    }
  },

  created(){
    console.log(this.catId)
    Vue.axios.get(`${this.url}wp-json/wp/v2/posts?categories=${this.catId}&per_page=4&page=1`)
      .then(res => {
        this.posts = res.data
      })
      .catch(err => console.log(err)) 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>

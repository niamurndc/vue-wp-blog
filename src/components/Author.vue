<template>
  <div class="hello">
    <div class="row mb-3 p-3 bg-primary text-light">
      <img :src="user.avatar_urls['96']" class="img-rounded">
      <h2 class="header-title mt-4 ml-2">{{user.name}}</h2>
    </div>
    
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
  name: 'Author',
  components: {
    PostItem
  },

  data(){
    return{
      posts: [],
      page: 2,
      query: '',
      url: 'http://localhost/wordpress/',
      catId: this.$route.params.auth_id,
      user: {}
    }
  },

  methods: {
    loadMore(){
      console.log(this.page)
      Vue.axios.get(`${this.url}wp-json/wp/v2/posts/?author=${this.catId}&per_page=4&page=${this.page}`)
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
    Vue.axios.get(`${this.url}wp-json/wp/v2/posts?author=${this.catId}&per_page=4&page=1`)
      .then(res => {
        this.posts = res.data
      })
      .catch(err => console.log(err)) 

    Vue.axios.get(`${this.url}wp-json/wp/v2/users/${this.catId}`)
      .then(res => {
        this.user = res.data
      })
      .catch(err => console.log(err)) 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.img-rounded{
  border-radius: 50%;
}

.header-title{
  text-transform: uppercase;
  
}
</style>

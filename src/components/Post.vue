<template>
  <div>
    <div class="row">
      <div class="col-md-5">
        <h1>{{post.title.rendered}}</h1>
        <router-link :to="{name: 'Author', params: {auth_id: post.author}}"><h5>{{this.author}}</h5></router-link>
        <p>{{ formatDate(post.date)}}</p>
      </div>
      <div class="col-md-7">
        <img :src="cover" class="cover-image">
      </div>
    </div>
    <div class="row mb-4">
      <div class="col-md-12" v-html="post.content.rendered"></div>
    </div>
    <div class="bg-primary p-2 mb-4">
      <h2 class="text-light">Post Suggested For Reading..</h2>
      <div class="row">
        <div class="col-md-3" v-for="post in posts" :key="post.id">
          <PostItem v-bind:post="post" />
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Moment from 'moment'
import PostItem from './PostItem'

Vue.use(VueAxios, axios)
export default {
  name: 'Post',
  components: {
    PostItem
  },
  data(){
    return{
      postId: this.$route.params.post_id,
      post: {},
      posts: [],
      author: '',
      cover: '',
      url: 'http://localhost/wordpress/'
    }
  },

  methods: {
    formatDate(data){
      return Moment(data).format('ll')
    }
  },

  created(){
    Vue.axios.get(this.url+'wp-json/wp/v2/posts/'+this.postId)
      .then(res => {
        console.log(res.data)
        this.post = res.data
        Vue.axios.get(this.url+'wp-json/wp/v2/users/'+res.data.author)
          .then(auth => {
            this.author = auth.data.name
          })
        
        Vue.axios.get(this.url+'wp-json/wp/v2/media/'+res.data.featured_media)
          .then(media => {
            this.cover = media.data.source_url
          })
        
        Vue.axios.get(`${this.url}wp-json/wp/v2/posts?categories=${res.data.categories[0]}&per_page=5&page=1`)
          .then(cat => {
            console.log(cat.data)
            this.posts = cat.data
            this.posts = this.posts.filter(data => data.id != this.post.id)
          })
      })
      .catch(err => console.log(err)) 

     
    
  }
}
</script>

<style scoped>
.cover-image{
  height: 400px;
  width: 100%;
}
</style>
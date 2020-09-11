<template>
  <div class="card mb-2">
    <img :src="cover" class="card-img-top cover-image" alt="ffsdaf">
    <div class="card-body">
      <span>{{ formatDate(post.date)}}</span>
      <h5 class="card-title">{{post.title.rendered}}</h5>
      <router-link class="btn btn-primary btn-sm" :to="{name: 'Post', params: {post_id: post.id}}">View More</router-link>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Moment from 'moment'

Vue.use(VueAxios, axios)
export default {
  name: 'PostItem',
  props: ['post'],

  data(){
    return{
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
    Vue.axios.get(this.url+'wp-json/wp/v2/users/'+this.post.author)
      .then(res => {
        this.author = res.data.name
      })
    
    Vue.axios.get(this.url+'wp-json/wp/v2/media/'+this.post.featured_media)
      .then(res => {
        this.cover = res.data.source_url
      })
 
  }
 }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.cover-image{
  height: 170px;
}

.card-body{
  padding: 10px;
}
</style>

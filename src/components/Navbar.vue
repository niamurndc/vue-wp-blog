<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="#">CD Blog</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample07" aria-controls="navbarsExample07" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarsExample07">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item active">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/">Popular</router-link>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="dropdown07" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Category</a>
              <div class="dropdown-menu" aria-labelledby="dropdown07">
                <router-link v-for="cat in cats" :key="cat.id" class="dropdown-item" :to="{name: 'Category', params: {cat_id: cat.id}}">{{cat.name}}</router-link>
              </div>
            </li>
          </ul>
          <form class="form-inline my-2 my-md-0">
            
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.use(VueAxios, axios)
export default {
  name: 'Navbar',
  data(){
    return{
      cats: [],
      query: '',
      url: 'http://localhost/wordpress/'
    }
  },
  created(){
    Vue.axios.get(this.url+'wp-json/wp/v2/categories')
      .then(res => {
        this.cats = res.data
      })
  },

  methods: {
    
    
  }

}
</script>

<style>

</style>

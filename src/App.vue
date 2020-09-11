<template>
  <div>
    <Navbar />
    <div class="container">
      <router-view/>
    </div>
    
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'

export default {
  name: 'App',
  components: {
    Navbar
  },
  data(){
    return{
      keyword: ''
    }
  }
}
</script>

<style>
*{
  margin: 0;
  padding: 0;
}
</style>

<template>
  <div id="app">
    <div class="home-btn">
      <Toolbar/>
      <!-- <router-link to="/">Home</router-link> -->
      <!-- </Toolbar> -->
      <!-- <router-link to="/">Home</router-link> -->
    </div>
    <router-view/>
    <Footer/>
  </div>
</template>

<script>
import Toolbar from './components/Toolbar'
import Footer from './components/Footer'

export default {
  name: 'App',
  components: {
    Toolbar,
    Footer
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 20px; */
}

.home-btn{
  padding: 10px;
  display:-webkit-box;
}
</style>

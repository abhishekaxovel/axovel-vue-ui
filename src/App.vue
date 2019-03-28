<template>
  <div id="app">
    <!-- <div class="home-btn">
      <Toolbar/>
    </div> -->
    <router-view/>
    <!-- <Footer/> -->
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
  },
mounted() {
        process.env.ROOT_API
},
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 40px;
}

.home-btn{
  padding: 10px;
  display:-webkit-box;
}
</style>

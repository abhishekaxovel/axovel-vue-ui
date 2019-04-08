<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>

export default {
  
  name: 'App',

  components: {
   
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

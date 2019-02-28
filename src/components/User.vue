<template>
    <div class="user">
      <!-- <h1>{{msg}}</h1> -->
      <h2>User Page</h2>
      <div class="details">
        <!-- <div v-if="user">
          <div :v-for="user.email">{{email}}</div>
        </div> -->
        <p>{{email}}</p>
      </div>
    </div>
</template>

<script>
import axios from 'axios'
import HelloWorld from './HelloWorld'

export default {
name: 'user',
components: {
  HelloWorld
},
data () {
    return {
      // user: [],
      email: ''
    }
  },
  created(){

   axios.get(`http://localhost:3700/users/users`)
    .then(res => {
      this.user = res.data;
      this.email = res.data[1].email;
    //  console.log('res here...', res.data);
     console.log('users here...', this.user);
    })
    .catch(e => {
      console.log('err here...',e);
    })

  },
  methods: {
    onGoClick(){
      console.log('hello....');
    }
  }
}
</script>

<style>
.details{
  margin: 7px;
  padding: 10px;
  font-family: 'Courier New', Courier, monospace;
}
</style>

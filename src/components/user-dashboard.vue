<template>
<div>
  <!-- <P>{{email}}</P> -->
    <h3>User Page</h3>
    <div>{{user}}</div>
     <div class="logout">
         <button type="button" class="btn btn-primary" @click="logOut">LogOut</button>
     </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  props: {
    email: ''
  },
  data(){
    return{
      user: ''
    }
  },
    methods: {
    logOut(){
        console.log('in log out func...');
        // this.$session.destroy();
        this.$router.push('/');
    }

  }

}
</script>

<style>
.logout{
   text-align: -webkit-right;
    margin: 10px; 
}

</style>

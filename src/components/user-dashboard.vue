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

 beforeCreate(){
    console.log('local storage... ', localStorage.getItem('jwt'));
    if(localStorage.getItem('jwt') != null){
      this.$router.push('/user-dash')
    }else{
      this.$router.push('/')
    }
  },


    methods: {
    logOut(){
        console.log('in log out func...');
        localStorage.removeItem('jwt');
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

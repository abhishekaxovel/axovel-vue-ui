<template>
<div>
  <!-- <P>{{email}}</P> -->
    <h3>Admin Page</h3>
    <div class="details">
         <div>{{admin}}</div>
     </div>
     <div class="logout">
         <button type="button" class="btn btn-primary" @click="logOut">LogOut</button>
     </div>
</div>
</template>

<script>
import axios from 'axios'

export default {

  prop: {
    email: ''
  },
 
  data(){
    return{
      admin: ''
    }
  },
  created(){
      // console.log(this.user)
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
.details{
   text-align: -webkit-left;
   margin: 10px; 
}

.logout{
   text-align: -webkit-right;
    margin: 10px; 
}

</style>

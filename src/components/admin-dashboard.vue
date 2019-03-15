<template>
<div>
    <h3>Admin Page</h3>
    <div class="details">
         <!-- <p>{{email}}</p> -->
     </div>
     <div class="logout">
         <button type="button" class="btn btn-primary" @click="logOut">LogOut</button>
     </div>
</div>
</template>

<script>
import axios from 'axios'
import LogIn from './LogIn'

export default {
  // props: ['details'],
  data(){
    return{
      details: null
    }
  },
  created(){
  // LogIn.$on('Selected', (details) => {
  //  this.details = details;
  // });
  },
    methods: {
    logOut(){
        console.log('in log out func...');
        // this.$session.destroy();
        // this.$router.push('/');
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

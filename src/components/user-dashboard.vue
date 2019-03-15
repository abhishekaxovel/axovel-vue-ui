<template>
<div>
    <h3>User Page</h3>
     <div class="logout">
         <button type="button" class="btn btn-primary" @click="logOut">LogOut</button>
     </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
      methods: {

    logOut(){
        console.log('in log out func...');
        axios.get(`http://localhost:5400/users/logout`)
        .then(res => {
        console.log('res....', res);
        })
        .catch(e => {
        console.log('err here...',e);
        })
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

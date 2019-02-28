<template>
<div> <h2> Home Page </h2> 

<div class="logIn">
    <router-link class="btn btn-primary" to="./logIn">Log In</router-link>
</div> <hr>

<div>
      <router-link to="/admin">Admin</router-link>
      <hr>
      <router-link to="/user">User</router-link>
      <hr>
      <!-- <router-link to="/hello">HelloWorld</router-link> -->
</div>

</div>
</template>

<script>
export default {

}
</script>

<style>
.logIn{
    text-align: end;
    margin: 5px;
}

</style>

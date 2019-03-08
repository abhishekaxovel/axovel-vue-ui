<template>
        <div> 
                <Toolbar></Toolbar>
            <h2 style="font-family: monospace;"> Home Page </h2> 

        <div class="logIn">
            <router-link class="btn btn-primary" to="./logIn">Log In</router-link>
            <router-link class="btn btn-danger" to="./login-page">Log In</router-link>
        </div> <hr>

        <div>
            <router-link to="/admin">Admin</router-link>
            <hr>
            <router-link to="/user">User</router-link>
            <hr>
        </div>
                <Footer></Footer>
        </div>
</template>

<script>
import Toolbar from './Toolbar'
import Footer from './Footer'

export default {

components: {
    Toolbar,Footer
},

}
</script>

<style>
.logIn{
    text-align: end;
    margin: 5px;
}

</style>

<template>
<div class="container">
  <form id="logInForm">

    <div class="row">
      <div class="col-25">
        <label for="email">Email</label>
      </div>
      <div class="col-75">
        <input type="email" id="email" name="email" placeholder="enter your email here"
        class="form-control" :class="{ 'is-invalid': submitted && !email }">
        <div v-show="submitted && !email" class="invalid-feedback">Email is required</div>
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="password">Password</label>
      </div>
      <div class="col-75">
        <input type="password" id="password" name="password" placeholder="enter your password here"
        class="form-control" :class="{ 'is-invalid': submitted && !password }">
        <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
      </div>
    </div>

    <div class="pull-right">
      <button type="button" class="btn btn-success" @click="LogInForm">Log In</button>
    </div>

  </form>

                
                      <!-- <div style="display: -webkit-box;">
                          <router-link to="/forgot-password">Forgot password</router-link>
                      </div> -->

                      <div>
                        <router-link style="margin: 10px" to="/forgot-password">Forgot password</router-link>
                        New user <router-link style="margin: 3px" to="/admin">Register here</router-link>
                      </div>
                  

</div>
</template>

<script>
import axios from 'axios';
import router from '../router/index.js'
// import VueJwtDecode from 'vue-jwt-decode'
import jwt_decode from 'jwt-decode'

export default {

data () {
        return {
            email: '',
            password: '',
            submitted: false
        }
    },
    
      computed: {
          loggingIn () {
              return this.$store.state.authentication.status.loggingIn;
          }
      },
    
 created(){
   console.log('in created....');
  //  this.$store.dispatch('authentication/logout');
 },

methods:{
    LogInForm(){
        console.log('in log in function....');
        this.submitted = false;
        let logIn = new FormData()
        logIn.email = email.value
        logIn.password = password.value

        axios({
        method: 'post',
        url: 'http://localhost:3100/users/logIn',
        data: {logIn},
        config: { 
        headers: {'Content-Type': 'application/json'}
        }
    })
      .then(function (response) {
        var decoded = jwt_decode(response.data.token);
        console.log('decode....',decoded);
        localStorage.setItem('jwt', response.data.token);
        console.log('user res here...',response.data.token);
        
            if(decoded.data == true && decoded.role == 'admin'){
                console.log('admin page');
                router.replace('/admin-dash');
            }
            else if(decoded.data == true && decoded.role == 'user'){
                console.log('user page');  
                router.replace('/user-dash');
            }
            else{
              console.log('user not found');
            }
      })
            .catch(function (response) {
                console.log('err here',response);
            });
            // this.$router.push('/admin-dash');
      }
      
  }
}
</script>

<style>
input[type=text], select, textarea, input{
  width: 70%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

.row:after {
  content: "";
  display: table;
  clear: both;
}

@media screen and (max-width: 600px) {
  .col-25, .col-75, input[type=submit] {
    width: 100%;
    margin-top: 0;
  }
}
</style>
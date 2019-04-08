<template>
<div class="container">

          <b-alert v-model="showDismissibleAlert" variant="danger" dismissible>
            Email or password not correct !!!
          </b-alert>

  <b-card>
  <form id="logInForm">

    <div class="row">
      <div class="col-25">
        <label for="email">Email</label>
      </div>
      <div class="col-75">
        <input type="email" v-model="email" name="email" placeholder="enter your email here"
        class="form-control" :class="{ 'is-invalid': submitted && !email }" autofocus>
        <div v-show="submitted && !email" class="invalid-feedback">Email is required</div>
      </div>
      <!-- <div class="col-75">
        <input type="email" v-model="email" name="email" placeholder="Your email address.." @keyup="checkForm" autofocus>
          <div v-for="error in errors" :key="error" autofocus>{{error}}</div>
      </div> -->
    </div>

    <div class="row">
      <div class="col-25">
        <label for="password">Password</label>
      </div>
      <div class="col-75">
        <input type="password" v-model="password" name="password" placeholder="enter your password here"
        class="form-control" :class="{ 'is-invalid': submitted && !password }">
        <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
      </div>
      <!-- <div class="col-75">
        <input type="password" v-model="password" name="password" placeholder="Your password here..">
          <div v-for="field in fields" :key="field">{{field}}</div>
      </div> -->
    </div>

    <div class="pull-right">
      <button type="button" class="btn btn-primary" @click="LogInForm">Log In</button>
    </div>

  </form>

                      <div>
                        <router-link style="margin: 10px" to="/forgot-password">Forgot password</router-link>
                        New user ? <router-link style="margin: 3px" to="/admin">Register here</router-link>
                      </div>

  </b-card>      
</div>
</template>

<script>
import axios from 'axios';
import router from '../router/index.js'
import jwt_decode from 'jwt-decode'
import adminDashboardVue from './admin-dashboard'
import userDashboardVue from './user-dashboard'

export default {

data () {
        return {
            submitted: false,
            email: '',
            password: '',
            showDismissibleAlert: false
        }
    },

beforeCreate() {
    console.log('session exists => ', localStorage.getItem('jwt'));
    if(localStorage.getItem('jwt')){
        this.$router.push('/admin-dash')
    }else{
      this.$router.push('/')
    }
},

components: {
      userDashboardVue,
      adminDashboardVue
  },

methods:{

    LogInForm(){
        console.log('in log in function....');
        this.submitted = true
        // this.showDismissibleAlert = true
        if(this.email && this.password){
        let logIn = new FormData()
        logIn.email = this.email
        logIn.password = this.password
        axios({
        method: 'post',
        url: 'http://localhost:3200/users/logIn',
        data: {logIn},
        config: { 
        headers: {'Content-Type': 'application/json'}
        }
        })
          .then(function (response) {
            var decoded = jwt_decode(response.data.token);
            console.log('decode....',decoded);
            var details = decoded.user;
            var userEmail = decoded.user.email;
            console.log('user mail...', userEmail);
            console.log('user details...',details);
            localStorage.setItem('jwt', response.data.token);
            localStorage.getItem('jwt');
            console.log('user res here...',response.data.token);
            if(decoded.data == true && decoded.role == 'admin'){
                console.log('admin page');
                router.replace('/admin-dash');
            }
            else if(decoded.data == true && decoded.role == 'user'){
                console.log('user page');  
                router.replace('/user-dash');
            }else if(this.email != data.email){
              alert('user not found');
              console.log('user not found');
            }
            })
            .catch(function (err) {
                alert('email or password not correct !!!');
                console.log('err here',err);
            });
        }

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
  width: 700px;
  padding: 20px;
}

.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

.col-75 {
  float: left;
  width: 60%;
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
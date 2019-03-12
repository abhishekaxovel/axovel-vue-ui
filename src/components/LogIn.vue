<template>
<div class="container">
  <form id="logInForm">
    <div class="row">
      <div class="col-25">
        <label for="email">Email</label>
      </div>
      <div class="col-75">
        <input type="email" id="email" name="email" placeholder="enter your email here" required>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="password">Password</label>
      </div>
      <div class="col-75">
        <input type="password" id="password" name="password" placeholder="enter your password here" required>
      </div>
    </div>

    <div class="pull-right">
      <button type="button" class="btn btn-success" @click="LogInForm">Log In</button>
    </div>
  </form>
</div>
</template>

<script>
import axios from 'axios';

export default {
methods:{
    LogInForm(){
        console.log('log in working');
        let logIn = new FormData()
        logIn.email = email.value
        logIn.password = password.value
        console.log('log-in data', logIn);

    axios({
    method: 'post',
    url: 'http://localhost:4100/users/logIn',
    data: {logIn},
    config: { 
      headers: {'Content-Type': 'application/json'}
      }
    })
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (response) {
        console.log('err here',response);
    });
        // this.$router.push({ path : '/user' });
    },

      //   validateForm() {
      
      //    if( document.logInForm.email.value == "" ) {
      //       alert( "Please provide your email!" );
      //       document.logInForm.email.focus() ;
      //       return false;
      //    }
      //    if( document.logInForm.password.value == "" ) {
      //       alert( "Please provide your password!" );
      //       document.logInForm.password.focus() ;
      //       return false;
      //    }
      //    return( true );
      // }
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
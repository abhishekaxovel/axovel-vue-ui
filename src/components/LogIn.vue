<template>
<div class="container">
  <form id="logInForm" onsubmit="return validateForm()">
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
    url: 'http://localhost:3400/users/logIn',
    data: {logIn},
    config: { 
      headers: {'Content-Type': 'application/json'}
      }
    })
    .then(function (response) {
        console.log('res here',response);
    })
    .catch(function (response) {
        console.log('err here',response);
    });
        // this.$router.push({ path : '/user' });
    },

        validateForm() {
      
         if( document.logInForm.email.value == "" ) {
            alert( "Please provide your email!" );
            document.myForm.Name.focus() ;
            return false;
         }
         if( document.logInForm.password.value == "" ) {
            alert( "Please provide your password!" );
            document.myForm.EMail.focus() ;
            return false;
         }
         return( true );
      }
}
}
</script>


</script>

<style>
/* Style inputs, select elements and textareas */
input[type=text], select, textarea{
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
}

/* Style the label to display next to the inputs */
label {
  padding: 12px 12px 12px 0;
  display: inline-block;
}

/* Style the submit button */
input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  float: right;
}

/* Style the container */
.container {
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
}

/* Floating column for labels: 25% width */
.col-25 {
  float: left;
  width: 25%;
  margin-top: 6px;
}

/* Floating column for inputs: 75% width */
.col-75 {
  float: left;
  width: 75%;
  margin-top: 6px;
}

/* Clear floats after the columns */
.row:after {
  content: "";
  display: table;
  clear: both;
}

/* Responsive layout - when the screen is less than 600px wide, make the two columns stack on top of each other instead of next to each other */
@media screen and (max-width: 600px) {
  .col-25, .col-75, input[type=submit] {
    width: 100%;
    margin-top: 0;
  }
}
</style>
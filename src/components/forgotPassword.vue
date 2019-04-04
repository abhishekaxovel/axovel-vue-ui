<template>
<div class="container">
  <form id="forgotPassword">
    <div class="row">
      <div class="col-25">
        <label for="email">Email</label>
      </div>
      <div class="col-75">
        <input type="email" v-model="email" name="email" placeholder="enter your email here" required>
        <div v-for="error in errors" :key="error">{{error}}</div>
      </div>
    </div>
    <div class="pull-right">
      <button type="button" class="btn btn-success" @click="forgotPassword">change password</button>
    </div>
  </form>
</div>
</template>

<script>
import axios from 'axios';
import router from '../router/index.js'

export default {

  data(){
    return{
      errors: [],
      email: ''
    }
  },

methods:{

 checkForm: function (e) {
      this.errors = [];
      if (!this.email) {
        this.errors.push('Email required.');
      } else if (!this.validEmail(this.email)) {
        this.errors.push('Valid email required.');
      }

      if (!this.errors.length) {
        return true;
      }
      // e.preventDefault();
    },

    validEmail: function (email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },



    forgotPassword(){
      if(this.checkForm()){
        let forgot = new FormData()
        forgot.email = this.email
        axios({
        method: 'post',
        url: 'http://localhost:3200/users/forgot_password',
        data: {forgot},
        config: { 
        headers: {'Content-Type': 'application/json'}
        }
      })
        .then(function (response) {
          console.log('user res here...',response.data);
        })
              .catch(function (err) {
                  console.log('err here',err);
              });
              if(this.email){
                alert("Reset password link send");
                router.replace('/update-password');
              }else{
                alert("email required");
              }
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

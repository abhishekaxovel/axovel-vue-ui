<template>

<div class="admin">

  <div> <h1> Register here </h1> </div>
          <!-- <p v-if="errors.length">
            <b>Please correct the following error(s):</b>
            <ul>
              <li v-for="error in errors" :key="error">{{ error }}</li>
            </ul>
          </p> -->
          <hr>
  <div>

<b-card class="container">
  <form id="newUserform" @submit.prevent="checkForm">
    <div class="row">
      <div class="col-25">
        <label for="fname">First Name</label>
      </div>
      <div class="col-75">
        <input class="form-control" type="text" v-model="fname" name="firstname" placeholder="Your first name.." autofocus>
         <div v-for="fields in fields" :key="fields" style="color: red">{{fields}}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="lname">Last Name</label>
      </div>
      <div class="col-75">
        <input class="form-control" type="text" v-model="lname" name="lastname" placeholder="Your last name..">
      </div>
    </div>
    <!-- <div class="row">
      <div class="col-25">
        <label for="mobile">Mobile</label>
      </div>
      <div class="col-75">
        <input type="text" id="mobile" name="mobile" placeholder="Your Mobile Number..">
      </div>
    </div> -->
    <div class="row">
      <div class="col-25">
        <label for="email">Email</label>
      </div>
      <!-- <div class="col-75">
        <input type="text" v-model="email" name="email" placeholder="Your email address.." 
          class="form-control" :class="{ 'is-invalid': submitted && !email }">
          <div v-show="submitted && !email" class="invalid-feedback">Email is required</div>
      </div> -->
      <div class="col-75">
        <input class="form-control" type="text" v-model="email" name="email" placeholder="Your email address.." autofocus>
          <div v-for="error in errors" :key="error" autofocus style="color: red">{{error}}</div>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="country">Country</label>
      </div>
      <div class="col-75">
        <select class="form-control" id="country" name="country">
          <option value="australia">Australia</option>
          <option value="india">India</option>
          <option value="canada">Canada</option>
          <option value="usa">USA</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="subject">Address</label>
      </div>
      <div class="col-75">
        <textarea class="form-control" id="address" name="address" placeholder="Enter full address here.." style="height:200px"></textarea>
        <!-- <div v-if="ValidationMessages">
            <div v-for="address in address" :key="address">{{address.message}}</div>
        </div> -->
      </div>
    </div>
    <div class="pull-right">
      <button type="button" class="btn btn-primary" @click="submitForm">Register</button>
    </div>
  </form>
</b-card>
       </div>
    </div>
</template>




<script>
import User from './User'
import axios from 'axios'
import router from '../router/index.js'

export default {
name: 'Admin',
components: {
    User
},
 data () {
    return {
      user: '',
      errors: [],
      fields: [],
      email: '',
      fname: '',
      lname: '',
      submitted: false
    }
  },
created() {

    axios.get(`http://localhost:3200/users/users`)
    .then(res => {
      // this.email = res.data.email;
     console.log('res here...', res.data);
    })
    .catch(e => {
      console.log('err here...',e);
    })

  },

  mounted() {
  console.log(process.env.ROOT_API)
},
  methods: {

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


    checkField: function (e) {
      this.fields = [];
      if (!this.fname) {
        this.fields.push("First Name required.");
      }
      if (!this.fields.length) {
        return true;
      }
      // e.preventDefault();
    },



    submitForm(){
      this.submitted = true;
      this.checkField();
      this.checkForm();
      if(this.fname && this.email && this.validEmail(this.email)){

            let uId = Math.random().toString(36).slice(-10);
            let password = Math.random().toString(36).slice(-8);
            let role = 'user';
            let userData = new FormData();
            userData.firstname = this.fname;
            userData.lastname = this.lname;
            // userData.mobile = mobile.value;
            userData.email = this.email;
            userData.address = address.value;
            userData.country = country.value;
            userData.password = password;
            userData.uId = uId;
            userData.role = role;
            // console.log('form data ...', userData);
            
            axios({
            method: 'post',
            url: 'http://localhost:3200/users/create',
            data: {userData} ,
            config: { 
              headers: {'Content-Type': 'application/json'}
              }
            })
            .then(function (response) {
              const user = response.data.message
              console.log('user.....',user);
              console.log('res here',response);
              if(user == 'user created'){
                alert('user created');
                router.replace('/user');
               }
               else{
                 alert('user exists');
               }
            })
            .catch(function (response) {
                console.log('err here',response);
            });     
        }
      
    }
  }
}
</script>




<style>

/* input[type=text], select, textarea{
  width: 70%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  resize: vertical;
} */

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
  /* background-color: #f2f2f2; */
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


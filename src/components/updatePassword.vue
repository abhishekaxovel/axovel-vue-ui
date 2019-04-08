<template>
<div>
          <b-alert class="container" v-model="showDismissibleAlert" variant="danger" dismissible>
            All fields are required
          </b-alert>

  <b-card class="container">
    <form id="forgotPassword">
    <div class="row">
      <div class="col-25">
        <label for="email">Unique Id</label>
      </div>
      <div class="col-75">
        <input class="form-control" type="text" v-model="uId" placeholder="enter unique id here" required>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="email">New password</label>
      </div>
      <div class="col-75">
        <input class="form-control" type="password" v-model="password" placeholder="enter new password here" required>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="email">Confirm password</label>
      </div>
      <div class="col-75">
        <input class="form-control" type="password" v-model="confirmpassword" placeholder="confirm password here" @keyup="checkPassword">
        <div v-if="err">{{error}}</div>
      </div>
    </div>
    <!-- <div>
      <div class="col-75">
        <h4 v-if="this.checkPassword">password not matched</h4>
      </div>
    </div> -->
    <div class="pull-right">
      <button type="button" class="btn btn-primary" @click="updatePassword">Update password</button>
    </div>
    </form>
    </b-card>
</div>
</template>

<script>
import axios from 'axios';
import router from '../router/index.js'
export default {
    data(){
        return{
            uId: '',
            password: '',
            confirmpassword: '',
            error: 'password not matched',
            err: false,
            showDismissibleAlert: false
        }
    },
    methods: {
      checkPassword(){
        if(this.password === this.confirmpassword){
          this.err = false;
          // console.log('password matched');
        }else{
           this.err = true;
          // console.log('password not matched');
        }
      },
      updatePassword(){
        this.checkPassword();
        if(this.uId && this.password && this.confirmpassword){
        let forgot = new FormData()
        forgot.uId = this.uId
        forgot.password = this.password
        axios({
            method: 'post',
            url: 'http://localhost:3200/users/update_password',
            data: {forgot},
            config: { 
            headers: {'Content-Type': 'application/json'}
            }
          })
        .then(function (response) {
          console.log('user res here...',response.data);
          alert("password updated");
          router.replace('/');
        })
              .catch(function (err) {
                  console.log('err here',err);
              });
        }  else{
          this.showDismissibleAlert = true
        } 
    }
    }

}
</script>

<style>
/* input[type=text], select, textarea, input{
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
  width: 700px;
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

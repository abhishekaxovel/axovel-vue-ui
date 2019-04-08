<template>
  <div class="container">
  <b-card>  
  <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group
        id="input-group-1"
        label="Email address:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Your password:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="password"
          type="password"
          required
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
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
    data() {
      return {
         email: '',
         password: '',
        form: {
          email: '',
          password: '',
        },
        show: true
      }
    },
    methods: {
      onSubmit(evt) {
        evt.preventDefault()
          if(this.email && this.password){
          let logIn = new FormData()
          console.log(logIn)
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

      },
      onReset(evt) {
        evt.preventDefault()
        this.email = ''
        this.password = ''
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>
<style>
.container{
  width:700px;
}
</style>

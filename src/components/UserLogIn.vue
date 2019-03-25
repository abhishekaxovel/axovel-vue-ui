
<template>
  <v-form class="form" ref="form" v-model="valid" lazy-validation>
    <v-text-field type="email" id="email" v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
    <v-text-field type="password" id="password" v-model="password" :rules="passwordRules" label="Password" required></v-text-field>
    <v-btn :disabled="!valid" color="default" @click="LogInForm"> LogIn </v-btn>
  </v-form>
</template>


<script>
import axios from 'axios';
import router from '../router/index.js'
import VueJwtDecode from 'vue-jwt-decode'

  export default {
    data: () => ({
      form: {},
      valid: true,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      email: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
      ],
      
    }),

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      submitForm(){
       form.email = this.email
       form.password =  this.password
        console.log(form);
      },
       LogInForm(){
        console.log('in log in function....');
        let logIn = new FormData()
        logIn.email = email.value
        logIn.password = password.value

        axios({
        method: 'post',
        url: 'http://localhost:3200/users/logIn',
        data: {logIn},
        config: { 
        headers: {'Content-Type': 'application/json'}
        }
    })
      .then(function (response) {
        localStorage.setItem('jwt', response.data.token);
        console.log('localStorage.getItemjwt' , localStorage.getItem('jwt'));
        this.$jwtDec("localStorage.getItem('jwt')");
        console.log('this.$jwtDec("localStorage....',this.$jwtDec("localStorage.getItem('jwt')"));

        // this.details = response.data.user
        // console.log('details...', details);
            console.log('user res here...',response.data);
            if(response.data.data == true && response.data.role == 'admin'){
                console.log('admin page');
                // this.$router.push('/admin-dash');
                router.replace('/admin-dash');
            }
            else if(response.data.data == true && response.data.role == 'user'){
                console.log('user page');  
                // this.$router.push('/user-dash');
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
.form{
  width: 60%;
  text-align: end;
  display: inline-block;
}
</style>

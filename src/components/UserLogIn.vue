
<template>
  <v-form class="form" ref="form" v-model="valid" lazy-validation>
    <v-text-field type="email" v-model="email" :rules="emailRules" label="E-mail" required></v-text-field>
    <v-text-field type="password" v-model="password" :rules="passwordRules" label="Password" required></v-text-field>
    <v-btn :disabled="!valid" color="default" @click="submitForm"> LogIn </v-btn>
  </v-form>
</template>


<script>
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

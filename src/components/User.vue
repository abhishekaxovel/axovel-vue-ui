<template>
    <div class="user">
    
      <h2 style="text-align: -webkit-center;
    font-family: -webkit-pictograph;
    color: darkcyan;">User Page</h2>
      <hr>
      <div class="user">
    
        <div v-for="(detail, i) in details"
              :key="i">

              <p class="details">
                 <strong>First Name : </strong> {{detail.firstname}}
                 <strong>Last Name : </strong> {{detail.lastname}} 
                 <strong>Email : </strong> {{detail.email}} 
                 <strong>Mobile : </strong> {{detail.mobile}} 
                 <strong>Address : </strong> {{detail.address}}
              </p>
              <hr>

        </div>

      </div>
    </div>
</template>

<script>
import axios from 'axios'

// details: []

export default {
name: 'user',
components: {
},
data () {
    return {
      firstname: '',
      lastname: '',
      email: '',
      mobile: '',
      address: '',
      details: []
    }
  },
  created(){

   axios.get(`http://localhost:3200/users/users`)
    .then(res => {
      this.details = res.data;

      this.firstname = res.data.firstname;
      this.lastname = res.data.lastname;
      this.email = res.data.email;
      this.mobile = res.data.mobile;
      this.address = res.data.address;

     console.log('details here...', this.details);
    })
    .catch(e => {
      console.log('err here...',e);
    })

  },
  methods: {
    onGoClick(){
      console.log('hello....');
    }
  }
}
</script>

<style>
.details{
  margin: 7px;
  padding: 10px;
  font-family: 'Courier New', Courier, monospace;
}
.user{
    text-align: -webkit-auto;
    margin-left: 25px;
}
</style>

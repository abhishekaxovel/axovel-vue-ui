<template>
<div>
    <h3>Admin Page</h3>
      <div class="details">
          
      </div>

     <div class="logout">
         <button type="button" class="btn btn-danger" @click="logOut">LogOut</button>
     </div>
<hr>

<Event />

</div>
</template>

<script>
import axios from 'axios'
import Event from './create_event'

export default {
components: {
  Event
},

data(){
    return{
      
    }
},

beforeCreate(){
    // console.log('local storage... ', localStorage.getItem('jwt'));
    if(localStorage.getItem('jwt') != null){
      this.$router.push('/admin-dash')
    }else{
      this.$router.push('/')
    }
  }, 
created(){
   
  },
methods: {
    logOut(){
          console.log('in log out func...');
          localStorage.removeItem('jwt');
          this.$router.push('/');
      }
 
  }

}
</script>

<style>
.details{
   text-align: -webkit-left;
   margin: 10px; 
}

.logout{
   text-align: -webkit-right;
    margin: 10px; 
}

input[type=text], select, textarea{
  width: 70%;
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

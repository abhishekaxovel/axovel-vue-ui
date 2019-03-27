<template>
<div>
  <!-- <P>{{email}}</P> -->
    <h3>Admin Page</h3>
      <div class="details">
          <div>{{admin}}</div>
      </div>

     <div class="logout">
         <button type="button" class="btn btn-primary" @click="logOut">LogOut</button>
     </div>
<hr>

  <div>
    <form id="newUserform" @submit="submitForm">
    <div class="row">
      <div class="col-25">
        <label for="event_name">Event Name</label>
      </div>
      <div class="col-75">
        <input type="text" id="event_name" name="event_name" placeholder="Event name here..">
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="event_type">Event Type</label>
      </div>
      <div class="col-75">
        <input type="text" id="event_type" name="event_type" placeholder="Event type here..">
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="country">Country</label>
      </div>
      <div class="col-75">
        <select id="country" name="country">
          <option value="australia">Australia</option>
          <option value="india">India</option>
          <option value="canada">Canada</option>
          <option value="usa">USA</option>
        </select>
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="subject">Event Address</label>
      </div>
      <div class="col-75">
        <textarea id="address" name="address" placeholder="Enter full address here.." style="height:200px"></textarea>
      </div>
    </div>
    <div class="pull-right">
      <button type="button" class="btn btn-primary" @click="submitForm">Create event</button>
    </div>
  </form>
     </div>
</div>
</template>

<script>
import axios from 'axios'

export default {

data(){
    return{
      admin: ''
    }
  },
beforeCreate(){
    console.log('local storage... ', localStorage.getItem('jwt'));
    if(localStorage.getItem('jwt') != null){
      this.$router.push('/admin-dash')
    }else{
      this.$router.push('/')
    }
  }, 
created(){
    //   axios.get(`http://localhost:3200/users/get_event`)
    // .then(res => {
    //   // this.email = res.data.email;
    //  console.log('res here...', res.data);
    // })
    // .catch(e => {
    //   console.log('err here...',e);
    // })
  },
methods: {
    logOut(){
          console.log('in log out func...');
          localStorage.removeItem('jwt');
          this.$router.push('/');
      },

    submitForm(){
      let password = Math.random().toString(36).slice(-8);
      let eventData = new FormData();
      eventData.event_name = event_name.value;
      eventData.event_type = event_type.value;
      eventData.address = address.value;
      eventData.country = country.value;
      console.log('form data ...', eventData);
      
    axios({
    method: 'post',
    url: 'http://localhost:3200/users/create_event',
    data: {eventData} ,
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
     this.$router.push({ path : '/event-list' });
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

<template>
<div>

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
        <label for="event_type">Mobile</label>
      </div>
      <div class="col-75">
        <input type="text" id="contacts" name="event_contacts" placeholder="Event contact number here..">
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
    <!-- <div class="pull-right">
      <button type="button" class="btn btn-primary" @click="submitForm">Create event</button>
    </div> -->
  </form>
  
            <button type="button" class="btn btn-primary" @click="addSchedule">Add schedule</button>


<form id="eventform" v-if="eventForm">
    <div v-for="(item, key) in event_schedule" :key="key">
        <div class="row">
        <div class="col-25">
            <label for="event_name">Event place</label>
        </div>
        <div class="col-75">
            <input type="text" id="event_place" name="event_place" v-model="item.place" placeholder="Event place here..">
        </div>
        </div>

        <div class="row">
        <div class="col-25">
            <label for="event_type">Event details</label>
        </div>
        <div class="col-75">
            <input type="text" id="event_details" name="event_details" v-model="item.details" placeholder="Event details here..">
        </div>
        </div>
    </div>
    

        <button v-if="event_schedule.length > 0" type="button" class="btn btn-primary" @click="addMore">Add more</button>
        <button v-if="event_schedule.length > 1" type="button" class="btn btn-primary" @click="remove">Remove</button>
</form>


 <div class="pull-right">
      <button type="button" class="btn btn-primary" @click="submitForm">Create event</button>
</div>

    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {

data(){
    return{
        eventForm: false,
        event_schedule: [
            {place: '', details: ''}
        ]
    }
  },
 
created(){
    
  },
methods: {

    addSchedule(){
            this.eventForm = true;
    },

    addMore(){
        let data = {place: '', details: ''}
        if(this.event_schedule.length < 5){
            this.event_schedule.push(data);
        }
    },

    remove(){
        let data = {place: '', details: ''}
        if(this.event_schedule){
            this.event_schedule.pop(data);
        }
    },
    
    submitForm(){
      let password = Math.random().toString(36).slice(-8);
      let eventData = new FormData();
      eventData.event_name = event_name.value;
      eventData.event_type = event_type.value;
      eventData.contacts = contacts.value;
      eventData.address = address.value;
      eventData.country = country.value;
      eventData.event_schedule = this.event_schedule;
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

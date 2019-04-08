<template>
<div>

  <div class="container">
    <form id="newUserform" @submit="submitForm">
    <div class="row">
      <div class="col-25">
        <label for="event_name">Event name</label>
      </div>
      <div class="col-75">
        <input type="text" id="event_name" name="event_name" placeholder="Event name here..">
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="event_type">Event type</label>
      </div>
      <div class="col-75">
        <input type="text" id="event_type" name="event_type" placeholder="Event type here..">
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="event_type">Event contact</label>
      </div>
      <div class="col-75">
        <input type="text" id="contacts" name="event_contacts" placeholder="Event contact number here..">
      </div>
    </div>

    <div class="row">
      <div class="col-25">
        <label for="country">Event country</label>
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
        <label for="subject">Event address</label>
      </div>
      <div class="col-75">
        <textarea id="address" name="address" placeholder="Enter full address here.."></textarea>
      </div>
    </div>
  </form>

        <div class="large-12 medium-12 small-12 cell">
            <label>Schedules</label>
        </div>
  
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
            <label for="event_type">Event Date</label>
        </div>
        <div class="col-75">
            <input class="date" v-model="item.date" type="date" name="date" min="2019-01-01">         
        </div>
        </div>

        <div class="row">
        <div class="col-25">
            <label for="event_type">Event Time</label>
        </div>
        <div class="col-75">
            <input class="date" v-model="item.time" type="time">         
        </div>
        </div>

        <div class="row">
        <div class="col-25">
            <label for="event_type">Event details</label>
        </div>
        <div class="col-75">
            <textarea type="text" id="event_details" name="event_details" v-model="item.details" placeholder="Event details here.."></textarea>
        </div>
        </div>

    </div>
    

        <button v-if="event_schedule.length > 0" type="button" class="btn btn-primary" @click="addMore">Add more</button>
        <button v-if="event_schedule.length > 1" type="button" class="btn btn-danger" @click="remove">Remove</button>
</form>


    <div class="large-12 medium-12 small-12 cell">
            <label>Files
            <input type="file" id="files" ref="files" accept="image/*" multiple v-on:change="handleFilesUpload()"/>
            </label>
    </div>
    <div class="large-12 medium-12 small-12 cell">
                <div class="grid-x">
                <div v-for="(file, key) in files" :key="key" class="large-4 medium-4 small-6 cell file-listing">
                {{ file.name }}<br>
                <img class="preview" width="500px" height="350px" v-bind:ref="'image'+parseInt( key )"/>
                </div>
                </div>
    </div>
    <br>

    <div>
        <div class="large-12 medium-12 small-12 cell clear">
        <button class="btn btn-primary" v-on:click="addFiles()">Add Files</button>
        <button v-if="files.length > 0" class="btn btn-danger" v-on:click="removeFiles()">Remove Files</button>
        <button v-if="files.length" class="btn btn-success" v-on:click="submitFiles()">Upload Files</button>
        </div>
    </div>

<hr>
<div class="pull-right">
      <button type="button" class="btn btn-success" @click="submitForm">Create event</button>
</div>

    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {

data(){
    return{
        baseUrl:  'http://localhost:3200/event',
        selectedFile: '',
        files: [],
        eventForm: false,
        event_schedule: [
            {place: '', details: '', date: '', time: ''}
        ]
    }
  },
 
created(){
    
  },
methods: {

    addFiles(){
        this.$refs.files.click();
      },

    removeFiles(){
        this.files.pop()
    },

    submitFiles(){
        let formData = new FormData();
        for( var i = 0; i < this.files.length; i++ ){
          let file = this.files[i];
          formData.append('files[' + i + ']', file);
        }
        console.log('formdata', formData);
        for (var key of formData.entries()) {
              console.log(key[0], key[1]);
              }
        // var image = formData.get('file');
        // console.log('image details', image);
        // var image = image.name
        // this.selectedFile = image
        // console.log('image name', image);
        // console.log('selected file...', this.selectedFile);
        // console.log('formdata', formData);
        axios({
          method: 'post',
          url: this.baseUrl + '/imageUpload',
          data:  {formData},
          config: { 
            headers: {'Content-Type': 'multipart/form-data'}
            }
          })
          .then(function (response) {
              console.log('res here',response);
          })
          .catch(function (response) {
              console.log('err here',response);
          }); 
      },

    handleFilesUpload(){
        let uploadedFiles = this.$refs.files.files;
        for( var i = 0; i < uploadedFiles.length; i++ ){
          this.files.push( uploadedFiles[i] );
          console.log('uploaded files...',uploadedFiles[i]);
        }
        this.getImagePreviews();
      },

    getImagePreviews(){
        for( let i = 0; i < this.files.length; i++ ){
          if ( /\.(jpe?g|png|gif)$/i.test( this.files[i].name ) ) {
            let reader = new FileReader();
            reader.addEventListener("load", function(){
              this.$refs['image'+parseInt( i )][0].src = reader.result;
            }.bind(this), false);
            reader.readAsDataURL( this.files[i] );
          }
        }
      },


    addSchedule(){
            this.eventForm = true;
    },

    addMore(){
        let data = {place: '', details: '', date: '', time: ''}
        if(this.event_schedule.length < 5){
            this.event_schedule.push(data);
        }
    },

    remove(){
        if(this.event_schedule){
            this.event_schedule.pop();
        }
    },
    
    submitForm(){
      let eventData = new FormData();
      eventData.event_name = event_name.value;
      eventData.event_type = event_type.value;
      eventData.contacts = contacts.value;
      eventData.address = address.value;
      eventData.country = country.value;
      eventData.event_schedule = this.event_schedule;
      // eventData.event_images = this.files;
      eventData.event_images = this.selectedFile;
      console.log('form data ...', eventData);    
    axios({
    method: 'post',
    url: this.baseUrl + '/create_event',
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
.date{
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
  /* background-color:linen; */
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


 input[type="file"]{
    position: absolute;
    top: -500px;
  }
  div.file-listing img{
    max-width: 60%;
  }

</style>

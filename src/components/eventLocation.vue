<template>
    <div>
        <b-breadcrumb :items="items"></b-breadcrumb>
        <div class="col-md-8">
            <b-card align="center" title="Website Preview" class="scroll">

            <b-card class="row">
                <div class="col-md-12" style="background-color: antiquewhite; height: 300px">

                <div class="col-md-12" align="center">
                    <h1 style="padding: 20px">{{EventInformation.name}}</h1><hr></div>

                <div class="col-md-12">
                        <div class="col-md-6"><h4 style="text-align: initial;">
                       Start Date : {{EventInformation.startDate | formatDate}} <br>
                       End Date : {{EventInformation.endDate | formatDate}}
                        </h4></div>
                        <div class="col-md-6">
                            <h4>Axovel Software Dwarka Delhi 110075</h4>
                        </div>
                </div>

                </div>
            </b-card>

            <b-card class="row">
                <div class="col-md-12">
                    <h3 align="center">Countdown to the Event</h3><hr>
                     <!-- <mdb-google-map
                        name="reg"
                        class="col-md-12"
                        :markerCoordinates="coordinates"
                        style=" height: 200px"
                        :zoom="14">
                    </mdb-google-map> -->
                </div>
            </b-card>

            <b-card class="row">
                <div class="col-md-12">
                    <div class="col-md-4">
                    <h3>Register By</h3>
                    <p>{{EventInformation.deadLine | formatDate}}</p>
                    </div>
                    <div class="col-md-4">
                    <b-button>Register Now</b-button>
                    </div>
                    <div class="col-md-4">
                    <b-button>Contact Us</b-button>
                    </div>
                </div>
            </b-card>

            <b-card class="row">
                <div class="col-md-12" style="background-color: coral;">
                      <mdb-footer color="Grey" class="font-small pt-0">
                        <mdb-container>
                        <mdb-row>
                        <mdb-col md="12">
                        <div class="mb-5 flex-center">
                        <a class="fb-ic"><i class="fab fa-facebook fa-lg white-text mr-md-5 mr-3 fa-2x"> </i></a>
                        <a class="tw-ic"><i class="fab fa-twitter fa-lg white-text mr-md-5 mr-3 fa-2x"> </i></a>
                        <a class="gplus-ic"><i class="fab fa-google-plus fa-lg white-text mr-md-5 mr-3 fa-2x"> </i></a>
                        <a class="li-ic"><i class="fab fa-linkedin-in fa-lg white-text mr-md-5 mr-3 fa-2x"> </i></a>
                        <a class="ins-ic"><i class="fab fa-instagram fa-lg white-text mr-md-5 mr-3 fa-2x"> </i></a>
                        <a class="pin-ic"><i class="fab fa-pinterest fa-lg white-text fa-2x"> </i></a>
                        </div>
                        </mdb-col>
                        </mdb-row>
                        </mdb-container>
                        <div class="footer-copyright text-center py-3">
                        <mdb-container fluid>
                            &copy; 2019 Copyright: <!-- <a href="https://www.AxovelSoftware.com"> AxovelSoftware.com </a> -->
                        </mdb-container>
                        </div>
                        </mdb-footer>
                </div>
            </b-card>

        </b-card>
        </div>

        <div class="col-md-4">
        <b-card class="scroll"> 
        <h3 align="start">Location</h3><hr>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-1" label="Venue Name" label-for="input-1" align="start">
                <b-form-input
                id="input-1"
                v-model="Location.venue"
                required
                placeholder="Name of your venue"
                ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="Address 1" label-for="input-2" align="start">
                <b-form-input
                id="input-2"
                v-model="Location.address1"
                placeholder="Address Line 1"
                required
                ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-3" label="Address 2" label-for="input-3" align="start">
                <b-form-input
                id="input-3"
                v-model="Location.address2"
                placeholder="Address Line 2"
                required
                ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-4" label="Address 3" label-for="input-4" align="start">
                <b-form-input
                id="input-4"
                v-model="Location.address3"
                placeholder="Address Line 3"
                required
                ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-5" label="City" label-for="input-5" align="start">
                <b-form-input
                id="input-5"
                v-model="Location.city"
                placeholder="Event City"
                required
                ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-6" label="State" label-for="input-6" align="start">
                <b-form-input
                id="input-6"
                v-model="Location.state"
                placeholder="Event State"
                required
                ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-7" label="Country" label-for="input-7" align="start">
                <b-form-select v-model="Location.country" :options="Location.options" class="mb-3">
                <template slot="first">
                    <option :value="null" disabled>-- Please select country --</option>
                </template>
                <option value="C">Option C</option> <option value="D">Option D</option>
                </b-form-select>
            </b-form-group>
            <b-form-group id="input-group-8" label="Phone" label-for="input-8" align="start">
                <b-form-input
                id="input-8"
                v-model="Location.phone"
                placeholder="Event Phone"
                required
                ></b-form-input>
            </b-form-group>
            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
        </b-card>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mdbStepper, mdbStep, mdbFooter, mdbContainer, mdbRow, mdbCol } from 'mdbvue';
import router from '../router/index.js';
import moment from 'moment';
 import { mdbGoogleMap } from 'mdbvue';

export default {

data(){
    return{
    baseUrl:  'http://localhost:3200/event',
    coordinates: [{
          latitude: 40.725118,
          longitude: -73.997699,
          title: 'New York'
        }],
    show: true, 
    items: [
            {
                text: 'Event Information',
                to: '/event'
            },
            {
                text: 'Location',
                to: '/eventLocation',
                active: true
            },
            {
                text: 'Registration',
                to: '/eventRegistration'
                // active: true
            },
            {
                text: 'Payments',
                to: '/eventPayment'
            }
            ],

Location: {
        venue: '',
        address1: '',
        address2: '',
        address3: '',
        city: '',
        zip: '',
        state: '',
        country: '',
        phone: '',
        country: null,
        options: [
          { value: 'A', text: 'Option A (from options prop)' },
          { value: 'B', text: 'Option B (from options prop)' }
        ]
     },
     EventInformation: {
        name:'',
        description: '',
        startDate: '',
        endDate: '',
        deadLine: '',
        goal: '',
        people: '',
        selected: null,
        options: [
          { value: 'A', text: 'Option A (from options prop)' },
          { value: 'B', text: 'Option B (from options prop)' }
        ]}

    }
},
components: {
    mdbGoogleMap
},
created(){

axios.get(this.baseUrl + '/eventInformation')
    .then(res => {
    console.log('res here...', res.data.EventInformation);
    this.EventInformation = res.data.EventInformation;
    this.Location = res.data.Location;
    })
    .catch(err => {
      console.log('err here...',err);
    })

},

filters: {
    formatDate(value){
    if (value) {
        return moment(String(value)).format('DD/MM/YYYY')
    }
    }
},

components: {
    mdbFooter,
    mdbContainer,
    mdbRow,
    mdbCol
},

methods: {
onSubmit(evt) {
        evt.preventDefault()
          let event = new FormData();
          let eventId = 'cvent';
          event.eventId = eventId;
          event.Location = this.Location;
          console.log('event', event);
          axios({
          method: 'post',
          url: this.baseUrl + '/event',
          data:  {event: event},
          config: { 
            headers: {'Content-Type': 'multipart/form-data'}
            }
          })
          .then(function (response) {
              console.log('res here',response);
              router.replace('/eventRegistration')
          })
          .catch(function (response) {
              console.log('err here',response);
          });
      },
   onReset(evt) {
        evt.preventDefault()
        this.Location.venue = ''
        this.Location.address1 = ''
        this.Location.address2 = ''
        this.Location.address3 = ''
        this.Location.city = ''
        this.Location.state = ''
        this.Location.country = ''
        this.Location.phone = ''
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      }
}
}
</script>

<style>
.scroll{
  height:600px;
  overflow-y: scroll;
}
</style>

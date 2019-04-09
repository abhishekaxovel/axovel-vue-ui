<template>
    <div>
        <b-breadcrumb :items="items"></b-breadcrumb>
        <div class="col-md-8">
        <b-card align="center" title="Website Preview" class="scroll">

            <b-card class="row">
                <div class="col-md-12" style="background-color: antiquewhite; height: 300px">

                <div class="col-md-12" align="center">
                    <h1 style="padding: 20px">
                        {{EventInformation.name}}</h1><hr></div>

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
                </div>
            </b-card>

            <b-card class="row">
                <div class="col-md-12">
                    <div class="col-md-4">
                    <h3>Register By</h3>
                    <p>{{EventInformation.deadLine| formatDate}}</p>
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
        <h3 align="start">Event Information</h3><hr>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-1" label="What's the name of your event?" label-for="input-1" align="start">
                <b-form-input
                id="input-1"
                v-model="EventInformation.name"
                required
                placeholder="Name of your event"
                ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-2" label="How would you describe your event?" label-for="input-2" align="start">
                <b-form-textarea
                id="textarea"
                v-model="EventInformation.description"
                required
                placeholder="Description of your event"
                rows="3"
                max-rows="6"
                ></b-form-textarea>
            </b-form-group>
            <b-form-group id="input-group-3" label="What locale will you be using?" label-for="input-3" align="start">
                <b-form-select v-model="EventInformation.selected" :options="EventInformation.options" class="mb-3">
                <template slot="first">
                    <option :value="null" disabled>-- Please select an option --</option>
                </template>
                <option value="C">Option C</option> <option value="D">Option D</option>
                </b-form-select>
            </b-form-group>
            <!-- <b-form-group id="input-group-4" label="Who can register for this event?" label-for="input-4">
                <b-form-radio v-model="selected" name="some-radios" value="A">Open to the public</b-form-radio>
                <b-form-radio v-model="selected" name="some-radios" value="B">Only those who get invitations</b-form-radio>
            </b-form-group> -->
            <b-form-group id="input-group-4" label="How many people can attend your event?" label-for="input-4" align="start">
                <b-form-input
                id="input-4"
                type="number"
                v-model="EventInformation.people"
                min = 1
                required
                ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-5" label="What's your registration goal?" label-for="input-5" align="start">
                <b-form-input
                id="input-5"
                type="number"
                v-model="EventInformation.goal"
                min = 1
                required
                ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-6" label="When will your event start?" label-for="input-6" align="start">
                <b-form-input
                id="input-6"
                type="date"
                v-model="EventInformation.startDate"
                required
                ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-7" label="When will your event end?" label-for="input-7" align="start">
                <b-form-input
                id="input-7"
                type="date"
                v-model="EventInformation.endDate"
                @keyup="checkDate"
                required
                ></b-form-input>
            </b-form-group>
            <b-form-group id="input-group-8" label="When is your registration deadline?" label-for="input-8" align="start">
                <b-form-input
                id="input-8"
                type="date"
                v-model="EventInformation.deadLine"
                @keyup="checkDeadLine"
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
import axios from 'axios'
import { mdbStepper, mdbStep, mdbFooter, mdbContainer, mdbRow, mdbCol } from 'mdbvue'
import router from '../router/index.js'
import moment from 'moment'
// import eventLocation from './eventLocation'

export default {
data(){
    return{
         baseUrl:  'http://localhost:3200/event',

         items: [
          {
            text: 'Event Information',
            to: '/event',
            active: true
          },
          {
            text: 'Location',
            to: '/eventLocation'
          },
          {
            text: 'Registration',
            to: '/eventRegistration'
          },
          {
              text: 'Payments',
              to: '/eventPayment'
          }
        ],
         show: true,

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

created(){

axios.get(this.baseUrl + '/eventInformation')
    .then(res => {
    console.log('res here...', res.data.EventInformation);
    this.EventInformation = res.data.EventInformation;
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
    mdbCol,
},

methods: {
onSubmit(evt) {
          evt.preventDefault();
          let eventId = 'cvent';
          let event = new FormData();
          event.eventId = eventId;
          event.EventInformation = this.EventInformation;
          console.log('event', event);
          axios({
          method: 'post',
          url: this.baseUrl + '/event',
          data: {event: event},
          config: { 
            headers: {'Content-Type': 'multipart/form-data'}
            }
          })
          .then(function (response) {
              console.log('res here',response);
               router.replace('/eventLocation');
          })
          .catch(function (response) {
              console.log('err here',response);
          });
      },
   onReset(evt) {
        evt.preventDefault()
        this.EventInformation.name = ''
        this.EventInformation.description = ''
        this.EventInformation.people = ''
        this.EventInformation.goal = ''
        this.EventInformation.selected = ''
        this.EventInformation.startDate = ''
        this.EventInformation.endDate = ''
        this.EventInformation.deadLine = ''
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },

      checkDate(){
         let check = this.startDate < this.endDate
          console.log('check date', check)
      },

      checkDeadLine(){
          if(this.startDate < this.endDate){
                console.log('valid-date');
          }else{
               console.log('not valid-date');
          }
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

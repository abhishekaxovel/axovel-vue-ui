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
                            <h4>
                                {{Location.venue}}, {{Location.address1}}
                                {{Location.address2}} {{Location.address3}},
                                {{Location.city}} {{Location.country}} {{Location.zip}}
                            </h4>
                        </div>
                </div>

                </div>
            </b-card>

            <!-- <b-card class="row">
                <div class="col-md-12">
                    <h3 align="center">Countdown to the Event</h3><hr>
                </div>
            </b-card> -->

            <b-card class="row">
                    <div class="col-md-12">
                    <h3 align="center">Order summary</h3><hr>
                    <div class="col-md-12">
                    <div class="col-md-6">
                    <h3> Event Details </h3>
                    </div>
                    <div class="col-md-6">
                    <h4><strong> Total Amount : </strong>{{Payments.amount}}</h4>
                    </div>
                    <br><hr>
                    <div class="col-md-12">
                    <h3>Payments details</h3>
                    <p><strong>Payment Mode : </strong>{{Payments.paymentMethod}}</p>
                    </div>
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
        <h3 align="start">Payments</h3><hr>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group id="input-group-1" label="What payment methods will you accept? " label-for="input-1" align="start">
                <b-form-checkbox-group
                    v-model="Payments.paymentMethod"
                    :options="options"
                    name="flavour-2a"
                    align="start"
                    stacked
                ></b-form-checkbox-group>
                </b-form-group>
            <b-form-group id="input-group-2" label="Total Amount?" label-for="input-2" align="start">
                <b-form-input
                id="input-1"
                v-model="Payments.amount"
                required
                ></b-form-input>
            </b-form-group>
            <!-- <b-form-group id="input-group-3" label="What locale will you be using?" label-for="input-3" align="start">
                <b-form-select v-model="selected" :options="options" class="mb-3">
                <template slot="first">
                    <option :value="null" disabled>-- Please select an option --</option>
                </template>
                <option value="C">Option C</option> <option value="D">Option D</option>
                </b-form-select>
            </b-form-group> -->
            <b-button type="submit" variant="primary">Finish</b-button>
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

export default {
data(){
    return{
        baseUrl:  'http://localhost:3200/event',
        show: true,

        Payments: {
            paymentMethod: null, // Must be an array reference!
            amount: ''
        },
        options: [
                    { text: 'Credit card', value: 'Credit card' },
                    { text: 'Debit card', value: 'Debit card' },
                    { text: 'Net banking', value: 'Net banking' },
                    { text: 'Other', value: 'Other' }
                    ],
        items: [
                {
                    text: 'Event Information',
                    to: '/event'
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
                    to: '/eventPayment',
                    active: true
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
created(){

axios.get(this.baseUrl + '/eventInformation')
    .then(res => {
    console.log('res here...', res.data.EventInformation);
    this.EventInformation = res.data.EventInformation;
    this.Location = res.data.Location;
    this.Payments = res.data.Payments;
    })
    .catch(err => {
      console.log('err here...',err);
    })

},

filters: {
    formatDate(value){
    if (value) {
        return moment(String(value)).format('DD-MMMM-YYYY')
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
          event.Payments = this.Payments;
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
              router.replace('/event')
          })
          .catch(function (response) {
              console.log('err here',response);
          });
      },
   onReset(evt) {
        evt.preventDefault()
        this.Payments.paymentMethod = '';
        this.Payments.amount = '';
        this.show = false;
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

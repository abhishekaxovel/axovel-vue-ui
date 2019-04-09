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

            <!-- <b-card class="row">
                <div class="col-md-12">
                    <h3 align="center">Countdown to the Event</h3><hr>
                </div>
            </b-card> -->

            <b-card class="row">
                <div class="col-md-12">
                    <div>
                        <h3>Personal Information</h3>
                        <p>Fill out the information below, then click Next to continue.</p>
                        <hr>
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
        <h3 align="start">Registration</h3><hr>
        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
            <b-form-group id="input-group-2" label="What currency will you accept?" label-for="input-1" align="start">
                <b-form-input
                id="input-1"
                v-model="currency"
                required
                placeholder=""
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

export default {
    data(){
        return{
            baseUrl:  'http://localhost:3200/event',
            currency: '',
            show: true,
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
                        to: '/eventRegistration',
                        active: true
                    },
                    {
                        text: 'Payments',
                        to: '/eventPayment'
                    }
                ],

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
        //   event.Location = this.Location;
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
              router.replace('/eventPayment')
          })
          .catch(function (response) {
              console.log('err here',response);
          });
      },
   onReset(evt) {
        evt.preventDefault()
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

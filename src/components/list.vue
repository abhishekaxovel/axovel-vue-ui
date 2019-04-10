<template>
    <div>
        <b-card>
            <table>
                <tr>
                    <th>Event</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>DeadLine</th>
                    <th>Description</th>
                </tr>
                <tr>
                    <td>{{EventInformation.name}}</td>
                    <td>{{EventInformation.startDate | formatDate}}</td>
                    <td>{{EventInformation.endDate | formatDate}}</td>
                    <td>{{EventInformation.deadLine | formatDate}}</td>
                    <td>{{EventInformation.description}}</td>
                </tr>
            </table>
        </b-card>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
data(){
    return{
        baseUrl:  'http://localhost:3200/event',
        EventInformation: [],
        fields: ['name', 'description', 'selected'],
    }
},
filters: {
    formatDate(value){
    if (value) {
        return moment(String(value)).format('DD-MMMM-YYYY')
    }
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
}
}
</script>

<style>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>

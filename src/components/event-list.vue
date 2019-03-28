<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Event List Page</v-toolbar-title>
      <v-divider
        class="mx-2"
        inset
        vertical
      ></v-divider>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px" min-height="404px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark class="mb-2" v-on="on">New Event</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.event_name" label="Event name"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.event_type" label="Event type"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.address" label="Event city"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.country" label="Event country"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.contacts" label="Contacts"></v-text-field>
                </v-flex>
                <v-flex xs12 sm6 md4>
                  <v-text-field v-model="editedItem.event_schedule" label="Event Schedule"></v-text-field>
                </v-flex>

                <v-flex xs12 sm6 md4>
                      <v-dialog
                        ref="dialog"
                        v-model="modal"
                        :return-value.sync="date"
                        persistent
                        lazy
                        full-width
                        width="290px"
                      >
                        <template v-slot:activator="{ on }">
                          <v-text-field
                            v-model="date"
                            label="Picker in dialog"
                            prepend-icon="event"
                            readonly
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker v-model="date" scrollable>
                          <v-spacer></v-spacer>
                          <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                          <v-btn flat color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
                        </v-date-picker>
                      </v-dialog>
                  </v-flex>


              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="events"
      class="elevation-1"
      style="margin: 20px"
    >
      <template v-slot:items="props">
        <td class="text-sm-left">{{ props.item.event_name }}</td>
        <td class="text-sm-left">{{ props.item.event_type }}</td>
        <td class="text-sm-left">{{ props.item.address }}</td>
        <td class="text-sm-left">{{ props.item.country }}</td>
        <td class="text-sm-left">{{ props.item.contacts }}</td>
        <td class="justify-center layout px-0">
        <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
        <v-icon small @click="deleteItem(props.item)">delete</v-icon>
        </td>
      </template>

      <template v-slot:no-data>
        <p>no data found</p>
        <!-- <v-btn color="primary" @click="initialize">Reset</v-btn> -->
      </template>
      
    </v-data-table>
  </div>
</template>

<script>
import axios from 'axios'

export default {

data: () => ({
      dialog: false,
      date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,
      headers: [
        // { text: 'Events', align: 'left', sortable: false, value: 'type'},
        { text: 'Event name', value: 'type'},
        { text: 'Event type', value: 'city'},
        { text: 'Event address', value: 'country'},
        { text: 'Event country', value: 'contacts'},
        { text: 'Contact', value: 'contacts'},
        { text: 'Actions', value: 'name', align: 'center', sortable: false }
      ],
      events: [],
      editedIndex: -1,
      editedItem: {
        event_name: '',
        event_type: '',
        address: '',
        country: '',
        contacts: '',
        event_schedule: []

      },
      defaultItem: {
        event_name: '',
        event_type: '',
        city: '',
        country: '',
        contacts: '',
         event_schedule: []
      }
    }),

computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      }
    },

watch: {
      dialog (val) {
        val || this.close()
      }
    },

created () {
      
      axios.get(`http://localhost:3200/event/get_event`)
        .then(res => {
        this.events = res.data
        console.log('res here...', res.data);
        })
        .catch(e => {
        console.log('err here...',e);
        })

        this.initialize()
    },

methods: {
      initialize () {
        this.events = []
      },

      editItem (item) {
        this.editedIndex = this.events.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
        console.log(' this.editedItem',  this.editedItem)
      },

      deleteItem (item) {
        const index = this.events.indexOf(item)
        confirm('Are you sure you want to delete this event?') && this.events.splice(index, 1)
        axios({
        method: 'post',
        url: 'http://localhost:3200/event/delete_event',
        data: {item},
        config: { 
        headers: {'Content-Type': 'application/json'}
        }
        })
        .then(res => {
          console.log('res....', res)
        })
        console.log('item', item)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save (item) {
        if (this.editedIndex > -1) {
          Object.assign(this.events[this.editedIndex], this.editedItem)
          Object.assign(item,this.events[this.editedIndex])
          axios({
              method: 'post',
              url: 'http://localhost:3200/event/update_event',
              data: {item},
              config: { 
              headers: {'Content-Type': 'application/json'}
              }
              })
              .then(res => {
                console.log('res....', res)
              })
          
        } else {
          this.events.push(this.editedItem)
          console.log('this.editedIndex', this.editedItem)
          let item = this.editedItem
              axios({
              method: 'post',
              url: 'http://localhost:3200/event/create_event',
              data: {item},
              config: { 
              headers: {'Content-Type': 'application/json'}
              }
              })
              .then(res => {
                console.log('res....', res)
              })

        }
        this.close()
      }
    }
  }
</script>

<style>

</style>

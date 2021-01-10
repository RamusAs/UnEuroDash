<template>
  <v-container
    id="messages"
    fluid
    tag="section"
  >
    <v-row dense>
      <v-col
        cols="12"
        sm="3"
      >
        <h1>BOITE DE RECEPTION</h1>
      </v-col>
    </v-row>

    <v-divider />
    <div class="my-6" />

    <v-row class="rounded pa-4 my-3" :elevation="15">
      <v-col >
        <v-card
          v-for="item in messages" :key="item.id"
          class="row" rounded
          max-height="100px"  
        >
          <v-icon
            v-if="!item.read"
            class="ml-3"
            large
            :color="item.read ? 'green' : 'red'"
            @click="item.read = !item.read"
          >
            mdi-email
          </v-icon>
          <v-icon
            v-else
            class="ml-3"
            large
            :color="item.read ? 'green' : 'red'"
          >
            mdi-email-open
          </v-icon>
          <div class="col">
            <p>
              De: {{ item.name }} <br> {{ item.message }}
            </p>
          </div>
          <v-icon
            class="col-1"
            large
            color="info"
            @click="update( item )"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            class="mr-3"
            large
            color="red"
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </v-card>
      </v-col>
      <v-dialog
        v-model="dialog"
        max-width="500px"
      >
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row>
                <v-col
                  cols="6"
                >
                  Cc:
                  <v-autocomplete
                    v-model="mail"
                    :items="editedItem.mail"
                    chips
                    outlined
                    filled
                    dense
                    label="To"
                    full-width
                    hide-no-data
                    hide-selected
                    single-line
                  >
                    TO: 
                  </v-autocomplete>
                </v-col>
                <v-col
                  cols="6"
                >
                  Objet:
                  <v-text-field
                    outlined
                    dense
                    filled
                    label="Objet"
                  >
                  </v-text-field>
                </v-col>
                 <v-col
                  cols="12"
                >
                  Message:
                  <v-textarea
                    outlined
                    filled
                    label="Votre mail"
                  ></v-textarea>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="blue darken-1"
              text
              @click="dialog = false"
            >
              Annuler
            </v-btn>
            <v-btn
              color="blue darken-1"
              text
              :disabled="IsValid"
              @click=" editedIndex === -1 ? create(editedItem) : update(editedItem)"
            >
              Envoyer
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-dialog v-model="dialogDelete" max-width="500px">
        <v-card>
          <v-card-title class="headline">Are you really want to delete this item?</v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialogDelete = false">Cancel</v-btn>
            <v-btn color="blue darken-1" text @click=" deleteItemConfirm ( editedItem.id ) ">OK</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
  
</template>

<script>
  import axios from 'axios'
  import * as apiMes from '../../api/message';

  export default {
    name: 'Message',
   
    data: () => ({
      dialog: false,
      dialogDelete: false,
      messages: [],
      editedItem: {
        id: 0,
        name: '',
        mail: '',
        message: '',
        read: true,
      },
      
    }),
    methods: {

      async update( item ){
        try {
          this.dialog = true;
          item.read = true;
          await apiMes.update( item );
        } catch (error) {
          console.log(error);
        }
        this.editedItem = Object.assign({}, item)
      },
      deleteItem( item ){
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      async deleteItemConfirm(id){
        try {
          console.log('je suis la ');
          await apiMes.deleteMany([id,]);
          await this.init();
        } catch (error) {
          console.log(error)
        }
        this.dialogDelete = false;
      },
      async init(){
        const mesRes = await apiMes.getAll();
        this.messages = mesRes.data.data;
      }
    },
    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
    computed: {
      isValid(){
        return this.editedItem.mail == '';
      }
    },
    async mounted() {
      await this.init();
    }
  }
</script>

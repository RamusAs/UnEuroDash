<template>
  <v-container
    id="categories"
    fluid
    tag="section"
  >
    <v-row dense>
      <v-col cols="12" sm="3">
        <v-text-field
          v-model="search"
          label="Search Categories"
          outlined
          dense
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <base-material-card
      icon="mdi-clipboard-text"
      title="CATEGORIES"
      class="px-5 py-3"
      
    >
      
      <v-btn
        color="primary"
        dark
        absolute
        top right
        @click="dialog = true"
      >
        Ajouter
      </v-btn>
      
      <v-data-table
        :headers="headers"
        :items="categories"
        :search="search"
        sort-by="name"
        class="elevation-1"
      >
        <template v-slot:item.actions="{ item }">
          <v-icon
            color="info"
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            color="red"
            @click="deleteItem(item)"
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
          >
            Refresh
          </v-btn>
        </template>
        
      </v-data-table>
    </base-material-card>

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
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="editedItem.name"
                  :rules="[v => v.length > 2 || 'Min 3 characters']"
                  label="Catégorie"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="close()"
          >
            Annuler
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="!IsValid"
            @click=" editedIndex === -1 ? create(editedItem) : update(editedItem)"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogDelete" max-width="500px">
      <v-card>
        <v-card-title class="headline">Are you really want to delete this item?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete()">Cancel</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm( editedItem )">OK</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="py-3" />
  </v-container>
</template>


<script>
  import axios from 'axios';
  import * as apiCat from '../../api/categorie';
  export default {
    data() {
      return {
        dialog: false,
        dialogDelete: false,
        search:'',
        headers: [
        {
          text: 'Catégorie',
          align: 'start',
          sortable: false,
          value: 'name',
        },
        { 
          text: 'Créée le:',
          value: 'createdAt',
          align: 'center',
        },
        {
          text: 'Actions',
          value: 'actions',
          sortable: false,
          align: 'end',
        },
        ],
        categories: [],
        editedIndex: -1,
        editedItem: {
          name: ''
        },
        defaultItem: {
          name: ''
        }
      }
    },
    methods: {

      editItem (item) {
        this.editedIndex = this.categories.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
      deleteItem (item) {
        this.editedIndex = this.categories.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm ( item ) {
        this.closeDelete();
        this.delete(item);
      },
      async delete( item ){
        await apiCat.deleteMany([item.id,]);
        await this.init();
      },
      async create( item ){
        try {
          
          await apiCat.create(item);
        } catch (error) {
          consol.log(error);
        }
        await this.init();
        this.dialog = false;
      },
      async update( item ){
        try {
          await apiCat.update( item );
        } catch (error) {
          console.log(error);
        }
        await this.init();
        this.dialog = false;
      },
      async init() {
        try {
          const resCat = await apiCat.getAll();
          this.categories = resCat.data.data;
        } catch (error) {
          console.log(error);
        }
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
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      IsValid () {
        return this.editedItem.name.length >= 3;
      }
    },
    async mounted() {
      await this.init();
    }
  }
</script>

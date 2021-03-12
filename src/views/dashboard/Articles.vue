<template>
  <v-container
    id="regular-tables"
    fluid
    tag="section"
  >
    <v-row dense>
      <v-col
        cols="12"
        sm="6"
        class="pl-6 pt-6">
      </v-col>
      <v-col
       cols="12"
       sm="3"
      >
        <v-text-field
          v-model="search"
          label="Search Articles"
          outlined
          dense
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
        ></v-text-field>
      </v-col>
      <v-col
        cols="12"
        sm="3"
      >
        <v-select
          class="pa-0" 
          label="Catégories :"
          :items="categories"
          :item-text="'name'"
          :item-value="'name'"
          v-model="selectCat"
          style="margin-bottom: -20px;"
          outlined
          dense
        />
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <base-material-card
      icon="mdi-clipboard-text"
      title="ARTICLES"
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
        :items="articlesFilter"
        :search ="search"
        sort-by="title"
        class="elevation-1">
        <template v-slot:item.img="{ item }">
          <v-img aspect-ratio="1" :src="item.img"/>
        </template>
        <template v-slot:item.cat="{ item }">
          <v-chip
            color="blue"
            dark
          >
            {{ item.cat }}
          </v-chip>
        </template>
        <template class="row" v-slot:item.actions="{ item }" >
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
        
        <template v-slot:item.createdAt="{ item }">
          <p>{{new Date(item.createdAt).toLocaleDateString(undefined)}}</p>
        </template>
        <template v-slot:no-data>
          <p>No Data Available</p>
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
                cols="6"
              >
                <v-text-field
                  v-model="editedItem.title"
                  :rules="[v => v.length > 2 || 'Min 3 characters']"
                  label="Article name"
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"
              >
                <v-text-field
                  v-model="editedItem.desc"
                  label="Description"
                ></v-text-field>
              </v-col>
              <v-col
                cols="6"
              ><v-select
                  class="pa-0" 
                  label="Catégories :"
                  :items="categories"
                  :item-text="'name'"
                  :item-value="'id'"
                  v-model="editedItem.idCat"
                  style="margin-bottom: -20px;"
                  outlined
                  dense
                />
              </v-col>
              <v-col
                cols="6"
              ><v-select
                  class="pa-0" 
                  label="Etat :"
                  :items="etats"
                  v-model="editedEtat"
                  style="margin-bottom: -20px;"
                  outlined
                  dense
                />
              </v-col>
              <v-col
                cols="6"
              > 
                <div ></div>
                <v-img
                  v-if="imgSrc"
                  :src="imgSrc"
                  aspect-ratio="2"
                  @click="inputImg()"
                >

                </v-img>
                <v-btn
                  v-else
                  id="img-result"
                  class="mx-2"
                  fab
                  dark
                  color="primary"
                  @click="inputImg()"
                >
                  <v-icon dark>
                    mdi-image-plus
                  </v-icon>
                </v-btn>
              </v-col>
              <!-- <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="editedItem.carbs"
                  label="Carbs (g)"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  v-model="editedItem.protein"
                  label="Protein (g)"
                ></v-text-field>
              </v-col> -->
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
        <v-card-title class="headline">Voulez vous réellement supprimer cet article?</v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="closeDelete()">Annuler</v-btn>
          <v-btn color="blue darken-1" text @click="deleteItemConfirm(editedItem)">Supprimer</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>
 
    <div class="py-3" />
  </v-container>
</template>

<script>
  import * as apiArt from '../../api/article'
  import * as apiCat from '../../api/categorie'
  import { uploadFile } from '../../api/img'
  import { dataURItoFile } from '../../services/index'

  export default {
    data() {
        return {
          imgSrc:'',
          dialog: false,
          dialogDelete: false,
          search: '',
          selectCat: 'All',
          articles: [],
          categories: [],
          etats: [ 'Piteux', 'Délicat', 'Convenable', 'Neuf', 'Exquis'],          
          headers: [
          {
            text: 'Image',
            align: 'start',
            value: 'img',
          },
          {
            text: 'Article',
            align: 'center',
            value: 'title',
          },
          { 
            text: 'Description',
            value: 'desc',
            align: 'center',
            sortable: false,
          },
          { 
            text: 'Catégorie',
            value: 'cat',
            align: 'center',
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
            align: 'center',
          },
          ],
          editedIndex: -1,
          editedEtat: null,
          editedItem: {
            idCat: undefined,
            title: '',
            img: '',
            etat: null,
            desc: '',
            authorContact: 'uneuro@contact.fr'
          },
          defaultItem: {
            idCat: undefined,
            title: '',
            img: '',
            etat: null,
            desc: '',
          },
          imgSrc:'',
        }
    },
    methods: {
      editItem (item) {
        this.editedIndex = this.articles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.imgSrc = this.editedItem.img
        this.dialog = true
      },
      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.imgSrc = ''
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
        this.editedIndex = this.articles.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

      deleteItemConfirm ( item ) {
        this.closeDelete();
        this.delete(item);
      },
      async delete( item ){
        await apiArt.deleteMany([item.id,]);
        await this.init();
      },
      async create( item ){
        try {
          if (this.imgSrc && this.imgSrc.includes('data:image')) {
            const file = dataURItoFile(this.imgSrc);
            const res = await uploadFile(file, 'article');
            console.log(res.data.data.url)
            this.editedItem.img = res.data.data.url;
            this.editedItem.etat = this.etats.indexOf(this.editedEtat)+1;
            await apiArt.create(item);
          }
          await this.init();
        } catch (error) {
          console.log(error)
        }
        
        this.dialog = false;
      },
      async update( item ){
        try {
          const file = dataURItoFile(this.imgSrc);
          const res = await uploadFile(file, 'article');
          this.editedItem.img = res.data.data.url;
          await apiArt.update( item );
        } catch (error) {
          console.log(error);
        }
        await this.init();
        this.dialog = false;
      },
      inputImg(){
        var uploader = document.createElement('input'),
        
        image = document.getElementById('img-result');

        uploader.type = 'file';
        uploader.accept = 'image/*';
        uploader.click();
      
        uploader.onchange = () => {
          var reader = new FileReader();
          reader.onload = (evt) => {
            this.imgSrc =  evt.target.result ;

          }
          reader.readAsDataURL(uploader.files[0]);
        }
      },
      async init() {
        try {
          const resArt = await apiArt.getAll();
          this.articles = resArt.data.data;
          const resCat = await apiCat.getAll();
          this.categories = resCat.data.data;
        } catch (error) {
          console.log(error)
        }
      },
      
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
      articlesFilter(){
        if(this.selectCat === 'All'){
          return this.articles
        }
        return this.articles.filter(product => product.cat === this.selectCat)
      },
      formTitle () {
        return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
      },
      IsValid () {
        return this.editedItem.title.length >= 3;
      }
    },
    async mounted() {
      await this.init();
    }
  }
</script>

<style>

</style>

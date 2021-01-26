<template>
  <v-container fluid>
    <v-row dense>
      <v-col cols="8" sm="3">
        <v-text-field
          v-model="search"
          label="Rechercher un article"
          outlined
          dense
          hide-details
          clearable
          clear-icon="mdi-close-circle-outline"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-divider></v-divider>

      
      <v-btn
        color="primary"
        dark
        absolute
        top right
        @click="dialog = true"
      >
        Ajouter
      </v-btn>
      <v-row dense>
        <v-col
          class="col-sm-4 col-xs-6"
          v-for="item in articles"
          :key="item.id"
        >
          <v-card>
            <v-img
              :src="item.img"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="200px"
            >
              <v-card-title v-text="item.title"></v-card-title>
            </v-img>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon  :to="'/blog/' + item.id">
                <v-icon color="success">mdi-eye</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon color="info"  @click="editItem (item)">mdi-pen</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon 
                  color="primary"
                  @click="deleteItem(item)"
                >
                  mdi-delete
                </v-icon>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>

      <v-dialog
        v-model="dialog"
        max-width="600px"
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
                  align="center"
                > 
                  <div ></div>
                  <v-img
                    v-if="imgSrc"
                    :src="imgSrc"
                    :aspect-ratio="16/9" 
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
                <v-col
                  cols="6"
                >
                  <v-text-field
                    v-model="editedItem.title"
                    :rules="[v => v.length > 2 || 'Min 3 characters']"
                    label="Titre de l'article"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="6"
                >
                  <v-text-field
                    v-model="editedItem.subtitle"
                    label="Sous titre"
                  ></v-text-field>
                </v-col>
                <v-col
                  cols="12"
                >
                  <v-textarea
                    outlined
                    name="texte"
                    label="Texte de l'article"
                    v-model="editedItem.texte"
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
    </v-container>
</template>

<script>
  import * as Blog from '@/api/blog';
  import { uploadFile } from '../../api/img'
  import { dataURItoFile } from '../../services/index'

export default {
  data() {
    return{
      dialog: false,
      dialogDelete: false,
      articles:[],
      imgSrc: '',
      editedIndex: -1,
      editedItem: {
        title: '',
        img: '',
        subtitle: '',
        texte: '',
      },
      defaultItem: {
        title: '',
        img: '',
        subtitle: '',
        texte: '',
      }
    }
  },
  methods: {
    async initData(){
      try {
        const resArt = await Blog.getAll();
        this.articles = resArt.data.data;
      } catch (error) {
        console.log(error);
      }
    },
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
      await Blog.deleteMany([item.id,]);
      await this.initData();
    },
    async create( item ){
      try {
        if (this.imgSrc && this.imgSrc.includes('data:image')) {
          const file = dataURItoFile(this.imgSrc);
          const res = await uploadFile(file, 'article');
          console.log(res.data.data.url)
          this.editedItem.img = res.data.data.url;
          await Blog.create(item);
        }
        await this.initData();
      } catch (error) {
        console.log(error)
      }
      this.dialog = false;
    },
    async update( item ){
      try {
        await Blog.update( item );
      } catch (error) {
        console.log(error);
      }
      await this.initData();
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
      return this.editedIndex === -1 ? 'Ajouter un article' : 'Modifier un article'
    },
    IsValid () {
      return this.editedItem.title.length >= 3;
    }
  },
  
  async mounted(){
    await this.initData();
  }
  
}
</script>

<style>

</style>
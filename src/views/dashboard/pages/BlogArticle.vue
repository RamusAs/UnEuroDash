<template>
  <v-container
    id="user-profile"
    fluid
    tag="section"
  >
    <v-row dense>
      <v-col cols="8" sm="3">
        <v-btn icon  to="/blog/">
            <v-icon color="primary"> mdi-arrow-left-bold-outline </v-icon>
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center">
        <v-col>
            <v-card>
                <v-img
                    max-height="400"
                    contain
                    :src="article.img"
                ></v-img>

                <v-card-title> {{article.title}} </v-card-title>

                <v-card-text>
                <v-row
                    align="center"
                    class="mx-0"
                >
                    <v-rating
                    :value="4.5"
                    color="amber"
                    dense
                    half-increments
                    readonly
                    size="14"
                    ></v-rating>

                    <div class="grey--text ml-4">
                    4.5 (413)
                    </div>
                </v-row>

                <div class="my-4 subtitle-1">
                    • {{article.subtitle}}
                </div>

                <div>
                    <p>
                        {{article.texte}}
                    </p>
                </div>
                <p v-if="comment.length" class="body-1	font-weight-light pt-10"><b>{{comment.length}} COMMENTS</b></p>

                <v-card
                    :outlined="false"
                    :elevation="0"
                >
                    <v-card-text
                        v-for="(item, i) in comment.slice(0,3)"
                        :key="i"
                        inactive="true"
                        class="pa-0"                    
                    >
                        <p> <b>{{ item.name }}</b>  {{item.message}} <br> </p>
                    </v-card-text>
                    <v-expand-transition>
                        <div v-show="showExtention">
                            <v-card-text
                                v-for="(item, i) in comment.slice(4,comment.length - 1)"
                                :key="i"
                                inactive="true"
                                class="pa-0"                  
                            >
                                <p> <b>{{ item.name }}</b>  {{item.message}} <br> </p>
                            </v-card-text>
                        </div>
                    </v-expand-transition>
                    
                    <v-card-action v-if="showExtention == false && comment.length > 4" @click="showExtention = true" >
                        <v-btn
                            color="orange lighten-2"
                            text
                        >
                            Voir plus
                        </v-btn>
                    </v-card-action>
                    <v-card-action v-else @click="showExtention = false">
                        <v-btn
                            color="orange lighten-2"
                            text
                        >
                            Voir moins
                        </v-btn>
                    </v-card-action>
                </v-card>
                <h3 class="	font-weight-bold pt-10">Laissez un commentaire</h3>
                <div id="">
                    <v-form 
                        ref="form"
                        v-model="valid"
                        lazy-validation
                        class="row row-10">
                    <div class="col-12">
                        <v-textarea
                        id="textarea-state"
                        placeholder="Votre Message"
                        :rules="[v => !!v || 'Le champ du message est vide']"
                        required
                        v-model="editedItem.message"
                        outlined
                        height=100px
                        ></v-textarea>
                    </div>
                    <div class="col-12">
                        <v-btn
                        :disabled="!valid"
                        color="red darken-4 white--text"
                        @click="Create()">
                        Envoyer
                        </v-btn>
                    </div>
                    </v-form>
                </div>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import * as Blog from '@/api/blog'
    import * as CommentReq from '@/api/commentaire';
    export default {
        data(){
            return{
                showExtention: false,
                article:[],
                comment: [],
                editedItem: {
                    name: '',
                    mail: '',
                    message: '',
                    idBlog: null,
                },
            }
        },
        methods: {
            async initData() {
            try {
                this.article = (await Blog.getOne(parseInt(this.$route.params.id))).data.data;
                this.comment = (await CommentReq.getAll()).data.data
                .filter(comment => comment.idBlog == parseInt(this.$route.params.id))
            } catch (error) {
                console.log(error);
            }
            },
            async Create() {
          
            if (this.$refs.form.validate()){
                try {
                this.editedItem.idBlog = parseInt(this.$route.params.id);
                this.editedItem.name = this.article.auteur + '(auteur)';
                await CommentReq.create(this.editedItem);
                } catch (error) {
                console.log(error);
                }
                await this.initData();
                this.$refs.form.reset();
            }
            
            }
        },
        async mounted() {
            await this.initData();
        },
    }
</script>

<style>

</style>
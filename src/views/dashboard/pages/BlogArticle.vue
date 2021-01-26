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
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
  </v-container>
</template>

<script>
    import * as Blog from '@/api/blog'
    export default {
        data(){
            return{
                article:[],
            }
        },
        methods: {
            async initData() {
            try {
                this.article = (await Blog.getOne(parseInt(this.$route.params.id))).data.data;
            } catch (error) {
                console.log(error);
            }
            },
        },
        async mounted() {
            await this.initData();
        },
    }
</script>

<style>

</style>
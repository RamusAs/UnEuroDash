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
        <small>Showing 1-15 of 45 </small>
      </v-col>
      <v-col cols="12" sm="3">
        <v-select class="pa-0" label="Ordonner par :" :items="[12,24,36]" style="margin-bottom: -20px;" outlined dense/>
      </v-col>
      <v-col cols="12" sm="3">
        <v-select class="pa-0"  label="Catégories :" style="margin-bottom: -20px;" outlined dense/>
      </v-col>
    </v-row>

    <v-divider></v-divider>

    <base-material-card
      icon="mdi-clipboard-text"
      title="ARTICLES"
      class="px-5 py-3"
    >
      <v-data-table
        :headers="headers"
        :items="desserts"
        sort-by="calories"
        class="elevation-1">
        <template >
          <v-icon
            small
            class="mr-2"
            @click="editItem(item)"
          >
            mdi-pencil
          </v-icon>
          <v-icon
            small
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

    <div class="py-3" />

  </v-container>
</template>

<script>
  export default {

  }
</script>

<style>

</style>

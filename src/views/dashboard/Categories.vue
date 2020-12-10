<template>
  <v-container
    id="categories"
    fluid
    tag="section"
  >
    <v-row dense>
      <v-col cols="12" sm="3">
        <v-sheet>
          <v-text-field
            v-model="search"
            label="Search Categories"
            outlined
            dense
            hide-details
            clearable
            clear-icon="mdi-close-circle-outline"
          ></v-text-field>
        </v-sheet>
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
        :search="search"
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

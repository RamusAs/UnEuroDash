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

    <div class="row white rounded pa-4 my-3">
      <div class="col-6">
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repudiandae,
          vitae! Ea, distinctio iste eligendi esse atque veritatis iure
          repudiandae cumque at soluta praesentium recusandae non quam maiores
          animi a est?
        </p>
      </div>
      <div class="col-5" />
      <div class="col-1">
        <v-icon
          class="mr-2"
          medium
          @click="read = !read"
        >
          mdi-pencil
        </v-icon>
        <v-icon>
          mdi-delete
        </v-icon>
      </div>
    </div>
  </v-container>
</template>

<script>
  export default {
    name: 'Message',

    data: () => ({
      read: false,
    }),
  }
</script>

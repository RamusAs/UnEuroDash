<template>
  <v-footer
    id="dashboard-core-footer"
    padless
  >
    <v-container>
        <v-spacer class="hidden-sm-and-down" />

          <div class="body-1 font-weight-light pt-6 pt-md-0 text-center">
            &copy; {{new Date().getFullYear()}}, made with
            <v-icon size="18">
              mdi-heart
            </v-icon>
            by <a>Bang Bang Team</a> for a better web for UP.
          </div>
    </v-container>
  </v-footer>
</template>

<script>
  export default {
    name: 'DashboardCoreFooter',

    data: () => ({

    }),
  }
</script>

<style lang="sass">

</style>

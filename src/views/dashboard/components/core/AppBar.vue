<template>
  <v-app-bar
    id="app-bar"
    absolut
    app
    :color="$vuetify.theme.dark ? '#121212e0' : '#eeee'"
    flat
    height="75"
    elevate-on-scroll
    scroll-target="#scrolling-techniques-7"
  >
    <v-btn
      class="mr-3"
      elevation="1"
      fab
      small
      @click="setDrawer(!drawer)"
    >
      <v-icon v-if="value">
        mdi-view-quilt
      </v-icon>

      <v-icon v-else>
        mdi-dots-vertical
      </v-icon>
    </v-btn>

    <v-toolbar-title
      class="hidden-sm-and-down font-weight-light"
      v-text="$route.name"
    />

    <v-spacer />

    <v-text-field
      :label="$t('search')"
      color="secondary"
      hide-details
      style="max-width: 165px"
    >
      <template
        v-if="$vuetify.breakpoint.mdAndUp"
        v-slot:append-outer
      >
        <v-btn
          class="mt-n2"
          elevation="1"
          fab
          small
        >
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
      </template>
    </v-text-field>

    <div class="mx-3" />

      <v-switch
        class="mt-4 mb-0"
        v-model="$vuetify.theme.dark"
        :label="$vuetify.theme.dark ? 'Light mode' : 'Dark Mode'"
      />

    <v-menu
      bottom
      left
      offset-y
      :close-on-content-click="false"
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ attrs, on }">
        <v-btn
          class="ml-2"
          min-width="0"
          text
          v-bind="attrs"
          v-on="on"
        >
        
          <v-icon>mdi-bell</v-icon>
          <v-badge
            v-if="notifications.length"
            color="red"
            overlap
            bordered
            class="mb-6"
          >
            <template v-slot:badge >
              <span>{{ notifications.length }}</span>
            </template>
          </v-badge>
        </v-btn>
      </template>

      <v-list
        :tile="false"
        nav
      >
        <div >
          <app-bar-item v-if="!notifications.length">
            <v-list-item-title>
              Vous n'avez aucune nouvelle notification
            </v-list-item-title>
          </app-bar-item>
          <app-bar-item
            v-for="item in notifications"
            :key="item.id"
          >
            <v-list-item-title>
              {{ item.notification }}
            </v-list-item-title>
            <v-list-item-action @click="supp(item)">
              x
            </v-list-item-action>
          </app-bar-item>
        </div>
      </v-list>
    </v-menu>

    <v-btn
      class="ml-2"
      min-width="0"
      text
      to="/pages/user"
    >
      <v-icon>mdi-account</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
// Components
  import { VHover, VListItem } from 'vuetify/lib'

  // Utilities
  import { mapState, mapMutations } from 'vuex'
  import * as NotifReq from '@/api/notification'

  export default {
    name: 'DashboardCoreAppBar',
    components: {
      AppBarItem: {
        render (h) {
          return h(VHover, {
            scopedSlots: {
              default: ({ hover }) => {
                return h(
                  VListItem,
                  {
                    attrs: this.$attrs,
                    class: {
                      'black--text': !hover,
                      'white--text secondary elevation-12': hover,
                    },
                    props: {
                      activeClass: '',
                      dark: hover,
                      link: true,
                      ...this.$attrs,
                    },
                  },
                  this.$slots.default,
                )
              },
            },
          })
        },
      },
    },

    props: {
      value: {
        type: Boolean,
        default: false,
      },
    },

    data: () => ({
      notifications: [],
    }),

    computed: {
      ...mapState(['drawer']),
    },

    methods: {
      ...mapMutations({
        setDrawer: 'SET_DRAWER',
      }),
      supp (item){
        this.delete(item)
      },
      async delete( item ){
        await NotifReq.deleteMany([item.id,]);
        await this.initData();
      },
      async initData() {
        try {
          const not = await NotifReq.getAll();
          this.notifications = not.data.data
        } catch (error) {
          console.log(error)
        }
      }
    },

    async mounted () {
      await this.initData()
    }
  }
</script>

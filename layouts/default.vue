<template>
  <v-app dark>
    <v-app-bar fixed app>
      <v-row>
        <v-col cols="12">
          <div class="d-flex align-center">
            <div class="logo d-none d-md-flex">
              <v-img src="/img/logo.png" contain />
            </div>
            <div class="logo-small d-sm-flex d-md-none">
              <v-img src="/img/logo-small.png" contain />
            </div>
            <v-spacer v-if="isDetail" />
            <div v-else class="flex-grow-1 flex-shrink-0 mx-4">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                dense
                hide-details=""
                label="Cari Barang"
                single-line
                outlined
                clearable
              />
            </div>
            <div class="flex-grow-0 flex-shrink-1">
              <div class="d-none d-md-flex">
                <v-btn class="mr-2" color="primary" outlined>Masuk</v-btn>
                <v-btn dense color="primary">Daftar</v-btn>
              </div>
              <div class="d-sm-flex d-md-none">
                <v-menu rounded="lg" offset-y>
                  <template #activator="{ attrs, on }">
                    <v-btn v-bind="attrs" color="primary" v-on="on">
                      <v-icon>mdi-menu</v-icon>
                    </v-btn>
                  </template>
                  <v-list dense>
                    <v-list-item link>
                      <v-list-item-icon>
                        <v-icon v-text="`mdi-login`" />
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="`Masuk`" />
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item link>
                      <v-list-item-icon>
                        <v-icon v-text="`mdi-account-plus`" />
                      </v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title v-text="`Daftar`" />
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main class="container-bg">
      <v-container fluid >
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
// import { VMenu, VList, VListItem } from 'vuetify/lib'
export default {
  name: 'DefaultLayout',
  // components: { VMenu, VList, VListItem },
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  computed: {
    search: {
      get() {
        return this.$store.state.products.search
      },
      set(newValue) {
        this.$store.commit('products/setSearch', newValue)
      },
    },
    isDetail() {
      return this.$route.path.includes('product')
    },
  },
}
</script>
<style lang="scss">
.logo {
  height: 40px;
  width: 175.4px;
  &-small {
    width: 40px;
  }
}
.container-bg {
  background-image: url(https://evermos.com/reg/wp-content/uploads/2022/03/Background-Header-Home-Page-01-1.png);
  background-position: center center;
  background-size: cover;
}
</style>

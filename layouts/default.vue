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
            <div class="flex-grow-1 flex-shrink-0 mx-4">
              <v-text-field
                append-icon="mdi-magnify"
                dense
                hide-details=""
                label="Outlined"
                single-line
                outlined
              />
            </div>
            <div class="flex-grow-0 flex-shrink-1">
              <div class="d-none d-md-flex">
                <v-btn class="mr-2" color="primary" outlined>Masuk</v-btn>
                <v-btn dense color="primary">Daftar</v-btn>
              </div>
              <div class="d-sm-flex d-md-none">
                <v-btn icon color="primary">
                  <v-icon>mdi-menu</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
        </v-col>
      </v-row>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer :absolute="!fixed" app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
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
</style>

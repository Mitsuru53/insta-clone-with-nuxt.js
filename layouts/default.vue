<template>
  <v-app>
    <appHeader :fixed="!fixed"/>

    <v-content style="padding-top:32px">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-content>

    <appFooter :fixed="fixed" />

    <v-footer :fixed="fixed" app>
      <span>&copy; 2018 Mitsuru Hashimoto</span>
    </v-footer>
  </v-app>
</template>

<script>
import appHeader from './../components/AppHeader'
import appFooter from './../components/AppFooter'

export default {
  data() {
    return {
      fixed: false,
    }
  },
  components: {
    appHeader,
    appFooter
  }
}
</script>

<template>
  <v-toolbar dense :fixed="fixed" mb-3>
    <nuxt-link to="/" tag="span">
      <v-btn icon>
        <v-icon medium>photo_camera</v-icon>
      </v-btn>
    </nuxt-link>
    <nuxt-link to="/" tag="span">
      <v-toolbar-title>Minsta</v-toolbar-title>
    </nuxt-link>

    <v-spacer></v-spacer>
    <v-btn icon>
      <v-icon medium>search</v-icon>
    </v-btn>
    <v-btn icon>
      <v-icon medium>favorite_border</v-icon>
    </v-btn>
    <v-btn icon>
      <nuxt-link to="/posts" tag="span">
        <v-icon medium>add_to_photos</v-icon>
      </nuxt-link>
    </v-btn>
    <v-btn icon>
      <nuxt-link to="/signup" tag="span">
        <v-icon medium>person_outline</v-icon>
      </nuxt-link>
    </v-btn>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    fixed: {
      type: Boolean,
      required: true,
      default: true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>

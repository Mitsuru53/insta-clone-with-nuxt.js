<template>
  <v-footer :fixed="fixed" app>
    <span>&copy; 2018 Mitsuru Hashimoto</span>
  </v-footer>
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

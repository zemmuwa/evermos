<template>
  <v-dialog
    v-model="isOpenController"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    ><v-card color="black" class="d-flex justify-center align-center">
      <v-btn
        class="close-button"
        color="white"
        icon
        @click="isOpenController = false"
        ><v-icon>mdi-close</v-icon></v-btn
      >
      <div class="content">
        <v-img height="90vh" :src="image" contain />
      </div>
      <!-- <v-btn class="close-button" color="error" icon
          ><v-icon>mdi-close</v-icon></v-btn
        > -->
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: '',
    },
  },
  computed: {
    isOpenController: {
      get() {
        return this.isOpen
      },
      set(value) {
        this.$emit('update:isOpen', value)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 100;
}
</style>

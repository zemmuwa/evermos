<template>
  <v-hover v-slot="{ hover }" open-delay="200">
    <v-card :elevation="hover ? 16 : 2" class="product-card clickable" @click="$router.push(`/product/${data.id}`)">
      <div class="product-card-image d-flex mb-2">
        <v-img :src="data.thumbnail" />
      </div>
      <div class="product-content mx-2">
        <p class="product-card-title mb-1">{{ data.title }}</p>
        <p class="font-weight-bold mb-1">$ {{ formatMoney(discountPrice) }}</p>
        <div class="d-flex mb-1 align-center">
          <v-chip color="error" small label
            >{{ data.discountPercentage }}%</v-chip
          >
          <span
            class="text-decoration-line-through font-weight-thin ml-1 caption align-center"
            >$ {{ formatMoney(data.price) }}</span
          >
        </div>
        <div class="d-flex align-center">
          <v-icon small color="#ffc400">mdi-star</v-icon
          ><span class="caption align-center">{{ data.rating }}</span>
        </div>
      </div>
    </v-card>
  </v-hover>
</template>

<script>
import tools from '~/mixins/tools'
export default {
  mixins: [tools],
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    discountPrice() {
      return (
        this.data.price - (this.data.price * this.data.discountPercentage) / 100
      )
    },
  },
}
</script>
<style lang="scss" scoped>
.product-card {
  &-image {
    height: 200px;
  }
  .product-content {
    height: 120px;
  }
  &-title {
    margin: 0px;
    padding: 0px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* number of lines to show */
    line-clamp: 2;
    -webkit-box-orient: vertical;
    line-height: 1rem;
  }
}
</style>

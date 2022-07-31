<template>
  <v-container>
    <v-row>
      <v-col v-if="!productLoading" cols="12" md="4">
        <v-carousel
          v-model="carouselController"
          class="rounded"
          interval="2000"
          cycle
          hide-delimiters
          :show-arrows="false"
        >
          <v-carousel-item
            v-for="(imageCarousel, index) in product?.images"
            :key="`carousel${index}`"
            :src="imageCarousel"
            reverse-transition="slide-x-reverse-transition"
            transition="slide-x-transition"
          />
        </v-carousel>
        <v-row class="mt-2">
          <v-col
            v-for="(image, index) in product?.images"
            :key="`image${index}`"
            cols="3"
          >
            <v-img
              :class="`rounded clickable${
                index == carouselController ? ' img-active' : ''
              }`"
              :aspect-ratio="4 / 3"
              :src="image"
              @click="openModal(image)"
            />
          </v-col>
        </v-row>
      </v-col>
      <v-col v-else cols="12" md="4">
        <v-skeleton-loader type="image"></v-skeleton-loader>
        <v-row class="mt-2">
          <v-col v-for="(loader, index) in 4" :key="`loader${index}`" cols="3">
            <v-skeleton-loader type="image" height="80px"></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="8">
        <v-card v-if="!productLoading" class="pa-4">
          <p class="font-weight-bold text-h5">{{ product?.title }}</p>
          <div class="d-flex align-center mb-2">
            <v-icon color="#ffc400">mdi-star</v-icon
            ><span class="align-center">{{ product?.rating }}</span>
          </div>
          <p class="font-weight-bold mb-1 text-h5">
            $ {{ formatMoney(discountPrice) }}
          </p>
          <div class="d-flex mb-1 align-center mb-2">
            <v-chip color="error" label
              >{{ product?.discountPercentage }}%</v-chip
            >
            <span
              class="text-decoration-line-through font-weight-thin ml-1 align-center"
              >$ {{ formatMoney(product?.price) }}</span
            >
          </div>
          <p class="mb-2">Stok : {{ formatMoney(product?.stock, 0) }}</p>
          <v-divider />
          <p class="text-subtitle-1">Deskripsi</p>
          <p class="text-subtitle-2">{{ product?.description }}</p>
          <p class="text-subtitle-2">Brand : {{ product?.brand }}</p>
          <p class="text-subtitle-2 mb-2">Kategori : {{ product?.category }}</p>
          <v-divider class="mb-2" />

          <v-row class="">
            <v-col cols="6">
              <v-btn block outlined color="primary">+ Keranjang</v-btn>
            </v-col>
            <v-col cols="6">
              <v-btn block color="primary">Beli Langsung</v-btn>
            </v-col>
          </v-row>
        </v-card>
        <v-skeleton-loader
          v-else
          type="card-avatar, article, actions"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
    <image-dialog :image="modalImage" :is-open.sync="isOpenModal" />
  </v-container>
</template>

<script>
import ImageDialog from '~/components/ImageDialog.vue'
import tools from '~/mixins/tools'

export default {
  components: { ImageDialog },
  mixins: [tools],
  data() {
    return {
      carouselController: 0,
      isOpenModal: false,
      modalImage: '',
    }
  },
  computed: {
    product() {
      return this.$store.state.product.data
    },
    productLoading() {
      return this.$store.state.product.loading
    },
    discountPrice() {
      return (
        this.product?.price -
        (this.product?.price * this.product?.discountPercentage) / 100
      )
    },
  },
  mounted() {
    this.getProduct()
  },
  methods: {
    getProduct() {
      this.$store.dispatch('product/fetch', this.$route.params.id)
    },
    openModal(image) {
      this.modalImage = image
      this.isOpenModal = true
    },
  },
}
</script>
<style lang="scss" scoped>
.img-active {
  border: 2px solid #004751;
}
</style>

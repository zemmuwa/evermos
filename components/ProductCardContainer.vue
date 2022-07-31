<template>
  <v-row v-if="!productLoading && products.length > 0">
    <v-col
      v-for="(product, index) in products"
      :key="`product-${index}`"
      cols="6"
      md="4"
      lg="3"
    >
      <product-card :data="product" />
    </v-col>

    <v-col cols="12">
      <div class="text-center">
        <v-pagination v-model="page" :length="totalPage" circle></v-pagination>
      </div>
    </v-col>
  </v-row>
  <v-row v-else-if="productLoading">
    <v-col
      v-for="(loader, index) in 12"
      :key="`loader-${index}`"
      cols="6"
      md="4"
      lg="3"
    >
      <v-skeleton-loader
        class="mx-auto"
        type="card"
        height="328"
      ></v-skeleton-loader>
    </v-col>
  </v-row>
  <div v-else-if="!isInit" class="d-flex justify-center no-data-container align-center">
    <v-row no-gutters>
      <v-col class="d-flex justify-center mb-2" cols="12">
        <v-icon size="60" color="primary">mdi-emoticon-sad-outline</v-icon>
      </v-col>
      <v-col cols="12">
        <p class="h6 text-center" color="primary">
          Product yang kamu cari belum tersedia
        </p>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import ProductCard from '~/components/ProductCard.vue'

export default {
  components: { ProductCard },
  data() {
    return {
      page: 1,
      limit: 12,
      isInit:true
    }
  },
  computed: {
    productSearch() {
      return this.$store.state.products.search
    },
    selectedCategories() {
      return this.$store.state.categories.selected
    },
    minPrice() {
      return this.$store.state.products.minPrice
    },
    maxPrice() {
      return this.$store.state.products.maxPrice
    },
    productLoading() {
      return this.$store.state.products.loading
    },
    products() {
      let data = this.$store.state.products.list
      if (this.productSearch) {
        data = data.filter((v) =>
          v.title.toLowerCase().includes(this.productSearch.toLowerCase())
        )
      }
      if (this.selectedCategories)
        data = data.filter(
          (v) =>
            v.category.toLowerCase() === this.selectedCategories.toLowerCase()
        )
      if (this.minPrice)
        data = data.filter((v) => {
          const price = v.price - (v.price * v.discountPercentage) / 100
          return price >= this.minPrice
        })
      if (this.maxPrice)
        data = data.filter((v) => {
          const price = v.price - (v.price * v.discountPercentage) / 100
          return price <= this.maxPrice
        })
      return data.slice((this.page - 1) * this.limit, this.limit * this.page)
    },
    totalPage() {
      let data = this.$store.state.products.list
      if (this.productSearch) {
        data = data.filter((v) =>
          v.title.toLowerCase().includes(this.productSearch.toLowerCase())
        )
      }
      if (this.selectedCategories)
        data = data.filter(
          (v) =>
            v.category.toLowerCase() === this.selectedCategories.toLowerCase()
        )
      return Math.ceil(data.length / this.limit)
    },
  },
  watch: {
    productSearch() {
      this.page = 1
    },
  },
  mounted() {
    this.isInit = false
    if (this.products.length === 0) {
      this.getProduct()
    }
  },
  methods: {
    getProduct() {
      this.$store.dispatch('products/fetch')
    },
  },
}
</script>

<style lang="scss" scoped>
.no-data-container {
  height: 50vw;
}
</style>

<template>
  <v-card class="pa-2 pa-md-4">
    <div class="category d-none d-md-block">
      <p class="font-weight-bold">Kategori</p>
      <template v-if="!categoriesLoading">
        <div
          v-for="(category, index) in categories"
          :key="index"
          :class="`clickable item pa-2 mt-2 ${
            selectedCategories == category ? 'selected' : ''
          }`"
          @click="() => setSelectedCategories(category)"
        >
          <p class="list ml-4">{{ category }}</p>
        </div>
      </template>
      <template v-else>
        <v-skeleton-loader
          v-for="(loader, index) in 6"
          :key="`loader${index}`"
          type="list-item"
        ></v-skeleton-loader>
      </template>
    </div>
    <div class="category d-sm-block d-md-none">
      <p class="font-weight-bold mb-2">Kategori</p>
      <v-select
        v-model="selectedCategories"
        hide-details=""
        dense
        :items="categories"
        outlined
      ></v-select>
    </div>
    <div class="price mt-2">
      <p class="font-weight-bold mb-2">Harga</p>
      <v-text-field
        v-model="minPrice"
        prepend-icon="mdi-currency-usd"
        dense
        hide-details
        label="Harga Minimum"
        single-line
        outlined
        clearable
        @keypress="numberOnly"
      />
      <v-text-field
        v-model="maxPrice"
        class="mt-2"
        prepend-icon="mdi-currency-usd"
        dense
        hide-details
        label="Harga Maximum"
        single-line
        outlined
        clearable
        @keypress="numberOnly"
      />
    </div>
  </v-card>
</template>

<script>
import tools from '~/mixins/tools'
export default {
  mixins: [tools],
  computed: {
    categoriesLoading() {
      return this.$store.state.categories.loading
    },
    categories() {
      return this.$store.state.categories.list
    },
    minPrice: {
      get() {
        return this.$store.state.products.minPrice
      },
      set(value) {
        this.$store.commit('products/setMinPrice', value)
      },
    },
    maxPrice: {
      get() {
        return this.$store.state.products.maxPrice
      },
      set(value) {
        this.$store.commit('products/setMaxPrice', value)
      },
    },
    selectedCategories: {
      get() {
        return this.$store.state.categories.selected
      },
      set(value) {
        this.$store.commit('categories/setSelected', value)
      },
    },
  },
  mounted() {
    if (this.categories.length === 0) {
      this.getCategory()
    }
  },
  methods: {
    getCategory() {
      this.$store.dispatch('categories/fetchCategories')
    },
    setSelectedCategories(categories) {
      if (this.selectedCategories === categories)
        this.$store.commit('categories/setSelected', null)
      else this.$store.commit('categories/setSelected', categories)
    },
  },
}
</script>
<style lang="scss" scoped>
@import '~/assets/variables';
.category {
  .item {
    border-radius: 10px;
    &:hover {
      background-color: #eaf6f8;
    }
    &.selected {
      background-color: #004751;
      color: white;
    }
  }
}
</style>

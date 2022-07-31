<template>
  <v-row>
    <v-col cols="12" md="3">
      <filter-card />
    </v-col>
    <v-col cols="12" md="9">
      <product-card-container />
    </v-col>
  </v-row>
</template>

<script>
import FilterCard from '~/components/FilterCard.vue'
import ProductCardContainer from '~/components/ProductCardContainer.vue'
export default {
  name: 'IndexPage',
  components: { FilterCard, ProductCardContainer },
  data() {
    return {
      selectedCategory: 0,
    }
  },
}
</script>

<script>
import { mapState, mapActions } from 'pinia'
import { useCustomerStore, useCuisineStore, useBookmarkStore } from '../stores/main'

export default {
  computed: {
    ...mapState(useCuisineStore, ['cuisineDetail']),
    ...mapState(useCustomerStore, ['isLogin']),
    priceFormat() {
      return this.cuisineDetail.price.toLocaleString('id-ID')
    }
  },
  methods: {
    ...mapActions(useCuisineStore, ['getCuisinesDetail']),
    ...mapActions(useBookmarkStore, ['addToBookmark']),
    async fetchCuisinesDetail() {
      try {
        let id = this.$route.params.id
        await this.getCuisinesDetail(id)
      } catch (error) {
        console.log(error)
      }
    },
    async addCuisineToBookmark() {
      try {
        await this.addToBookmark(this.$route.params.id)
      } catch (error) {
        console.log(error)
      }
    },
  },

  onMounted() {
    this.priceFormat()
  },

  created() {
    this.fetchCuisinesDetail()
  }
}
</script>

<template>
  <!-- Left column container with background-->
  <div class="flex flex-wrap justify-evenly items-center">
    <div class="relative">
      <img :src="cuisineDetail.imgUrl" class="w-full h-full" />
    </div>

    <!-- Right column container -->
    <div class="">
      <div class="group w-full p-5 m-5">
        <div class="flex justify-between text-lg text-black dark:text-white">
          <p>{{ cuisineDetail.name }}</p>
          <p>Rp{{ priceFormat }}</p>
        </div>
        <p class="text-black dark:text-whitev">{{ cuisineDetail.description }}</p>
        <div class="flex justify-center items-center h-16">
          <v-btn
            v-if="isLogin"
            @click="addCuisineToBookmark"
            block
            color="success"
            size="large"
            type="submit"
            variant="elevated"
          >
            Add to My Bookmarks
          </v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

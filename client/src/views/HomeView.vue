<script>
import TheCard from '../components/TheCard.vue'
import { mapState, mapActions } from 'pinia'
import { useCustomerStore, useCuisineStore, useBookmarkStore } from '../stores/main'

export default {
  data() {
    return {
      page: 1,
      name: '',
      loaded: false,
      loading: false
    }
  },
  components: {
    TheCard
  },
  computed: {
    ...mapState(useCuisineStore, ['cuisines']),
    ...mapState(useBookmarkStore, ['bookmarks', 'bookmarksId']),
    ...mapState(useCustomerStore, ['isLogin'])
  },
  methods: {
    ...mapActions(useCuisineStore, ['getCuisines']),
    ...mapActions(useBookmarkStore, ['getBookmarkCuisine']),
    async fetchCuisines(page, size, name) {
      try {
        await this.getCuisines(page, size, name)
      } catch (error) {
        console.log(error)
      }
    },
    async fetchBookmark() {
      try {
        await this.getBookmarkCuisine()
      } catch (error) {
        console.log(error)
      }
    },
    onClick() {
      this.loading = true

      if (this.name === '') this.fetchCuisines()
      else this.fetchCuisines(1, null, this.name)

      setTimeout(() => {
        this.loading = false
        this.loaded = true
      }, 2000)
    }
  },

  watch: {
    bookmarks() {
      this.fetchBookmark()
    },
    page() {
      this.fetchCuisines(this.page - 1)
    }
  },

  created() {
    this.fetchCuisines(this.page - 1)
    if (this.isLogin) {
      this.fetchBookmark()
    }
  }
}
</script>

<template>
  <main>
    <div class="max-w-3xl mx-auto py-16 px-4 sm:py-24 sm:px-4 lg:max-w-7xl lg:px-2">
      <v-text-field
        :loading="loading"
        v-model="name"
        density="compact"
        variant="solo"
        label="Search Cuisine"
        append-inner-icon="mdi-magnify"
        single-line
        hide-details
        color="red"
        @click:append-inner="onClick"
      ></v-text-field>
      <v-pagination v-model="page" :length="cuisines.totalPages" rounded="circle"></v-pagination>
      <h2 class="text-2xl text-black dark:text-white font-bold">Our Menu</h2>
      <div v-if="!isLogin" class="mt-10 grid lg:grid-cols-5 gap-y-10 gap-x-6 sm:grid-cols-2">
        <TheCard v-for="cuisine in cuisines.cuisines" :key="cuisine.id" :cuisine="cuisine" />
      </div>
      <div v-else class="mt-10 grid lg:grid-cols-5 gap-y-10 gap-x-6 sm:grid-cols-2">
        <TheCard
          v-for="cuisine in cuisines.cuisines"
          :key="cuisine.id"
          :cuisine="cuisine"
          :bookmarkedCuisine="bookmarksId"
        />
      </div>
    </div>
  </main>
</template>

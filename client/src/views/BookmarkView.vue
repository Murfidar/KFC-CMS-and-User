<script>
import TheCard from '../components/TheCard.vue'
import { mapState, mapActions } from 'pinia'
import { useBookmarkStore } from '../stores/main'

export default {
  components: {
    TheCard
  },
  computed: {
    ...mapState(useBookmarkStore, ['bookmarks'])
  },
  methods: {
    ...mapActions(useBookmarkStore, ['getBookmarkCuisine']),
    async fetchBookmark() {
      try {
        await this.getBookmarkCuisine()
      } catch (error) {
        console.log(error)
      }
    }
  },

  watch: {
    bookmarks() {
      this.fetchBookmark()
    }
  },

  created() {
    this.fetchBookmark()
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-4 lg:max-w-7xl lg:px-2">
    <h2 class="text-2xl text-black dark:text-white font-bold">My Bookmarks</h2>
    <div class="mt-10 grid lg:grid-cols-5 gap-y-10 gap-x-6 sm:grid-cols-2">
      <TheCard
        v-for="bookmark in bookmarks.bookmarks"
        :key="bookmark.Cuisine.id"
        :cuisine="bookmark.Cuisine"
        :bookmark="bookmark"
      />
    </div>
  </div>
</template>

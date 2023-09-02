<script>
import { RouterLink } from 'vue-router'
import { mapState, mapActions } from 'pinia'
import { useCustomerStore, useBookmarkStore } from '../stores/main'
export default {
  props: ['cuisine', 'bookmark', 'bookmarkedCuisine'],
  components: {
    RouterLink
  },
  computed:{
    ...mapState(useCustomerStore, ['isLogin']),
  },
  methods: {
    ...mapActions(useBookmarkStore, ['addToBookmark', 'deleteBookmark']),
    async addCuisineToBookmark() {
      try {
        if (this.isLogin) {
          if (!this.bookmarkedCuisine.includes(this.cuisine.id)) {
            await this.addToBookmark(this.cuisine.id)
          } else throw 'Already add to bookmark'
        } else throw 'Not yet Login'
      } catch (error) {
        console.log(error)
      }
    },

    async deleteMyBookmark() {
      try {
        await this.deleteBookmark(this.bookmark.id)
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>

<template>
  <div class="group w-full">
    <RouterLink :to="'/details/' + cuisine.id">
      <div class="relative">
        <img
          :src="cuisine.imgUrl"
          class="w-full h-full object-center object-cover opacity-90 group-hover:opacity-100"
        />
      </div>
    </RouterLink>
    <div class="flex text-black dark:text-white justify-between text-lg">
      <p>{{ cuisine.name }}</p>
      <p>Rp{{ cuisine.price.toLocaleString('id-ID') }}</p>
    </div>
    <p class="text-black dark:text-white">{{ cuisine.description }}</p>
    <div class="flex justify-center items-center h-16">
      <v-btn
        v-if="isLogin && $route.name === 'home'"
        @click="addCuisineToBookmark"
        block
        color="success"
        size="large"
        type="submit"
        variant="elevated"
      >
        Add to My Bookmarks
      </v-btn>
      <v-btn
        v-else-if="isLogin && $route.name === 'bookmarks'"
        @click="deleteMyBookmark"
        block
        color="success"
        size="large"
        type="submit"
        variant="elevated"
      >
        Remove From My Bookmarks
      </v-btn>
    </div>
  </div>
</template>

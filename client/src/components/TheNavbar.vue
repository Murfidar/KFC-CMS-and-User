<script>
import { mapState } from 'pinia';
import { RouterLink } from 'vue-router'
import { useCustomerStore } from '../stores/main'

export default {
  components: {
    RouterLink
  },
  computed:{
    ...mapState(useCustomerStore, ['isLogin'])
  },
  methods: {
    logout() {
      localStorage.clear()
      this.$router.push({
        name: 'home'
      })
      location.reload()
    }
  }
}
</script>

<template>
  <nav class="py-3 bg-black">
    <div class="flex-1 flex items-center justify-center">
      <div class="flex-shrink-0 flex items-center">
        <img src="http://pngimg.com/uploads/kfc/kfc_PNG12.png" width="120px" />
      </div>
      <div class="hidden sm:block sm:ml-6">
        <div class="flex space-x-4 align-middle">
          <RouterLink to="/"
            ><span class="text-white opacity-80 text-lg hover:opacity-100 px-3 py-2"
              >Home</span
            ></RouterLink
          >
          <RouterLink to="/bookmarks"
            ><span class="text-white opacity-80 text-lg hover:opacity-100 px-3 py-2"
              >Bookmarks</span
            ></RouterLink
          >
          <div v-if="!isLogin">
            <RouterLink to="/register"
              ><span class="text-white opacity-80 text-lg hover:opacity-100 px-3 py-2"
                >Sign Up</span
              ></RouterLink
            >
            <RouterLink to="/login"
              ><span class="text-white opacity-80 text-lg hover:opacity-100 px-3 py-2"
                >Sign In</span
              ></RouterLink
            >
          </div>
          <div v-if="isLogin">
            <a
              href="javascript:void(0);"
              @click="logout()"
              class="text-white opacity-80 text-lg hover:opacity-100 px-3 py-2"
              >Logout</a
            >
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

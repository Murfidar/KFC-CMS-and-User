<script>
import TheNavbar from './components/TheNavbar.vue'
import { RouterView } from 'vue-router'
import { mapWritableState } from 'pinia'
import { useCustomerStore } from './stores/main'

export default {
  components: {
    TheNavbar,
    RouterView
  },
  computed: {
    ...mapWritableState(useCustomerStore, ['isLogin'])
  },

  created() {
    if (localStorage.access_token) this.isLogin = true
    else this.isLogin = false
  }
}
</script>

<template>
  <header>
    <TheNavbar />
  </header>

  <RouterView />
</template>

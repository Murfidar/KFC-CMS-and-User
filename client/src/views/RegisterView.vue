<script>
import { mapStores, mapActions } from 'pinia'
import { useCustomerStore } from '../stores/main'
export default {
  data() {
    return {
      email: '',
      password: '',
      visible: false,
      loading: false
    }
  },
  computed: {
    ...mapStores(useCustomerStore)
  },
  methods: {
    ...mapActions(useCustomerStore, ['handleRegister']),
    async sendRegisterDetail() {
      try {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)
        let data = { email: this.email, password: this.password }
        await this.handleRegister(data)
      } catch (error) {
        console.log(error)
      }
    },
    toHome() {
      this.$router.push({
        name: 'home'
      })
    },
    required(v) {
      return !!v || 'Field is required'
    }
  }
}
</script>

<template>
  <section id="login-page" class="h-screen">
    <div class="h-full">
      <!-- Left column container with background-->
      <div class="g-6 flex h-full flex-wrap items-center justify-center lg:justify-between">
        <div class="shrink-1 mb-12 grow-0 basis-auto md:mb-0 md:shrink-0 lg:w-6/12 xl:w-6/12">
          <img src="http://pngimg.com/uploads/kfc/kfc_PNG12.png" class="h-60 m-5" alt="Image" />
        </div>

        <!-- Right column container -->
        <v-card
          class="px-6 py-8 mb-12 md:mb-0 md:w-4/12 lg:w-5/12 xl:w-5/12"
          max-width="344"
          title="Registration Form"
        >
          <v-form @submit.prevent="sendRegisterDetail()">
            <v-text-field
              v-model="email"
              prepend-inner-icon="mdi-email-outline"
              :readonly="loading"
              :rules="[required]"
              class="mb-2"
              clearable
              label="Email"
            ></v-text-field>

            <v-text-field
              v-model="password"
              prepend-inner-icon="mdi-lock-outline"
              :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
              :type="visible ? 'text' : 'password'"
              :readonly="loading"
              :rules="[required]"
              clearable
              label="Password"
              placeholder="Enter your password"
              @click:append-inner="visible = !visible"
            ></v-text-field>

            <br />

            <v-btn
              :loading="loading"
              block
              color="success"
              size="large"
              type="submit"
              variant="elevated"
            >
              Sign Up
            </v-btn>

            <br />

            <v-btn
              block
              color="success"
              size="large"
              type="submit"
              variant="elevated"
              @click="toHome"
            >
              Back
            </v-btn>
          </v-form>
        </v-card>
      </div>
    </div>
  </section>
</template>

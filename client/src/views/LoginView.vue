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
    ...mapActions(useCustomerStore, ['handleLogin', 'handleGoogleLogin']),
    async sendLoginDetail() {
      try {
        this.loading = true

        setTimeout(() => (this.loading = false), 2000)

        let data = { email: this.email, password: this.password }
        await this.handleLogin(data)
      } catch (error) {
        console.log(error)
      }
    },
    async callback(response) {
      try {
        await this.handleGoogleLogin(response)
      } catch (error) {
        console.log(error)
      }
    },
    toRegister() {
      this.$router.push({
        name: 'register'
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
        <div class="mb-12 md:mb-0 md:w-4/12 lg:w-5/12 xl:w-5/12">
          <v-form @submit.prevent="sendLoginDetail()">
            <!--Sign in section-->
            <div class="flex flex-row items-center justify-center lg:justify-start">
              <p class="mb-0 mr-4 text-lg">Sign in with</p>

              <!-- Google Login -->
              <GoogleLogin :callback="callback" />
            </div>

            <!-- Separator between social media sign in and email/password sign in -->
            <div
              class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300 dark:border-neutral-50"
            >
              <p class="mx-4 mb-0 text-center font-semibold text-black dark:text-white">Or</p>
            </div>

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
              Sign In
            </v-btn>

            <v-card-text class="text-center">
              <a class="text-blue text-decoration-none" href="#" @click="toRegister">
                Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
              </a>
            </v-card-text>
          </v-form>
        </div>
      </div>
    </div>
  </section>
</template>

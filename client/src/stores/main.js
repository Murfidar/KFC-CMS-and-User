import { defineStore } from 'pinia'
import axios from 'axios'
const baseUrl = 'http://localhost:3000'
// const baseUrl = 'https://kfc-api.kfcapi.site'

export const useCustomerStore = defineStore('customer', {
  state: () => {
    return {
      isLogin: false,
      isCustomer: false,
      id: 0
    }
  },
  actions: {
    async handleLogin(loginDetail) {
      try {
        let { email, password } = loginDetail
        const { data } = await axios({
          method: 'post',
          url: `${baseUrl}/customers/login`,
          data: { email, password }
        })
        localStorage.setItem('access_token', data.access_token)
        this.isLogin = true
        this.isCustomer = true
        this.router.push({ name: 'home' })
      } catch (error) {
        this.router.push({ name: 'login' })
        console.log(error)
      }
    },
    async handleRegister(registerDetail) {
      try {
        let { email, password } = registerDetail
        await axios({
          method: 'post',
          url: `${baseUrl}/customers/register`,
          data: { email, password }
        })
        this.router.push({ name: 'login' })
      } catch (error) {
        this.page = 'login'
        console.log(error)
      }
    },
    async handleGoogleLogin(response) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${baseUrl}/customers/google-login`,
          headers: {
            google_token: response.credential
          }
        })
        localStorage.setItem('access_token', data.access_token)
        this.isLogin = true
        this.isCustomer = true
        this.router.push({ name: 'home' })
      } catch (error) {
        console.log(error)
      }
    }
  }
})

export const useCuisineStore = defineStore('cuisine', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      cuisines: [],
      cuisineDetail: [],
      qr: '',
      newQr: ''
    }
  },
  actions: {
    async getCuisines(page, size, name) {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${baseUrl}/customers/cuisines`,
          params: { page, size, name }
        })
        this.cuisines = data
      } catch (error) {
        console.log(error)
      }
    },

    async getCuisinesDetail(id) {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${baseUrl}/customers/cuisines/` + id
        })
        this.cuisineDetail = data
      } catch (error) {
        console.log(error)
      }
    },

    async getCuisineQr(id) {
      try {
        const data = await axios({
          method: 'post',
          url: 'https://api.qr-code-generator.com/v1/create?access-token=ZSVlSB-GRaQyTJ97mql7duja1U7UxFoMITiorZ6PE94YAcshVa2cCBvb3Oukn4ad',
          params: {
            frame_name: 'no-frame',
            qr_code_text: `${baseUrl}/customers/cuisines/` + id,
            image_format: 'SVG',
            qr_code_logo: 'scan-me-square',
            download: 1
          }
        })
        console.log(data)
        this.qr = data
      } catch (error) {
        console.log(error)
      }
    },

    async getNewCuisineQr(id) {
      try {
        const data = await axios({
          method: 'get',
          url: 'https://api.qr-code-generator.com/v1/create?access-token=ZSVlSB-GRaQyTJ97mql7duja1U7UxFoMITiorZ6PE94YAcshVa2cCBvb3Oukn4ad',
          params: {
            frame_name: 'no-frame',
            qr_code_text: `${baseUrl}/customers/cuisines/` + id,
            image_format: 'SVG',
            qr_code_logo: 'scan-me-square'
          }
        })
        console.log(data)
        this.newQr = data
      } catch (error) {
        console.log(error)
      }
    }
  }
})

export const useBookmarkStore = defineStore('bookmark', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      // all these properties will have their type inferred automatically
      bookmarks: [],
      bookmarksId: []
    }
  },
  actions: {
    async getBookmarkCuisine() {
      try {
        const { data } = await axios({
          method: 'get',
          url: `${baseUrl}/customers/bookmarks`,
          headers: { access_token: localStorage.access_token }
        })
        this.bookmarks = data
        this.bookmarksId = data.bookmarks.map((el) => el.cuisineId)
      } catch (error) {
        console.log(error)
      }
    },

    async addToBookmark(id) {
      try {
        await axios({
          method: 'post',
          url: `${baseUrl}/customers/cuisines/` + id,
          headers: { access_token: localStorage.access_token }
        })
      } catch (error) {
        console.log(error)
      }
    },

    async deleteBookmark(id) {
      try {
        const { data } = await axios({
          method: 'delete',
          url: `${baseUrl}/customers/bookmarks/` + id,
          headers: { access_token: localStorage.access_token }
        })
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  }
})

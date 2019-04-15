import Vue from 'vue'
import App from './App.vue'
import VueKeyCloak from '@dsb-norge/vue-keycloak-js'
import router from './router'
import store from './store'
import { createProvider } from './vue-apollo'

Vue.config.productionTip = false

// You can also pass in options. Check options reference below.
Vue.use(VueKeyCloak, {
  config: {
    authRealm: 'sso',
    authUrl: 'http://localhost:8080/auth',
    authClientId: 'vue',
    logoutRedirectUri: 'http://localhost:8080/auth/realms/vue/protocol/openid-connect/logout?redirect_uri=encodedRedirectUri'
  },
  init: {
    onLoad: 'check-sso'
  },
  onReady: function (keycloak) {
    // console.log(keycloak)
    store.commit('addToken', keycloak.token)
    console.log(`I wonder what Keycloak returns:`, keycloak)
  }
})

new Vue({
  router,
  store,
  apolloProvider: createProvider(),
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import VueKeyCloak from '@dsb-norge/vue-keycloak-js'
import router from './router'
import store from './store'
import { createProvider, onLogin } from './vue-apollo'

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
  onReady: async function (keycloak) {

    const apolloProvider = createProvider();

    new Vue({
      router,
      store,
      apolloProvider,
      render: h => h(App)
    }).$mount('#app')


    if (keycloak.authenticated) {
      store.dispatch('addToken', keycloak.token)
      await onLogin(apolloProvider.defaultClient, keycloak.token)
      console.log(keycloak.idTokenParsed)
      store.dispatch('setName', {
        firstName: keycloak.idTokenParsed.given_name,
        lastName: keycloak.idTokenParsed.family_name
      })
      store.dispatch('setEmail', keycloak.idTokenParsed.email)
      store.dispatch('setUsername', keycloak.idTokenParsed.username)
    }
    console.log(`I wonder what Keycloak returns:`, keycloak)
  }
})


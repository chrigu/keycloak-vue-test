<template>
  <div class="me">
    <h1>This is a me page</h1>
    <p>Hello {{userName}}</p>
    <p>me {{me}}</p>
  </div>
</template>

<script>
// @ is an alias to /src

import ME_QUERY from '@/graphql/test.gql'

export default {
  name: 'me',
  data () {
    return {
      userName: '',
      me: ''
    }
  },
  methods: {
    getData: function () {
      console.log('getData')
    }
  },
  mounted: async function () {
    if (this.$keycloak.authenticated) {
      this.userName = this.$keycloak.tokenParsed.email

      const result = await this.$apollo.query({
        query: ME_QUERY
      })
      .then(({data}) => {
        console.log(data)
        this.me = data.me
      })
      .catch(error => console.warn(error))
    } else {
      this.$keycloak.loginFn()
    }
  }
}
</script>

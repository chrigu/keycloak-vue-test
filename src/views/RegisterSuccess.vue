<template>
  <div class="signup">
    <h1>Register Success</h1>
    <p>Welcome {{fullName}}</p>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapGetters } from 'vuex'

export default {
  name: 'register-success',
  computed: {
    ...mapGetters(['fullName'])
  }
}
</script>

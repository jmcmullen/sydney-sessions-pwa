<template>
  <section>
    <el-card class="box-card">
      <p>Login in with Facebook below to add new events, customise your experience, subscribe to promotors and more. We will never post anything without your permission.</p>
      <el-button type="primary" round @click="signIn">Login with Facebook</el-button>
    </el-card>
    
  </section>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  computed: {
    ...mapState(['user']),
    ...mapMutations(['SET_USER', 'setEmail']),
  },
  methods: {
    signIn() {
      const params = {
        scope: 'public_profile,email,user_events,user_friends',
      };
      window.FB.login(response => {
        if (response.authResponse) {
          this.onSignIn(response.authResponse);
        }
      }, params);
    },
    onSignIn(auth) {
      const params = {
        access_token: auth.accessToken,
        fields: 'email,first_name,last_name',
      };
      window.FB.api('/me', params, response => {
        // TODO: Store user in GraphQL DB.
        this.$store.commit('SET_USER', {
          userID: auth.userID,
          accessToken: auth.accessToken,
          email: response.email,
        });
        this.$router.push('/promotor/import');
      });
    },
    onError(params) {
      console.log(params);
      this.$message({
        type: 'error',
        message: 'Login failed.',
      });
    },
  },
  mounted() {
    if (localStorage.getItem('USER_ID')) {
      this.$store.commit('SET_USER', {
        userID: localStorage.getItem('USER_ID'),
        email: localStorage.getItem('USER_EMAIL'),
        accessToken: localStorage.getItem('ACCESS_TOKEN'),
      });
      this.$router.push('/promotor/import');
    }
  },
};
</script>

<style lang="scss" scoped>
section {
  margin: 50px;
}

.el-card {
  max-width: 500px;
  margin: auto;
}

.el-button {
  margin: 30px auto;
  display: block;
}
</style>

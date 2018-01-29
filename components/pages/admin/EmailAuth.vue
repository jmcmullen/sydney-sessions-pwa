<template>
  <section>
    <el-card class="box-card">
      <el-form label-width="100px">
        <el-form-item label="Email">
          <el-input type="email" v-model="email"></el-input>
        </el-form-item>
        <el-form-item label="Password">
          <el-input type="password" v-model="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="login">Login</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    
  </section>
</template>

<script>
import { mapState } from 'vuex';
import USER_SIGN_IN from '~/graphql/User/UserSignIn.gql';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const resp = await this.$apollo.mutate({
          mutation: USER_SIGN_IN,
          variables: {
            email: this.email,
            password: this.password,
          },
        });
        const { user, token } = resp.data.signinUser;
        this.$store.commit('SET_ADMIN', { admin: { user, token } });
        this.$router.push('/admin/approve');
        console.log(user, token);
      } catch (error) {
        this.$message({
          type: 'error',
          message: error.message,
        });
      }
    },
  },
  // mounted() {
  //   if (localStorage.getItem('ADMIN_TOKEN')) {
  //     this.$store.commit('SET_ADMIN', {
  //       user: { id: localStorage.getItem('ADMIN_ID') },
  //       token: localStorage.getItem('ADMIN_TOKEN'),
  //     });
  //     this.$router.push('/admin/approve');
  //   }
  // },
};
</script>

<style lang="scss" scoped>
section {
  margin-top: 150px;
}

.el-card {
  max-width: 500px;
  margin: auto;
  padding-top: 25px;
}

.el-button {
  float: right;
}
</style>

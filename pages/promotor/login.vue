<template>
  <section>
    <div class="background"></div>
    <el-card class="card-box">
      <FacebookAuth />
    </el-card>
  </section>
</template>

<script>
import FacebookAuth from '~/components/pages/promotor/FacebookAuth';

export default {
  components: {
    FacebookAuth,
  },
  head() {
    return {
      title: 'Sydney Sessions: Authentication Required',
    };
  },
};
</script>

<style lang="scss" scoped>
.background {
  width: 100%;
  height: 60vh;
  background-image: url('~/assets/images/kings-cross.jpg');
  background-size: cover;
}
.card-box {
  margin: -300px auto 0;
  max-width: 700px;
  min-height: 500px;
}
</style>

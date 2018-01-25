<template>
  <section>
    <div class="background"></div>
    <el-card class="card-box">
      <AddEvent />
    </el-card>
  </section>
</template>

<script>
import AddEvent from '~/components/pages/promotor/AddEvent';

export default {
  components: {
    AddEvent,
  },
  head() {
    return {
      title: 'Sydney Sessions: Import an Event',
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
  @media (min-height: 480px) {
    display: none;
  }
}
.card-box {
  margin: -300px auto 0;
  max-width: 500px;
  @media (min-height: 480px) {
    margin: 100px auto;
    max-width: 90%;
  }
}
</style>

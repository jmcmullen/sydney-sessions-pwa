<template>
  <div>
    <Navbar />
    <nuxt />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css?family=Open+Sans');

body {
  margin: 0;
  font-family: 'Open Sans', sans-serif;
}
</style>

<script>
import Navbar from '~/components/common/Navbar';

export default {
  components: {
    Navbar,
  },
};
</script>

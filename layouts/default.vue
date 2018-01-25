<template>
  <div>
    <navbar />
    <nuxt />
  </div>
</template>

<style>
body {
  margin: 0;
  font-family: 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}
</style>

<script>
import Navbar from '~/components/common/Navbar';
export default {
  components: { Navbar },
};
</script>

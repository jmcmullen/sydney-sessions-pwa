<template>
  <div class="main-header">
    <div class="header-container">
      <nuxt-link :to="{ path: '/' }">
        <img class="logo" :src="logo" />
      </nuxt-link>
      <el-menu
        :default-active="activeIndex2"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#000"
        text-color="#fff"
        active-text-color="#fff">
        <el-menu-item index="1">Add Event</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
import logo from '~/assets/images/logo.png';

export default {
  data() {
    return {
      logo,
      links: [
        { name: 'Events', path: '/events' },
        { name: 'Mixes', path: '/mixes' },
      ],
    };
  },
};
</script>

<style lang="scss">
.main-header {
  background-color: black;
  height: 60px;
  position: fixed;
  width: 100%;
  top: 0;

  .header-container {
    max-width: 980px;
    margin: auto;
    display: flex;
    justify-content: space-between;
  }

  .logo {
    width: 150px;
  }
}
</style>
